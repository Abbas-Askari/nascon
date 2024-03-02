"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Input } from "../ui/input"
import { useState } from "react"

export const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState("")

  return (
      <Input className="max-w-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." 
      icon={<MagnifyingGlassIcon onClick={() => {console.log(searchTerm)}} className="h-full aspect-square" />}/>
  )
}
