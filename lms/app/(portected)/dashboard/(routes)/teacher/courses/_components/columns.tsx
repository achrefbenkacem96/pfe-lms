"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Lock, LockOpen, MoreHorizontal, Pencil, Trash, Trash2 } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
// Cell component to handle actions

const ActionsCell = ({ row }: { row: { original: Course } }) => {
  const { id } = row.original;
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${id}`);

      toast.success("Course deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  const hundelEnable = async () =>{
    try {
      setIsLoading(true);

      await axios.patch(`/api/courses/enable/${id}`,{enable: !row.original?.enable});

      toast.success("Course " + (row.original?.enable ? "enable": "disable"));
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-4 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
    {session.data?.user.role === "ADMIN" && <DropdownMenuItem onClick={() => hundelEnable()}>
    
          {row.original.enable ? <Lock className="h-4 w-4 mr-2" />:<LockOpen className="h-4 w-4 mr-2" />}
          {row.original.enable ? "disable": "enable"}
        </DropdownMenuItem>}
      {session.data?.user.role === "TEACHER" &&<Link href={`/dashboard/teacher/courses/${id}`}>
        <DropdownMenuItem>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
      </Link>}
      <DropdownMenuItem onClick={onDelete}>
           <Trash className="h-4 w-4 mr-2" />
          Remove
       </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>
  );
}


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
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
    cell: ({ row }) => {
      const enable = row.getValue("enable") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          enable && "bg-sky-700"
        )}>
          {enable ? "Enable" : "Disable"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} /> 

  }
]
