import { School } from 'lucide-react'
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


const Navbar = () => {

  const user = false;

  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
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
                      My Learning

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Edit Profile

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
            <DarkMode/>
        </div>
      </div>
    </div>
  )
}

export default Navbar