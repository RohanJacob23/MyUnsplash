"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
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

interface ImageArray {
  src: string;
  overlay: boolean;
}
export default function ImageGrid() {
  const [tempImageObj, setTempImageObj] = useState<ImageArray[]>([
    { src: "/tempImages/volha.jpg", overlay: false },
    { src: "/tempImages/brice-cooper.jpg", overlay: false },
    { src: "/tempImages/neom.jpg", overlay: false },
    { src: "/tempImages/logan-weaver.jpg", overlay: false },
    { src: "/tempImages/the-national-library.jpg", overlay: false },
    { src: "/tempImages/chintya-akemi.jpg", overlay: false },
    { src: "/tempImages/david-emrich.jpg", overlay: false },
  ]);
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 space-y-4">
      {tempImageObj.map((image, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() =>
            setTempImageObj((prev) => {
              prev[index].overlay = true;
              return [...prev];
            })
          }
          onMouseLeave={() =>
            setTempImageObj((prev) => {
              prev[index].overlay = false;
              return [...prev];
            })
          }
        >
          <Image
            src={image.src}
            alt="image"
            width={400}
            height={400}
            className="rounded-2xl object-cover w-full h-full"
          />

          {image.overlay && (
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*********"
                      className="mb-5 mt-3"
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#EB5757]">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <h1 className="absolute left-1.5 md:left-3 bottom-2 md:bottom-4 font-bold text-sm md:text-lg text-white w-72">
                Morbi consequat
              </h1>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
