import { Menu, School } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/DarkMode'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from 'react-router-dom'


const Navbar = () => {

  const user = true;

  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 shadow-xl'>
      {/* for desktop */}
      <div className='max-w-6xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>

        <div className='flex items-center gap-2 cursor-pointer'>
          {/*        Website logo         */}
          <School size={"30"} />
          <h1 className='hidden md:block font-extrabold text-2xl'>E-learning</h1>
        </div>

        <div className='flex items-center gap-5'>
          {/*      User icon and dark mode icon       */}
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to={"/my-learning"}>
                        My Learning

                      </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"profile"}>

                        Edit Profile
                      </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Log out

                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    Dashboard

                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <div className='flex items-center gap-3'>
                <Button variant="outline"> Login</Button>
                <Button>Signup</Button>
              </div>
            )
          }
          <DarkMode />
        </div>
      </div>

      {/*    Mobile UI      */}
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <div className='flex items-center gap-2'>
          <School size={"30"} />
          <h1 className='font-extrabold text-2xl'>E-Learning</h1>
        </div>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar



const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" >
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>Edit profile</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <nav className='flex flex-col space-y-4'>
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {
          role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }
      </SheetContent>
    </Sheet>
  )
}
