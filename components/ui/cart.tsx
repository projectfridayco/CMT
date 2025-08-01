"use client"

import { useCartStore } from "@/store/cart-store"
import { IndianRupee, Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"

const Cart = () => {

    const {items, addItem, removeItem, removeWholeItem, clearCart} = useCartStore()

    return(
        <>
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center justify-between border-b pb-4">
            <img src={item.imageURL} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
                <h2 className="font-semibold">{item.name} - {item.size}</h2>
                <p className="flex items-center text-lg font-semibold"><IndianRupee size={14}/> {item.price * item.quantity}</p>
                {/* <p className="text-sm">Qty: {item.quantity}</p> */}
            </div>
            {!item?.isGift && (
            <div className="flex flex-row lg:items-center">
                <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary" onClick={() => removeItem(item.id,item.size)}><Minus size={15}/></button>
                <span className="py-4 px-6 rounded-lg text-xl font-semibold">{item.quantity}</span>
                <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary" onClick={() => addItem({...item, quantity: 1})}><Plus size={15}/></button>
            </div>
            )}
            
            <button className="cursor-pointer" onClick={() => removeWholeItem(item.id,item.size)}>
                <Trash2 />
            </button>

            </div>
            ))}
            <Link className="underline mt-4 flex flex-row gap-2 cursor-pointer" href="/shop">Continue Shopping <ShoppingBag/></Link>
        </>
    )
}

export default Cart