"use client"

import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useMemo, useRef, useState } from 'react';

import {Filter, IndianRupee, XCircle} from "lucide-react"
import Link from 'next/link';
import localFont from 'next/font/local';
import SkeletonCard from '@/components/ui/Loading';
import Filters from '@/components/ui/Filters';
import { useFilterStore } from '@/store/filter-store';
import Loading from '@/components/ui/Loading';

gsap.registerPlugin(useGSAP);

const neueFont = localFont({
    src: "./../fonts/neue.ttf",
})




const Shop = () => {

    const [localProducts,setLocalProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [sizes,setSizes] = useState([])
    const [brands,setBrands] = useState([])
    const [selectedCheck,setSelectedCheck] = useState([])
    const container = useRef(null);
    const [loading,setLoading] = useState(true)
    const [canHideLoading, setCanHideLoading] = useState(false);
    const {products, setProducts,selectedCategory,selectedSubCategory} = useFilterStore()





useEffect(() => {
  const getInitialCategory = () => {
    if (typeof window === "undefined") return null

    try {
      const saved = JSON.parse(localStorage.getItem("filter-store") || "{}")
      return saved?.state?.selectedCategory || null
    } catch {
      return null
    }
  }

      function handleCheckbox(slug:string, checked:boolean){
    setSelectedCheck((prev) => 
        checked ? [...prev,slug] : prev.filter((s) => s !== slug)
    )
    console.log(selectedCheck)
    }

  const initialCategory = getInitialCategory()

  setLoading(true)

  const url = initialCategory
    ? `/api/filters?category=${initialCategory}`
    : `/api/products`

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products)

    setCategories(data.filters.categories)

    })
    .catch(() => setLoading(false))
    .finally(() => {
        setCanHideLoading(true);
        // setLoading(false)
    })
}, [])

    useGSAP(() => {
        const filterButton = document.querySelector(".filter__btn");
        const closeButton = document.querySelector(".close__btn");
        const applyButton = document.querySelector(".apply__btn");
        // let isOpen = false;

        const timeline = gsap.timeline({paused: true});

        timeline.to(".filter__overlay",{
            duration: 0.5,
            clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut "
        })

        timeline.from(".filter__comp",{
            duration: 0.5,
            scale: 0,
            ease: "power4.inOut "
        })

        filterButton?.addEventListener("click", function(){  
            timeline.play();
        })

        closeButton?.addEventListener("click", function(){  
            timeline.reverse();
        })

        applyButton?.addEventListener("click", function(){  
            timeline.reverse();
        })
    }, )
    

    function applyFilters() {
        const categoryQuery = selectedCheck.map(c => `category=${c}`).join("&")

        fetch(`/api/products?${categoryQuery}`)
            .then(res => res.json())
            .then(data => {
            setProducts(data.products)
            
            })
        }
        

    const filteredProducts = useMemo(() => {
        const {products, selectedBrands, selectedSizes} = useFilterStore.getState()
    
        return products?.filter(product => {
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    
            const productSizes = product.attributes?.find(attr => attr.slug === "pa_product-size")?.options || []
    
            const matchesSize = selectedSizes.length === 0 || productSizes.some(size => selectedSizes.includes(size))
    
            return matchesBrand && matchesSize
        })
    
    },
    [useFilterStore((state) => state.products),
    useFilterStore((state) => state.selectedBrands),
    useFilterStore((state) => state.selectedSizes)
    ])

    return(
        <>
        {loading && (
            <Loading trigger={canHideLoading}
          onExit={() => {
            setLoading(false); 
          }}
        />
        )}
        <div className='shop-wrapper' ref={container}>
        <div className='page__header'>
            <div className="flex  title__header">
                <h1 className={`ml-4 text-4xl sm:text-6xl md:text-8xl lg:text-10xl tracking-wide ${neueFont.className} text-left`}>Products</h1>
                {/* <p className='lg:text-right'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
            </div>
            
            {/* <div className="flex gap-8 pl-8 filter_gen">
                <a href="#" className='font-semibold current'>All</a>
                <a href="#" className='font-semibold'>Men</a>
                <a href="#" className='font-semibold'>Women</a>
                <a href="#" className='font-semibold'>Kids</a>

            </div> */}
            
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {filteredProducts.map((product: any) => (
                <Link href={`shop/${product.slug}`} key={product.id} className="p-3 sm:p-4 rounded-xl shadow shop__card">
                <img
                    src={product.images[0]?.src}
                    alt={product.name}
                    className="lg:h-120 lg:w-120 md:h-80 md:w-140 sm:w-full object-cover rounded-2xl"
                />
                <h2 className={`${neueFont.className} tracking-wide mt-4 pl-2 sm:pl-4 text-md md:text-lg font-bold`}>{product.name}</h2> 
                <p className='font-bold pl-2 md:pl-4 flex flex-row mt-2'><IndianRupee size={15}/> {product.price}</p>
                {/* <p dangerouslySetInnerHTML={{ __html: product.price_html }} /> */}
                </Link>
            ))}
        </div>
        
        <div className="filter__overlay">
            <div className="filter__menu">
            
                <Filters categories={categories} />

                
            <button className='close__btn'><XCircle size={50} /></button>

            </div>
            
        </div>
        <button className='filter__btn flex gap-4'><Filter/> FILTER</button>
        </div>
        {loading && canHideLoading && null}
        </>
    )
}

export default Shop