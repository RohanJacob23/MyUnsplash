"use client";

import React from "react";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearch } from "@/zustand/useSearch";

export default function Search() {
  const [search, setSearch] = useSearch((state) => [
    state.search,
    state.setSearch,
  ]);
  return (
    <>
      <Input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:h-[3.43rem] md:w-[18.75rem] pl-7 md:px-14 md:py-5 rounded-xl border-[#BDBDBD]"
      />
      <MagnifyingGlassIcon className="w-5 h-5 absolute top-2 left-1.5 md:top-[1.15rem] md:left-4 text-[#BDBDBD]" />
    </>
  );
}
