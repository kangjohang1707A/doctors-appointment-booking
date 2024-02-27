import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, Clock } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';


function BookingAppointment({ doctor }) {
    const [date, setDate] = React.useState(new Date())
    const [timeSlot, setTimeSlot] = React.useState([])
    const [selectedTimeSlot, setSelectedTimeSlot] = React.useState()
    const [note, setNote] = React.useState('')

    React.useEffect(() => {
        getTime()
    }, [])

    const getTime = () => {
        let timeList = []
        for (let i = 4; i <= 12; i++) {
            timeList.push({
                time: `${i >= 10 ? "" : "0"}${i}:00`
            })
            timeList.push({
                time: `${i >= 10 ? "" : "0"}${i}:30`
            })
        }

        for (let i = 13; i <= 18; i++) {
            timeList.push({
                time: i + ':00'
            })
            timeList.push({
                time: i + ':30'
            })
        }

        setTimeSlot(timeList)
    }
    const isPastDay = (day) => {
        return day <= new Date()
    }

    const { user } = useKindeBrowserClient()



    const saveBooking = async () => {
        const _date = new Date(date);

        const day = String(_date.getDate()).padStart(2, '0');
        const month = String(_date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = _date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        const data = {
            data: {
                UserName: `${user.given_name} ${user.family_name}`,
                Email: user.email,
                Date: formattedDate,
                Time: `${selectedTimeSlot}:00`,
                doctor: doctor.id,
                Note: note
            }
        }
        try {
            const result = (await GlobalApi.createAppointment(data)).data
            // console.log("result create booking => ", result);
            if (result) {
                // toast("Booking doctor success. Please, check email your! Thansk your.")
                toast("Booking confirmation sent on Email!")
            }
        } catch (error) {

        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="mt-3 rounded-full" >Book Appointment</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid md:grid-cols-2 grid-cols-1 ' >
                                {/* Calender */}
                                <div className='flex flex-col gap-3 items-baseline'  >
                                    <h2 className='flex gap-2 items-center' >
                                        <CalendarDays className='text-primary h-5 w-5' />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border "
                                        disabled={isPastDay}
                                    />
                                </div>
                                {/* Time Slot */}
                                <div className=' ml-2 md:mt-0' >
                                    <h2 className='flex gap-2 items-center mb-5'>
                                        <Clock className='text-primary h-5 w-5' />
                                        Select Time Slot
                                    </h2>
                                    <div className='
                                        grid grid-cols-3 gap-2
                                        border rounded-lg p-5
                                    ' >
                                        {
                                            timeSlot.map((item, index) => (
                                                <h2 key={index}
                                                    className={`p-2 border rounded-full 
                                                    hover:bg-primary hover:text-white
                                                    cursor-pointer ${item.time === selectedTimeSlot && "bg-primary text-white"}
                                                    text-center`}
                                                    onClick={() => setSelectedTimeSlot(item.time)}
                                                >
                                                    {item.time}
                                                </h2>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Textarea placeHolder="Enter your note" value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button type="button"
                                variant="outline"
                                className="text-red-500  border-red-500"
                            >
                                Close
                            </Button>
                            <Button type="button"
                                disabled={!(date && selectedTimeSlot)}
                                onClick={saveBooking}
                            >
                                Submit
                            </Button>
                        </>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default BookingAppointment;