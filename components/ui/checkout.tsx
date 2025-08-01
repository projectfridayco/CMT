"use client"

import { MoveLeft } from "lucide-react"
import localFont from "next/font/local";
import Link from "next/link"

type CheckoutProps = {
    setCheckout : (value: boolean) => void;
}

const neueFont = localFont({
    src: "./../../app/fonts/neue.ttf"
})

const Checkout = ({setCheckout}: CheckoutProps) => {
    return(
        <>  
            <h3 className={`font-semibold text-xl tracking-wide ${neueFont.className} highlight`}>Contact Information</h3>
            <p className="text-gray-900 text-sm mb-2">We will use this email to send you details and updates about your order.</p>
            <div className="grid grid-cols-2">
                <input type="email" name="email" placeholder="Email Address" required className="border rounded p-2 w-full mb-2 text-sm" />
                {/* <input type="password" name="password" placeholder="Create Password" required className="border rounded p-2 w-full mb-2 text-sm" /> */}
            </div>
            <Link href="login" className="underline ">Already an user? Login.</Link>


            <h3 className={`font-semibold text-xl mt-8 tracking-wide ${neueFont.className} highlight`}>Billing Address</h3>
            <p className="text-gray-900 text-sm mb-2">Enter the billing address that matches your payment method.</p>
            <div className="grid grid-cols-2 gap-2">
                <input type="text" name="full_name" placeholder="Full Name" required className="border rounded p-2 w-full mb-2 text-sm" />
                <input type="text" name="phone" placeholder="Phone" required className="border rounded p-2 w-full mb-2 text-sm" />

            </div>
            <input type="text" name="address_1" placeholder="Address" required className="border rounded p-2 w-full mb-2 text-sm" />

            <div className="grid grid-cols-2 gap-2">
                {/* <input type="text" name="province" placeholder="State/Province" required className="border rounded p-2 w-full mb-2 text-sm" /> */}
                <select name="province" required className="border rounded p-2 w-full mb-2 text-sm">
                    <option value="">Select State / Union Territory</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                </select>
                <input type="text" name="city" placeholder="City" required className="border rounded p-2 w-full mb-2 text-sm" />
                
            </div>

            <h6 className="text-sm text-black-900 mt-4">By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy</h6>
            <button className="underline cursor-pointer flex flex-row gap-2 mt-4" onClick={() => setCheckout(false)}><MoveLeft/> Back to bag</button>
        </>
    )   
}

export default Checkout