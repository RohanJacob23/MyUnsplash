import ImageGrid from "@/components/ImageGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
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
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="">
      {/* Header */}
      <section className="flex items-center p-4 md:py-8 md:px-24 flex-wrap md:flex-nowrap gap-2 md:gap-0">
        <div className="flex items-center space-x-1 md:space-x-6">
          {/* logo */}
          <div className="relative md:mr-6">
            <Image
              src="/Logo/my_unsplash_logo.svg"
              alt="logo"
              width={138}
              height={26}
            />
          </div>

          {/* search bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name"
              className="md:h-[3.43rem] md:w-[18.75rem] pl-7 md:px-14 md:py-5 rounded-xl border-[#BDBDBD]"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute top-2 left-1.5 md:top-[1.15rem] md:left-4 text-[#BDBDBD]" />
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
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  type="text"
                  placeholder="Suspendisse elit massa"
                  className="mb-5 mt-3"
                />

                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  type="text"
                  className="rounded-lg mt-3"
                  placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-[#3DB46D]">
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="flex p-4 md:px-24 md:pb-8">
        <ImageGrid />
      </section>
    </main>
  );
}
