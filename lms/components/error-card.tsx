import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./header";
import { Button } from "./ui/button";
import Link from "next/link";
export const ErrorCard = () => {
    return (
 
    <div className="w-full flex content-center items-center   shadow-md">
 
 
       <Link href={"/login"}></Link>Back to login
    
    </div>
  
)
}