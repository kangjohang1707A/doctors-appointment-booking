import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function DoctorSuggestionList() {
    const [doctors, setDoctors] = React.useState([])

    React.useEffect(() => {
        getDoctorsSuggesst()
    }, [])

    const getDoctorsSuggesst = async () => {
        try {
            const result = (await GlobalApi.getDoctors()).data
            setDoctors(result.data)
        } catch (error) {

        }
    }

    return (
        <div className='p-4 border-[1px] mt-5 md:ml-5' >
            <h2 className='mb-3 font-bold' >Suggestions</h2>
            {
                doctors.slice(0, 4).map((doctor, index) => (
                    <Link href={'/details/' + doctor.id}
                        className=' mb-4 p-3 shadow-sm w-full 
                        cursor-pointer hover:bg-slate-100
                        rounded-lg flex items-center gap-3'
                        key={index}
                    >
                        <Image src={doctor.attributes?.image?.data?.attributes?.url}
                            width={70}
                            height={70}
                            className='w-[70px] h-[70px] rounded-full object-cover'
                            alt="doctor"
                        />
                        <div className='mt-3 flex-col flex gap-1 items-baseline'>
                            <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2
                     text-primary'>{doctor.attributes.categories?.data[0]?.attributes?.Name}</h2>
                            <h2 className='font-medium text-sm'>{doctor.attributes.Name}</h2>
                            <h2 className='text-primary text-xs flex gap-2'>
                                {doctor.attributes.Year_of_Experience} Years
                            </h2>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default DoctorSuggestionList;