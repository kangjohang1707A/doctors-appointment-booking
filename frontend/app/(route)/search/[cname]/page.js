"use client";
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

function Search({ params }) {

    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        getDoctors(params.cname)
    }, [params])

    const getDoctors = async () => {
        try {
            const result = (await GlobalApi.getDoctorsByCategory(params.cname)).data
            console.log("result=> ", result);
            setDoctors(result.data)
        } catch (error) {

        }
    }

    return (
        <div className='mt-5 h-screen' >
            <DoctorList doctors={doctors} heading={params.cname} />
        </div>
    );
}

export default Search;