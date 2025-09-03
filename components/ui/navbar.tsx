"use client"

import { useCartStore } from "@/store/cart-store";
import { Menu, ShoppingBag, User2, XCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import localFont from "next/font/local";

type NavbarProps = {
    isNavbar: boolean
}

const neueFont = localFont({
    src: "./../../app/fonts/neue.ttf",
})

const Navbar = ({isNavbar}: NavbarProps) => {

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const {items} = useCartStore();
    const cartCount = items.reduce((acc,item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768){
                setMobileOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)

        return window.removeEventListener("resize",handleResize)
    }, [])

    return(
        <nav className="navbar p-4 md:p-8 flex items-center justify-between border-b-1 border-black mb-4">
          <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/03/CMT-LOGO-01.png" className="w-30"/>
          {/* <button><Menu/></button> */}

        {!isNavbar && (
            <ul className="flex gap-8 items-center font-semibold pr-4 hidden md:flex">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
   
          </ul>
        )}
          {!isNavbar ? (
            <div className="flex gap-2">
                <Link href="/bag" className="relative">
                    <ShoppingBag className="h-6 w-6"/>
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-xl text-xs bg-primary ">{cartCount}</span>}
                </Link>
            {/* <User2/> */}
            <button className="cursor-pointer md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
                {mobileOpen ? <XCircle/> : <Menu/>}
            </button>
            </div>
          ):(
            <Link href="/shop" className="bg-primary rounded-md flex flex-row gap-4 py-3 px-6">Shop <ShoppingBag size={20}/></Link>
          )}
          
          {mobileOpen && (
            <nav className="md:hidden bg-primary shadow-md absolute top-[8rem] right-0 w-full z-99 text-center">
                <ul className="flex flex-col p-8 space-y-8 uppercase font-bold">
                    <li>
                        <Link href="/" className={`block hover:text-blue-600 tracking-wide ${neueFont.className}`}>Home</Link>
                    </li>
                    <li>
                        <Link href="/shop" className={`block hover:text-blue-600 tracking-wide ${neueFont.className}`}>Shop</Link>
                    </li>
                    <li>
                        <Link href="/about" className={`block hover:text-blue-600 tracking-wide ${neueFont.className}`}>About</Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`block hover:text-blue-600 tracking-wide ${neueFont.className}`}>Contact</Link>
                    </li>
                </ul>
            </nav>
          )}

        </nav>
    )
}

export default Navbar