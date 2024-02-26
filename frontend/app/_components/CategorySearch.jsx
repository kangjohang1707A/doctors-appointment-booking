"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';

function CategorySearch(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = async () => {
        try {
            const result = (await GlobalApi.getCategory()).data
            setCategories(result.data)
        } catch (error) {

        }
    }

    return (
        <div className='mb-10 items-center px-5 flex flex-col gap-2' >
            <h2 className='font-bold text-4xl
            tracking-wide
            ' >Search <span className='text-primary' >Doctors</span>
            </h2>
            <h2 className='text-gray-500 text-xl' >
                Search You Doctor and Book Appointment in one click
            </h2>

            <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search" />
                <Button type="submit">
                    <Search className='h-4 w-4 mr-2' />
                    Search
                </Button>
            </div>
            {/* Display List of Category */}
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-5' >
                {
                    categories.length > 0 ? categories.map((item, index) => index < 6 && (
                        <Link
                            href={`/search/${item?.attributes?.slug}`}
                            key={index}
                            className='
                            flex flex-col text-center cursor-pointer
                            gap-2 items-center p-5 bg-blue-50
                            m-2 rounded-lg hover:scale-110 transition-all ease-in-out
                        '
                        >
                            <Image src={`${item.attributes?.Icon?.data?.attributes?.url}`} width={40} height={40} alt={`icon`} />
                            <label className='text-blue-600 text-sm' htmlFor={`${item?.attributes?.Name}`}>{item.attributes.Name}</label>
                        </Link>
                    )) : (
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <div key={index} className='h-[130px] w-[130px] m-2 bg-slate-200 animate-pulse rounded-lg ' >
                                loading...
                            </div>
                        ))

                    )
                }
            </div>
        </div>
    );
}

export default CategorySearch;