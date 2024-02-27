import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Emails from '@/emails';

const resend = new Resend('re_7D7Vk9T5_MNrAZbbF6JFQFkeQ3iTWzcnU');



export async function POST(req) {

    try {
        const response = await req.json()

        const data = await resend.emails.send({
            from: 'kangjohang1707a@gmail.com',
            to: [response.data.Email],
            subject: 'hello world',
            react: Emails({ response })
        });


        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json({ error })
    }
}