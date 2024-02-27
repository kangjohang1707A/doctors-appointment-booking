"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';

function Details({ params }) {

    const [doctor, setDoctor] = useState(null)

    useEffect(() => {
        getDoctorById(params.id)
    }, [])

    const getDoctorById = async (id) => {
        try {
            const result = (await GlobalApi.getDoctorById(id)).data
            setDoctor(result.data)
        } catch (error) {

        }
    }

    return (
        <div className='lg:h-screen p-5 md:px-20' >
            <h2 className='font-bold text-[22px]' >Details</h2>
            <div className=' grid grid-cols-1 lg:grid-cols-4' >
                {/* Doctor Detail */}
                <div className='col-span-3 ' >
                    {doctor && <DoctorDetail doctor={doctor} />}
                </div>
                {/* Doctor Suggestion */}
                <div className='ml-2 ' >
                    <DoctorSuggestionList />
                </div>
            </div>

        </div>
    );
}

export default Details;