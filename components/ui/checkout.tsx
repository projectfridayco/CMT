"use client"

import { MoveLeft } from "lucide-react"
import Link from "next/link"

type CheckoutProps = {
    setCheckout : (value: boolean) => void;
}

const Checkout = ({setCheckout}: CheckoutProps) => {
    return(
        <>  
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <p className="text-gray-900 text-sm mb-2">We'll use this email to send you details and updates about your order.</p>
            <div className="grid grid-cols-2 gap-2">
                <input type="email" name="email" placeholder="Email Address" required className="border rounded p-2 w-full mb-2 text-sm" />
                <input type="password" name="password" placeholder="Create Password" required className="border rounded p-2 w-full mb-2 text-sm" />
            </div>

            <h3 className="font-semibold text-lg mt-4">Billing Address</h3>
            <p className="text-gray-900 text-sm mb-2">Enter the billing address that matches your payment method.</p>
            <div className="grid grid-cols-2 gap-2">
                <input type="text" name="first_name" placeholder="First Name" required className="border rounded p-2 w-full mb-2 text-sm" />
            <input type="text" name="last_name" placeholder="Last Name" required className="border rounded p-2 w-full mb-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <input type="text" name="phone" placeholder="Phone" required className="border rounded p-2 w-full mb-2 text-sm" />
                <input type="text" name="city" placeholder="City" required className="border rounded p-2 w-full mb-2 text-sm" />
                
            </div>
            <input type="text" name="address_1" placeholder="Address" required className="border rounded p-2 w-full mb-2 text-sm" />

            <h6 className="text-sm text-black-900 mt-4">By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy</h6>
            <button className="underline cursor-pointer flex flex-row gap-2 mt-4" onClick={() => setCheckout(false)}><MoveLeft/> Back to bag</button>
        </>
    )   
}

export default Checkout