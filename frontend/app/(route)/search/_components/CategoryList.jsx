"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const params = useParams()
    const category = params?.cname

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            const result = (await GlobalApi.getCategory()).data;
            setCategories(result.data);
        } catch (error) { }
    };

    return (
        <div className="h-screen flex flex-col mt-5">
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categories.map((item, index) => (
                            <CommandItem key={index} className="cursor-pointer">
                                <Link href={`/search/${item?.attributes?.slug}`}
                                    className={`
                                        p-2 flex gap-2text-[14px] text-blue-600 
                                        rounded-md w-full cursor-pointer items-center
                                        ${category === item?.attributes?.slug && "bg-blue-100"}
                                    `}>
                                    <Image
                                        src={`${item.attributes?.Icon?.data?.attributes?.url}`}
                                        width={25}
                                        height={25}
                                        alt={`icon`}
                                    />
                                    <label>{item?.attributes?.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}

export default CategoryList;
