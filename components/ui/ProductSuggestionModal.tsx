'use client'

import { XCircle } from 'lucide-react'
import {  useState } from 'react'
import Image from 'next/image'

export default function ProductSuggestionModal({ onClose, recommended }: { onClose: () => void, recommended: any[] }) {
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     const auth = Buffer.from(
  //       `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  //     ).toString('base64')

  //     const res = await fetch(`https://originalsbycmt.com/wp-json/wc/v3/products?category=${categoryID}&per_page=4`, {
  //       headers: {
  //         Authorization: `Basic ${auth}`
  //       }
  //     })

  //     const data = await res.json()
  //     setProducts(data)
  //   }

  //   fetchSuggestions()
  //   console.log(products.map(p => p.id));
  // }, [categoryID])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black p-6 rounded max-w-lg w-full text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">You may also like</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900"><XCircle/></button>
        </div>
        <div className="grid grid-cols-2 gap-4">

          {recommended.map((p: any) => (
            
            <div key={p.id} className="text-center">
              <Image src={p.images[0]?.src} alt={p.name} className="w-full h-64 object-cover mb-2" />
              <p className="text-sm">{p.name}</p>
              <p className="text-sm font-semibold">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}