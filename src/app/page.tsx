import ImageGrid from "@/components/ImageGrid";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageArray } from "@/types/type";
import Search from "@/components/Search";
import ImageUpload from "@/components/ImageUpload";

export const dynamic = "force-dynamic";

async function fetchImages(): Promise<ImageArray[]> {
  const url = "https://my-unsplash-beryl-three.vercel.app";
  // const url = "http://localhost:3000";
  const res = await fetch(`${url}/api/songs`, { cache: "no-store" });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const images = await fetchImages();
  return (
    <main>
      {/* Header */}
      <section className="flex items-center p-4 md:py-8 md:px-24 flex-wrap md:flex-nowrap gap-2 md:gap-0">
        <div className="flex items-center space-x-1 md:space-x-6">
          {/* logo */}
          <div className="relative md:mr-6">
            <Image
              src="/Logo/my_unsplash_logo.svg"
              alt="logo"
              priority={true}
              width={138}
              height={26}
            />
          </div>

          {/* search bar */}
          <div className="relative">
            <Search />
          </div>
        </div>

        {/* add photo button */}
        <div className="grow flex items-center justify-end">
          <AlertDialog>
            <AlertDialogTrigger className="text-white bg-[#3DB46D] text-xs md:text-sm font-bold md:w-[8.5rem] h-12 shadow-md rounded-2xl flex-grow sm:flex-grow-0">
              Add a photo
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a new photo</AlertDialogTitle>
              </AlertDialogHeader>
              <ImageUpload />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="flex p-4 md:px-24 md:pb-8">
        <ImageGrid images={images} />
      </section>
    </main>
  );
}
