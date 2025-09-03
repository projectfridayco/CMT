import { BadgeCent, Shirt, Truck, Zap, ShoppingBag } from "lucide-react"
import localFont from "next/font/local"
import Link from "next/link"

const neueFont = localFont({
    src: "./../fonts/neue.ttf"
})

const About = () => {


    return(
        <div>
            <h1 className={`ml-4 text-4xl sm:text-6xl md:text-8xl lg:text-10xl tracking-wide ${neueFont.className} text-left`}>ABOUT</h1>
            <p className="font-light tracking-wide text-xl p-4 mt-4 leading-8 lg:max-w-3/4">CMT Clothing offers premium surplus fashion at unbeatable prices. We source high-quality, overstock, and export surplus apparel from leading brands, ensuring style and value for everyone. Our collection changes often, bringing you fresh finds every visit. Fashion shouldn’t cost a fortune—shop smart, shop CMT Clothing.</p>
            <ul className="social-icons p-4">
                <li className="flex flex-row gap-4 text-xl font-bold mb-4"><Truck size={30}/>Shipping across India</li>
                <li className="flex flex-row gap-4 text-xl font-bold mb-4"><Shirt size={30}/>Premium Brands</li>
                <li className="flex flex-row gap-4 text-xl font-bold mb-4"><BadgeCent size={30}/>Early Discounts</li>
                <li className="flex flex-row gap-4 text-xl font-bold mb-16"><Zap size={30}/>Fast Fashion</li>
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