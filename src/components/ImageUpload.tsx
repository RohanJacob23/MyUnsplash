"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ImageUpload() {
  const [label, setLabel] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const url = "https://my-unsplash-beryl-three.vercel.app";
  // const url = "http://localhost:3000";

  const handleSubmit = () => {
    if (label.length !== 0 && photoUrl.length !== 0) {
      toast({
        title: "Loading...",
        description: "Please wait while we upload your image.",
        className: "bg-[#3abff8] outline-none border-none",
      });
      axios
        .post(`${url}/api/upload-song`, { label, url: photoUrl })
        .catch((error) => console.log(error))
        .finally(() => {
          toast({
            title: "Success!!",
            description: "Image Uploaded Successfully.",
            className: "bg-[#36d399] outline-none border-none",
          });
          router.refresh();
        });
    } else {
      toast({
        variant: "destructive",
        title: "Error!!",
        description: "Invalid Label Or Url",
      });
    }
  };

  return (
    <>
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Suspendisse elit massa"
          className="mb-5 mt-3"
        />

        <Label htmlFor="photoUrl">Photo URL</Label>
        <Input
          id="photoUrl"
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="rounded-lg mt-3"
          placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
        />
      </div>
      <AlertDialogFooter className="mt-3">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-[#3DB46D]" onClick={handleSubmit}>
          Submit
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
