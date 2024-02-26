"use client"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getDoctorList()
  }, [])

  const getDoctorList = async () => {
    try {
      const result = (await GlobalApi.getDoctors()).data
      setDoctors(result.data)
    } catch (error) {

    }
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Search bar + Catetories */}
      <CategorySearch />

      {/* DoctorList */}
      <DoctorList doctors={doctors} />


    </div>
  );
}
