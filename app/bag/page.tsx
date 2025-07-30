"use client"

import localFont from "next/font/local"
import { IndianRupee, Minus, Plus, Trash2, XCircle } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import Cart from "@/components/ui/cart"
import { useEffect, useState } from "react"
import Checkout from "@/components/ui/checkout"
import Gift from "@/components/ui/gift"
import Loading from "@/components/ui/Loading"


const neueFont = localFont({
    src: "./../fonts/neue.ttf",
})

const Bag = () => {

    const {items, removeItem, addItem, clearCart, removeWholeItem} = useCartStore()
    const total = items.reduce((acc,item) => acc + item.price * item.quantity, 0);
    const [checkout,setCheckout] = useState<boolean>(false);
    const [offerPush, setOfferPush] = useState<boolean>(false)
    const [offer,setOffer] = useState<boolean>(false)
    const [coupon, setCoupon] = useState<string>("")
    const [gift,setGift] = useState<boolean>(false)
    const [giftProduct,setGiftProduct] = useState<any>([]) 
    const [loading,setLoading] = useState(false)
    const [canHideLoading, setCanHideLoading] = useState(false);

    

//     useEffect(() => {
//   if (total >= 2000) {
//     setOffer(true)
//     setOfferPush(false)
    
//   } else if (total >= 1500) {
//     setOfferPush(true)
//     setOffer(false)
//   } else {
//     setOffer(false)
//     setOfferPush(false)
//   }
// }, [total])

useEffect(() => {
  const giftInCart = items.find(item => item.isGift);

  if (total >= 2000 && !giftInCart) {
    setOffer(true);        // Show modal
    setOfferPush(false);   // No small notification
  } else if (total >= 1500 && !giftInCart) {
    setOfferPush(true);    // Show small notification
    setOffer(false);       // No modal
  } else {
    setOffer(false);
    setOfferPush(false);
  }


  if (giftInCart && ((total - giftInCart.price) < 2000) ) {
    removeItem(giftInCart.id,giftInCart.size); 
  }
}, [total, items]);

    const giftInCart = items.find(item => item.isGift);
    const handleClaimGift = async () => {
    try {
        setLoading(true)
        const res = await fetch(`/api/detail?slug=jockey-trunk`)
        const data = await res.json()
        setGiftProduct(data)
        setGift(true)
    } catch (error) {
        console.error("Failed to fetch gift data:", error)
    }
    finally{
        setCanHideLoading(true)
    }
    }

    // const addCoupon = () => {
    //     setCoupon(couponCode)
    // }

    const removeCoupon = () => {
        setCoupon("")
    }

    if(total === 0 || items.length === 0){
        return <div>
            <h1>
                Your cart is Empty
            </h1>
        </div>
    }

    return(
        <>
        {loading && (
                          <Loading trigger={canHideLoading}
                        onExit={() => {
                          setLoading(false); 
                        }}
                      />
                      )}
        <h1 className={`text-8xl font-bold mb-8 tracking-wide ${neueFont.className}`}>{checkout ? "Checkout" : "Your Bag"}</h1>

        <div className="grid lg:grid-cols-4 gap-16 ">
            <div className="col-span-3">
                {checkout ? (
                <Checkout setCheckout={setCheckout} />

                ) : (
                <Cart/>

                )}

            </div>
            <div className="col-span-1">
                {offerPush && (
                    <div className="bg-black border border-black-300 p-4 rounded mb-4 text-center text-white text-sm">
                        You're just <span className="highlight text-md">₹{2000 - total}</span> away from unlocking an exclusive offer!
                    </div>
                    )}
                    {!giftInCart && offer && (
                    <button className="bg-black border border-black-300 p-4 rounded mb-4 text-center text-white text-sm cursor-pointer w-full" onClick={handleClaimGift}>
                        Yay! <span className="highlight text-md">Click here</span> to claim your offer
                    </button>
                    )}
                {coupon ?
                (
                    <h3 className="font-semibold text-lg flex flex-row justify-between mb-2">Coupon: <span className="flex flex-row items-center">{coupon} <button><XCircle size={15} /></button></span></h3>      
                ) :
                (
                    <form className="grid grid-cols-3 items-start gap-2 mb-4">
                        <input type="text" name="coupon" placeholder="Enter Coupon" required className="col-span-2 border rounded p-2 w-full mb-2 text-sm" />
                        <button className="col-span-1 bg-primary cursor-pointer rounded-md py-2  w-full" >Apply</button>

                    </form>
                )
            }
                
                <h3 className="font-semibold text-lg flex flex-row justify-between mb-2">Subtotal: <span className="flex flex-row items-center"><IndianRupee size={15}/> {total}</span></h3>
                <h3 className="font-semibold text-lg flex flex-row justify-between mb-4 border-b-1 border-black">Discount: <span className="flex flex-row items-center"><IndianRupee size={15}/> {total}</span></h3>
                <h1 className="font-semibold text-xl flex flex-row justify-between mb-4">Total: <span className="flex flex-row items-center"><IndianRupee size={15}/> {total}</span></h1>

                    
                {!checkout ? (
                <button className="bg-primary cursor-pointer rounded-md py-3 px-6 w-full" onClick={() => setCheckout(true)}>Proceed to Checkout</button>

                ) : (
                    <form>
                        <button className="bg-primary cursor-pointer rounded-md py-3 px-6 w-full" >Proceed to Pay</button>

                    </form>
                )}



            </div>
        </div>
       
        {gift && giftProduct &&(
            <div className="fixed w-full h-full inset-0 bg-primary pt-32">
            <Gift product={giftProduct} onClose={() => setGift(false)}/>

            </div>  
        )}
        </>
        
    
    )
}

export default Bag