import { BadgeCent, Shirt, Truck, Zap, ShoppingBag, MapPin, Phone, Mail } from "lucide-react"
import localFont from "next/font/local"
import Link from "next/link"

const neueFont = localFont({
    src: "./../fonts/neue.ttf"
})

const About = () => {


    return(
        <div>
            <h1 className={`ml-4 text-4xl sm:text-6xl md:text-8xl lg:text-10xl tracking-wide ${neueFont.className} text-left`}>CONTACT</h1>
            <p className="font-light tracking-wide text-xl p-4 mt-4 leading-8 lg:max-w-3/4">CMT Clothing brings premium surplus fashion to the market and now offers exciting franchise opportunities. Partner with us to own a profitable fashion retail business backed by trusted sourcing, proven operations, and a growing customer base. Join the CMT network and turn style into success.</p>
            <ul className="social-icons p-4">
                <li className="flex flex-row gap-4 text-xl mb-6"><MapPin size={30}/>#123, ABC Street, <br/>Madurai - 625001</li>
                <li className="flex flex-row gap-4 text-xl mb-6"><Mail size={30}/>enquiry@originalsbycmt.com</li>
                <li className="flex flex-row gap-4 text-xl mb-6"><Phone size={30}/>+91 98745 63210</li>
            </ul>

            <div className="fixed bottom-0 left-0 right-0 px-4 ">
                <Link
                    href="/shop"
                    className="bg-primary flex flex-row p-4 rounded-md mb-2 justify-center items-center gap-2 tracking-wide text-xl w-full"
                >
                    SHOP <ShoppingBag />
                </Link>
            </div>
        </div>
    )
}

export default About