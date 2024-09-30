"use client"

import { Category, Course, Purchase, User } from "@prisma/client"
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
import { deleteUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/category";

export const columns: ColumnDef<any>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { user } = row.original;
      console.log("🚀 ~  row.original:",  row.original)
     

      return (
        <p>{user.name}</p>
      )
    }
  }, 
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { course } = row.original;
      console.log("🚀 ~  row.original:",  row.original)
     

      return (
        <p>{course.title}</p>
      )
    }
  }, 
  {
    accessorKey: "teacher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teacher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { course } = row.original;
      console.log("🚀 ~  row.original:",  row.original)
     

      return (
        <p>{course.user.name}</p>
      )
    }
  }, 
  {
    accessorKey: "fee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { platformFee } = row.original;
      console.log("🚀 ~  row.original:",  row.original)
     
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(platformFee);

      return <div>{formatted}</div>
    }
    
  } , 
  {
    accessorKey: "teacherRevenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teacher Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { teacherRevenue } = row.original;
      console.log("🚀 ~  row.original:",  row.original)
     
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(teacherRevenue);

      return <div>{formatted}</div>
    }
    
  } , 
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = new Date(createdAt).toLocaleDateString("en-CA"); // "en-CA" for YYYY-MM-DD format

       

      return <div>{formattedDate}</div>
    }
    
  } 
]
