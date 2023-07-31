"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ImageArray } from "@/types/type";
import { useSearch } from "@/zustand/useSearch";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function ImageGrid({ images }: { images: ImageArray[] }) {
  const search = useSearch((state) => state.search);
  const [password, setPassword] = useState("");
  const [imageState, setImageState] = useState(images);
  const [imageOverlayStates, setImageOverlayStates] = useState<boolean[]>(
    images.map(() => false)
  );
  const router = useRouter();
  const { toast } = useToast();
  const url = "https://my-unsplash-beryl-three.vercel.app";
  // const url = "http://localhost:3000";

  const handleDelete = (id: string) => {
    const checkPass = password === "123456";
    if (checkPass) {
      toast({
        title: "Deleting...",
        description: "Please wait while we delete your image",
        className: "bg-[#3abff8] outline-none border-none",
      });
      axios
        .delete(`${url}/api/delete-song?id=${id}`)
        .catch((error) => console.log(error))
        .finally(() => {
          toast({
            title: "Success!!",
            variant: "destructive",
            description: "Image Deleted Successfully!!",
          });
          router.refresh();
          setPassword("");
        });
    } else {
      toast({
        title: "Error!!",
        variant: "destructive",
        description: "Invalid Password",
      });
    }
  };

  useEffect(() => {
    setImageState(() => {
      if (search.length === 0) return [...images];
      return images.filter((image) =>
        image.label.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [images, search]);

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 space-y-4">
      {imageState.map((image, index) => (
        <div
          key={image.id}
          className="relative"
          onMouseEnter={() =>
            setImageOverlayStates((prev) => {
              prev[index] = true;
              return [...prev];
            })
          }
          onMouseLeave={() =>
            setImageOverlayStates((prev) => {
              prev[index] = false;
              return [...prev];
            })
          }
        >
          <picture>
            <img
              src={image.url}
              alt="image"
              width={400}
              height={400}
              className="rounded-2xl object-cover w-full h-full"
            />
          </picture>

          {imageOverlayStates[index] && (
            <>
              {/* dark overlay */}
              <div className="absolute w-full h-full top-0 left-0 rounded-xl bg-black/50"></div>

              {/* delete button */}
              <AlertDialog>
                <AlertDialogTrigger className="absolute top-2 md:top-5 right-2 md:right-5 rounded-full w-16 h-6 text-[#EB5757] border-[#EB5757] font-medium text-xs bg-transparent hover:bg-[#EB5757] hover:text-white outline outline-1 outline-[#EB5757]">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div>
                    <Label htmlFor="password">Password (password:123456)</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-5 mt-3"
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#EB5757]"
                      onClick={() => handleDelete(image.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <h1 className="absolute left-1.5 md:left-3 bottom-2 md:bottom-4 font-bold text-sm md:text-lg text-white w-72 max-w-fit">
                {image.label}
              </h1>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
