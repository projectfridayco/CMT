"use client"

import { useCartStore } from "@/store/cart-store"
import { IndianRupee, Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"

const Cart = () => {

    const {items, addItem, removeItem, removeWholeItem, clearCart} = useCartStore()


    return(
        <>
            {items.map((item, idx) => (
  <div
    key={idx}
    className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-4"
  >
    {/* Row 1 - Image + Title + Price */}
    <div className="flex items-center gap-4 flex-1">
      <img
        src={item.imageURL}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
      />
      <div>
        <h2 className="font-semibold text-sm sm:text-base">
          {item.name} - {item.size}
        </h2>
        <p className="flex items-center text-base font-semibold">
          <IndianRupee size={14} /> {item.price * item.quantity}
        </p>
      </div>
    </div>

    {/* Row 2 - Quantity + Remove */}
    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
      {!item?.isGift && (
        <div className="flex items-center">
          <button
            className="bg-gray-200 py-1 px-3 rounded-lg cursor-pointer bg-primary"
            onClick={() => removeItem(item.id, item.size)}
          >
            <Minus size={15} />
          </button>
          <span className="py-2 px-4 text-lg font-semibold">
            {item.quantity}
          </span>
          <button
            className="bg-gray-200 py-1 px-3 rounded-lg cursor-pointer bg-primary"
            onClick={() => addItem({ ...item, quantity: 1 })}
          >
            <Plus size={15} />
          </button>
        </div>
      )}
      <button
        className="cursor-pointer text-red-500"
        onClick={() => removeWholeItem(item.id, item.size)}
      >
        <Trash2 />
      </button>
    </div>
  </div>
))}



            {/* {total >= 1500 && (
                    <h4 className="flex flex-row highlight">Free Delivery on orders above <IndianRupee /> 2000</h4>
            )} */}
            <Link className="underline mt-4 flex flex-row gap-2 cursor-pointer" href="/shop">Continue Shopping <ShoppingBag/></Link>
        </>
    )
}

export default Cart