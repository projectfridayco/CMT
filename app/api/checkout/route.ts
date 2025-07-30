import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto"
import { getOrCreateCustomer } from "./create-user";

const razorpay = new Razorpay({
    key_id:process.env.RZP_KEY!,
    key_secret:process.env.RZP_SECRET!
})



export const POST = async(req: NextRequest) => {

    const body = await req.json();
    const {email,name,phone,password,cartItems,totalAmount} = body

    const customer = await getOrCreateCustomer({name, email, phone, password})

    const orderId = crypto.randomUUID()

    const payment_capture = 1
    const currency = "INR"

    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: orderId,
        notes:{
            wooCustomerId: customer.id,
            customerEmail: email
        }
        // payment_capture
    }


    try{
        const order = await razorpay.orders.create(options);
        return NextResponse.json({
            success: true,
            razorpayOrderId: order.id,
            orderId,
            customer,
        })
    }
    catch(err){
        return NextResponse.json({error: "Failed to process razorpay order"}, {"status": 500})
    }
}