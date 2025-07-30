"use client"

import { IndianRupee, Minus, MoveLeft, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import localFont from "next/font/local"
import { useCartStore } from "@/store/cart-store"
import ProductSuggestionModal from "@/components/ui/ProductSuggestionModal"


const neueFont = localFont({
    src: "./../../app/fonts/neue.ttf",
})

// type GiftProps = {
//     product: any[],
// }

const Gift = ({product, onClose}:{product: any, onClose:any}) => {


    // const [product,setProduct] = useState<any>(null)
    
    const [activeImg,setActiveImg] = useState<any>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    // const [quantity,setQuantity] = useState(1)

    const {items, addItem} = useCartStore();

    const onAddItem = async() => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageURL: product.images[0],
            quantity: 1,
            size: selectedSize,
            isGift: true
        })

        onClose()
    }

    useEffect(() => {

        setActiveImg(product?.images[0])
    }, [])



    const sizeAttr = product?.attributes?.find(
        (attr: any) => attr.name.toLowerCase() === "Product Size" || attr.slug === "pa_product-size"
        )


    return(
        <div className="grid grid-cols-1 justify-center lg:grid-cols-2 lg:items-center lg:pl-8">
            <div className="flex flex-col gap-6 lg:w-3/4 lg:just">
                <img src={activeImg?.src} className="aspect-square w-full h-full object-cover rounded-xl mx-auto" />
                <div className="flex flex-row justify-between h-24">
                    {product.images.map((img:any) => (
                        <img src={img?.src}  className="w-24 h-24 rounded-md object-cover cursor-pointer" onClick={() => setActiveImg(img)}/>

                    ))}

                </div>

            </div>

            <div className="flex flex-col lg:pr-16">
                <h1 className={`text-6xl mt-16 font-bold tracking-wide ${neueFont.className}`}>{product.name}</h1>
                <div className="mt-8 lg:text-xl text-md text-gray-600 font-semibold" dangerouslySetInnerHTML={{ __html: product.description }} />
                <h6 className="text-4xl font-semibold mt-8 highlight flex flex-row"><IndianRupee/>{product.price}</h6>
                {sizeAttr && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Select Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {sizeAttr.options.map((size: string) => (
                      <label key={size} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="product-size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                          className="peer hidden"
                        />
                        <div className={`
                          px-4 py-2 border rounded-lg
                          peer-checked:bg-white peer-checked:text-black
                          
                          transition
                        `}>
                          {size}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
                <div className="flex flex-col lg:flex-row lg:items-center gap-12 mt-4">
                    <div className="flex flex-row lg:items-center">
                        <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary border" disabled={true}><Minus size={15}/></button>
                        <span className="py-4 px-6 rounded-lg text-xl font-semibold">1</span>
                        <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary border" disabled={true}><Plus size={15}/></button>
                    </div>
                    <button className="font-semibold py-3 px-16 rounded-xl border h-full flex flex-row gap-2 justify-center cursor-pointer bg-primary" onClick={onAddItem}>Claim Offer <ShoppingBag size={20}/></button>

                </div>
                <button onClick={onClose} className="flex flex-row gap-2 mt-4 underline underline-offset-8 highlight cursor-pointer"><MoveLeft/> Back to Bag</button>
                
            </div>
            
        </div>
    )
}

export default Gift