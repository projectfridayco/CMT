"use client"

import { UUID } from "crypto"
import localFont from "next/font/local"
import { IndianRupee, Minus, Plus, Trash2, XCircle } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import Cart from "@/components/ui/cart"
import { useEffect, useState } from "react"
import Checkout from "@/components/ui/checkout"
import Gift from "@/components/ui/gift"
import Loading from "@/components/ui/Loading"
import Link from "next/link"
import Image from "next/image"


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
    const [delivery,setDelivery] = useState<number>(49)
    const [shippingDetails,setShippingDetails] = useState<any>(null)

    

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
  if (gift) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}, [gift])

useEffect(() => {
  const giftInCart = items.find(item => item.isGift);

  if (total >= 2000 && !giftInCart) {
    setOffer(true);        // Show modal
    setOfferPush(false);   // No small notification
    setDelivery(0)
  } else if (total >= 1500 && !giftInCart) {
    setOfferPush(true);    // Show small notification
    setOffer(false);       // No modal
  } else {
    setOffer(false);
    setOfferPush(false);
    setDelivery(99)
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
        return <div className="flex flex-col">
            <Image src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/08/undraw_access-denied_krem.svg" alt="No Items on cart" width={250} height={0} className="self-center mb-4" />
            <h1 className="text-lg font-black uppercase text-center tracking-wide mb-4">
                You have no items available in the cart
            </h1>
            <Link href="/shop" className="uppercase font-bold border p-2 align-center text-center">Continue Shopping</Link>
        </div>
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => {
            resolve(true)
            }
            script.onerror = () => {
            resolve(false)
            }
            document.body.appendChild(script)
        })
        }

    const handlePayment = async() => {
        const res = await loadRazorpayScript()
        if(!res){
            alert("Failed to load Razorpay")
            return
        }

        const paymentData = {
            amount: (total + delivery) * 100,
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        }

        const razorpayOrder = await fetch("api/razorpay",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paymentData)
        }).then((res) => res.json())

        const options = {
            key: process.env.NEXT_PUBLIC_RZP_KEY,
            amount: razorpayOrder.amount,
            currency: "INR",
            name: "CMT Clothing",
            description: "Your ultimate surplus store",
            order_id: razorpayOrder.id,
            handler: async function(response: any){
                const orderRes = await fetch("api/order", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        cartItems: items,
                        razorpayPaymentId: response.razorpay_payment_id,
                        shippingDetails
                    })
                })

                if(orderRes.ok){
                    clearCart()
                    alert("Order placed successfully")
                    window.location.href = "/thankyou"
                }
                else{
                    alert("Payment accepted but order creation failed. Contact Support")
                }
            },
            prefill: {
                name: shippingDetails.first_name,
                email: shippingDetails.email,
                phone: shippingDetails.phone
            },
            theme: {
                color: "#000000"
            },
        }
       const paymentObject = new (window as any).Razorpay(options)
       paymentObject.open()
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
        <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-10xl font-bold mb-8 tracking-wide ${neueFont.className}`}>{checkout ? "Checkout" : "Your Bag"}</h1>

        <div className="grid lg:grid-cols-4 gap-16 ">
            <div className="col-span-3">
                {checkout ? (
                <Checkout setCheckout={setCheckout} setDelivery={setDelivery} onShippingChange={setShippingDetails}/>

                ) : (
                    
                <Cart/>
                    
                )}

            </div>
            <div className="col-span-3 lg:col-span-1">
                {offerPush && (
                    <div className="bg-black border border-black-300 p-4 rounded mb-4 text-center text-white text-sm">
                        You are just <span className="highlight text-md">₹{2000 - total}</span> away from unlocking an exclusive offer!
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
                {checkout && (<h3 className="font-semibold text-lg flex flex-row justify-between mb-2 ">Delivery: <span className="flex flex-row items-center"><IndianRupee size={15}/> {delivery}</span></h3>)}
                <h3 className="font-semibold text-lg flex flex-row justify-between mb-4 border-b-1 border-black">Discount: <span className="flex flex-row items-center"><IndianRupee size={15}/> 0</span></h3>
                <h1 className="font-semibold text-xl flex flex-row justify-between mb-4">Total: <span className="flex flex-row items-center"><IndianRupee size={15}/> {total + delivery}</span></h1>

                    
                {!checkout ? (
                <button className="bg-primary cursor-pointer rounded-md py-3 px-6 w-full" onClick={() => setCheckout(true)}>Proceed to Checkout</button>

                ) : (
                    <form>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handlePayment()
                        }} className="bg-primary cursor-pointer rounded-md py-3 px-6 w-full" >Proceed to Pay</button>

                    </form>
                )}



            </div>
        </div>
       
        {gift && giftProduct &&(
            <div className="fixed w-full h-full inset-0 bg-primary lg:pt-32 overflow-y-auto">
            <Gift product={giftProduct} onClose={() => setGift(false)}/>

            </div>  
        )}
        </>
        
    
    )
}

export default Bag