import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function DoctorDetail({ doctor }) {

    const socialMediaList = [
        {
            id: 1,
            icon: '/youtube.png',
            url: ''
        },
        {
            id: 2,
            icon: '/linkedin.png',
            url: ''
        },
        {
            id: 3,
            icon: '/twitter.png',
            url: ''
        },
        {
            id: 4,
            icon: '/facebook.png',
            url: ''
        }
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-3' >
            {/* Doctor Image */}
            <div className='' >
                <Image
                    src={`${doctor?.attributes?.image?.data?.attributes?.url}`}
                    height={200} width={200} alt={`doctor avatar`}
                    className='rounded-lg h-[280px] w-full object-cover'
                />
            </div>
            {/* Doctor Info */}
            <div className='col-span-2 mt-5 px-10 flex flex-col gap-3 items-baseline lg:ml-5' >
                <h2 className='font-bold text-2xl' >{doctor.attributes.Name}</h2>
                <h2 className='flex gap-2 text-gray-500 text-md' >
                    <GraduationCap />
                    <span>{doctor.attributes.Year_of_Experience} Years of Experience</span>
                </h2>
                <h2 className='text-md flex gap-2 text-gray-500' >
                    <MapPin />
                    <span>{doctor.attributes.Address}</span>
                </h2>
                <div className='flex' >
                    {
                        doctor?.attributes?.categories?.data?.map((category, index) => (
                            <h2 key={index} className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary mx-1">
                                {category?.attributes?.Name}
                            </h2>
                        ))
                    }
                </div>
                <div className='flex gap-3' >
                    {socialMediaList.map((item) => (
                        <Image src={item.icon} key={item.id} width={30} height={30} alt={`icon`} />
                    ))}
                </div>
                <Button className="mt-3 rounded-full" >Book Appointment</Button>
            </div>
        </div>
    );
}

export default DoctorDetail;