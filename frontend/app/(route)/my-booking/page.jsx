"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const email = "kangjohang1707a@gmail.com";

function MyBooking(props) {
    // const { user } = useKindeBrowserClient();

    const [bookings, setBookings] = React.useState([]);

    React.useEffect(() => {
        getBookingsByUser(email);
    }, []);

    const getBookingsByUser = async (email) => {
        try {
            const resp = await (await GlobalApi.getUserBookingList(email)).data;
            console.log("resp MyBooking => ", resp);
            setBookings(resp.data);
        } catch (error) { }
    };

    const filterUserBooking = (type) => {
        const result = bookings.filter((booking) =>
            type === "upcoming"
                ? new Date(booking.attributes.Date) > new Date()
                : new Date(booking.attributes.Date) <= new Date()
        );

        return result;
    };

    return (
        <div className="lg:h-screen px-4 sm:px-10 mt-10">
            <h2 className="font-bold text-2xl">My Booking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className="w-full justify-start">
                    <TabsTrigger onClick={() => filterUserBooking("upcoming")} value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger onClick={() => filterUserBooking("exprired")} value="exprired">Exprired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="border h-screen">
                    <BookingList bookingList={filterUserBooking("upcoming")} expired={false} />
                </TabsContent>
                <TabsContent value="exprired" className="border h-screen">
                    <BookingList bookingList={filterUserBooking("exprired")} expired={true} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default MyBooking;
