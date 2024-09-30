"use client"

import { Course, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, TrashIcon } from "lucide-react"
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { activeUser, deleteUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import Image from "next/image";
import { FormUpdateStudent } from "@/components/form-update-student";
import { useState } from "react";


// Cell component to handle actions
const ActionsCell = ({ row }: { row: { original: User } }) => {
  const { id } = row.original;
  const { enable } = row.original;
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const hundelDelete =  () =>{

      deleteUser({id}).then(( ) => {
      
      toast.success("User updated");

      router.refresh();
    });
  }
  const hundelEnable =  (value:boolean, id:any) =>{

    activeUser(value, id).then(( ) => {
    
    toast.success("User updated");

    router.refresh();
  });
}

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-4 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => hundelEnable(!enable,id)}>
            <TrashIcon className="h-4 w-4 mr-2" />
            {enable ? "disable": "enable"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
           <DropdownMenuItem onClick={hundelDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog  open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Update teacher
          </DialogTitle>
        
        </DialogHeader>
        <div className="flex items-center justify-center">
        <div className="w-full max-w-md ">
          <FormUpdateStudent id={id} student={row.original} setOpen={setOpen}/>
        </div>
      </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const image = row.getValue("image") || false;
      const imageUrl = typeof image === "string" && image.length > 0 ? image : '/images/placeholder.jpg';

      return   (<div className="
      relative 
      inline-block 
      rounded-full 
      overflow-hidden
      h-9 
      w-9 
      md:h-11 
      md:w-11
    ">
        <Image
            fill
            src={imageUrl}
            alt="Avatar"
          />
    </div>)
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "enable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enable
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} /> 

  }
]
