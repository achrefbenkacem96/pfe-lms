import { BarChart, Compass, CreditCard, FileQuestion, GraduationCap, Layout, List, MessageCircle, Snowflake, Users } from "lucide-react";

export const publicRoutes = [
    "/",
    "/contact",
    "/auth/new-verification",
    "/api/webhook",
    "/api/uploadthing",
    "/pricing"
];



export const authRoutes = [
"/login",
"/register",
"/error",
"/auth/reset",
"/auth/new-password",

];

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
export const studentRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Compass,
      label: "Browse",
      href: "/dashboard/search",
    },
  
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/dashboard/conversations",
    },  
    {
      icon: FileQuestion,
      label: "Quiz",
      href: "/dashboard/quiz",
    },  
  ];
  export const adminRoutes = [
   
    {
      icon: BarChart,
      label: "Analytics",
      href: "/dashboard/teacher/analytics",
    },  
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/dashboard/transactions",
    },  
    {
      icon: List,
      label: "Courses",
      href: "/dashboard/teacher/courses",
    },
    {
      icon: Snowflake ,
      label: "category",
      href: "/dashboard/category",
    },
    {
      icon: GraduationCap,
      label: "Students",
      href: "/dashboard/students",
    },
    {
      icon: Users,
      label: "Teachers",
      href: "/dashboard/teachers",
    },
  
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/dashboard/conversations",
    },  
    {
      icon: FileQuestion,
      label: "Quiz",
      href: "/dashboard/quiz",
    },  
    
  ];
  
  export const teacherRoutes = [
    {
      icon: Snowflake ,
      label: "category",
      href: "/dashboard/category",
    },
    {
      icon: List,
      label: "Courses",
      href: "/dashboard/teacher/courses",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/dashboard/teacher/analytics",
    },
  
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/dashboard/conversations",
    },  
    {
      icon: FileQuestion,
      label: "Quiz",
      href: "/dashboard/quiz",
    },  
   
  ]
  export const supportRoutes = [
   
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/dashboard/conversations",
    },  
    
  ]