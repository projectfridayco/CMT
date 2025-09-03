import { NextRequest,NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY,
    key_secret: process.env.RZP_SECRET
})

export async function POST(req: NextRequest){
    try{
        const {amount, currency = "INR"} = await req.json()

        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`
        })

        return NextResponse.json({id: order.id,amount:order.amount})
    }catch(err){
        console.error('Razorpay error', err)
        return NextResponse.json({error: "Failed to create order"},{status: 500})
    }
}