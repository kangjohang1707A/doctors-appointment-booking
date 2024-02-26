"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink, useKindeBrowserClient, } from "@kinde-oss/kinde-auth-nextjs";
import { Popover, PopoverContent, PopoverTrigger, } from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
    const Menu = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "Explore",
            path: "/explore",
        },
        {
            id: 3,
            name: "Contact Us",
            path: "/contact-us",
        },
    ];

    const { user } = useKindeBrowserClient();

    return (
        <div className="flex items-center justify-between p-4 shadow-sm">
            <div className="flex items-center gap-10">
                <Link href="/">
                    <Image src="/logo.svg" width={180} height={80} alt="logo" />
                </Link>
                <ul className="md:flex gap-8 hidden">
                    {Menu.map((menu, index) => (
                        <Link href={menu.path} key={index}>
                            <li
                                className="hover:text-primary 
                                cursor-pointer hover:scale-105
                                transition-all ease-in-out"
                            >
                                {menu.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user !== null ? (
                <Popover className="fixed" >
                    <PopoverTrigger asChild>
                        <Image src={user?.picture ? user.picture : "/avatar.jpg"} height={40} width={40} alt="avatar" className="rounded-full" />
                    </PopoverTrigger>
                    <PopoverContent className="w-44">
                        <ul className="flex flex-col gap-2 ">
                            <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                                Profile
                            </li>
                            <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                                My Booking
                            </li>
                            <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                                <LogoutLink> Logout</LogoutLink>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            ) : (
                <LoginLink>
                    <Button>Login</Button>
                </LoginLink>
            )}

        </div>
    );
}

export default Header;
