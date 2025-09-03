"use client"

import { ChevronLeft, ChevronRight, IndianRupee, Minus, MoveLeft, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import localFont from "next/font/local"
import { useCartStore } from "@/store/cart-store"
import ProductSuggestionModal from "@/components/ui/ProductSuggestionModal"
import Loading from "@/components/ui/Loading"
import toast from 'react-hot-toast'


const neueFont = localFont({
    src: "./../../fonts/neue.ttf",
})

const ProductDetail = () => {

    const {slug} = useParams()

    const [product,setProduct] = useState<any>(null)
    
    const [activeImg,setActiveImg] = useState<number>(0)
    const [recommendedProducts,setRecommendedProducts] = useState<any>([])
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity,setQuantity] = useState(1)
    const [suggestionModal,setSuggestionModal] = useState<boolean>(false)
    const [loading,setLoading] = useState(true)
    const [canHideLoading, setCanHideLoading] = useState(false);

    const [thumbIndex,setThumbIndex] = useState(0)
    const thumbPerView = 6

    const {items, addItem} = useCartStore();

    const onAddItem = async() => {

        if(!selectedSize){
          toast.error("Plase select a size before adding to cart")
          return
        } 
      
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageURL: product.images[0],
            quantity: quantity,
            size: selectedSize,
            isGift: false
        })

        setSuggestionModal(true)

    }

    useEffect(() => {
        if(!slug) return 
        setLoading(true)
        fetch(`/api/detail?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data)
            setActiveImg(0)
            setRecommendedProducts(data?.recommended)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setCanHideLoading(true)
        })
    }, [])

    if(!product) return <p className="p-10">Please Wait...</p>

    const preferredOrder = ["XS", "S", "M", "L", "XL","XXL","XXXL"];
    const sizeAttr = product?.attributes?.find(
        (attr: any) => attr.name.toLowerCase() === "Product Size" || attr.slug === "pa_product-size"
        )
    
    let sortedSizes: string[] = [];
    if (sizeAttr?.options) {
      sortedSizes = [...sizeAttr.options].sort(
        (a, b) => preferredOrder.indexOf(a) - preferredOrder.indexOf(b)
      );
    }

    const handlePrevImage = () => {
        setActiveImg((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))
    };

    const handleNextImage = () => {
      setActiveImg((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))
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
        <div className="grid grid-cols-1 justify-center lg:grid-cols-2 lg:items-center lg:pl-8">
              <div className="flex flex-col gap-6 lg:w-3/4 lg:just">
                <div className="relative w-full aspect-square">
                  <img src={product.images[activeImg]?.src} className="aspect-square w-full h-full object-cover rounded-xl mx-auto" />
                  <button onClick={handlePrevImage} className="absolute -transalte-y-1/2 left-2 top-1/2 p-2 rounded-full shadow bg-primary"><ChevronLeft/></button>
                  <button onClick={handleNextImage} className="absolute -transalte-y-1/2 right-2 top-1/2 p-2 rounded-full shadow bg-primary"><ChevronRight/></button>

                </div>

                <div className="flex gap-2 mt-4">
                  {product.images.slice(0,4).map((img:any, index: number) => (
                      <img src={img?.src} key={index} className="w-20 h-20 rounded-md object-cover cursor-pointer" onClick={() => setActiveImg(index)}/>
                  ))}
                  {product.images.length > 4 && (
                    <div
                      className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setActiveImg(4)}
                    >
                      <img
                        src={product.images[4].src}
                        alt=""
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-md">
                        +{product.images.length - 4}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            

            <div className="flex flex-col p-2 lg:pr-16">
                <h1 className={`text-4xl sm:text-6xl mt-16 font-bold tracking-wide ${neueFont.className}`}>{product.name}</h1>
                <div className="mt-8 lg:text-xl text-md text-gray-600 font-semibold" dangerouslySetInnerHTML={{ __html: product.description }} />
                <h6 className="text-4xl font-semibold mt-8 highlight flex flex-row"><IndianRupee/> {product.price}</h6>
                {sizeAttr && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Select Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {sortedSizes.map((size: string) => (
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
                          peer-checked:bg-black peer-checked:text-white
                          
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
                        <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}><Minus size={15}/></button>
                        <span className="py-4 px-6 rounded-lg text-xl font-semibold">{quantity}</span>
                        <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer bg-primary" onClick={() => setQuantity((prev) => prev + 1)}><Plus size={15}/></button>
                    </div>
                    <button className="font-semibold py-3 px-16 rounded-xl h-full flex flex-row gap-2 justify-center cursor-pointer bg-primary" onClick={onAddItem}>Add to bag <ShoppingBag size={20}/></button>

                </div>
                <Link href="/shop" className="flex flex-row gap-2 mt-4 underline underline-offset-8"><MoveLeft/> Back to Shop</Link>
                
            </div>
            {suggestionModal && (
        <ProductSuggestionModal
          onClose={() => setSuggestionModal(false)}
          recommended= {recommendedProducts}// pass your target category here
        />
      )}
        </div>
        </>
    )
}

export default ProductDetail