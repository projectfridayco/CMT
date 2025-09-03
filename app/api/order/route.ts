import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try{
        const { cartItems, shippingDetails, razorpayPaymentId} = await req.json()

        const orderBody = {
            payment_method : "razorpay",
            payment_method_title: "Razorpay",
            set_paid: true,
            billing: shippingDetails,
            shipping:shippingDetails,
            line_items: cartItems.map((item: any) => ({
                product_id: item.id,
                quantity: item.quantity,
                variation_id: item.variation_id || undefined
            })),
            meta_data: [
                {
                    key: "_razorpay_payment_id",
                    value: razorpayPaymentId
                }
            ]
        }

        const auth = Buffer.from(
                `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64")

        const baseURL = "https://endpoint.originalsbycmt.com/wp-json/wc/v3"

        const orderRes = await fetch(`${baseURL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`
            },
            body: JSON.stringify(orderBody)
        })

        if(!orderRes.ok){
            const error = await orderRes.json()
            console.error("Woocommerce error", error);
            return NextResponse.json({error: "Woocommerce order failed"},{status: 500})
        }

        const data = await orderRes.json()
        return NextResponse.json({order:data})

    }catch(err: any){
        console.error("Order API error", err)
        return NextResponse.json({error: "Internal Server Error"},{status: 500})
    }
}