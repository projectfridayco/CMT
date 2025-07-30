"use client"

import { useFilterStore } from "@/store/filter-store"
import { Check } from "lucide-react"
import localFont from "next/font/local"
import { useRouter } from "next/navigation"
import { useState } from "react"


type FilterProps = {
    categories: any[],
}

const neueFont = localFont({
    src: "./../../app/fonts/neue.ttf",
})


const Filters = ({categories} : FilterProps) => {
    const {selectedCategory,  selectedBrands, selectedSizes, setCategory, toggleBrand, toggleSize, resetFilter, setProducts} = useFilterStore()

    const subCategories = categories.filter(c => c.parent === selectedCategory)

    const [step,setStep] = useState<1 | 2>(1)
    const [loadingFilters,setLoadingFilters] = useState(false)
    const [localSizes,setLocalSizes] = useState<any[]>([])
    const [localbrands,setLocalBrands] = useState<any[]>([])
    
    const router = useRouter();

    const handleNextStep = async() => {
      setLoadingFilters(true)
      try{
        
        const res = await fetch(`api/filters?category=${selectedSubCategory.length > 0 ? selectedSubCategory.join(",") : selectedCategory}`)
        const data = await res.json()
        setProducts(data.products)

        const sizeSet = new Set<string>();
        const brandSet = new Set<string>();

        data?.products?.forEach((product:any) => {
          const sizeAttr = product.attributes?.find((a:any) => a.slug === 'pa_product-size')
          sizeAttr?.options?.forEach((size: string) => sizeSet.add(size))

          if(product.brand) brandSet.add(product.brand)
        })



        setLocalSizes(Array.from(sizeSet))
        setLocalBrands(Array.from(brandSet))
        setStep(2)
      }catch(err){
        console.log("Failed to fetch filter data",err)
      }
      finally{
        setLoadingFilters(false)
      }
    }

  const selectedSubCategory = useFilterStore((state) => state.selectedSubCategory);
  const setSubCategory = useFilterStore((state) => state.setSubCategory);

const handleCheckbox = (id: number, checked: boolean) => {
  const updated = checked
    ? [...selectedSubCategory, id]
    : selectedSubCategory.filter((s) => s !== id);
  setSubCategory(updated);
};

    return(
        <div className="filter__comp">
          {step === 1 && (
            <>
            <div className="filter__item">
                    <h3 className={`tracking-wide ${neueFont.className}`}>Categories</h3>
                    <div className='filter__list'>
                        {categories.filter(c => c.parent === 0)
                        .map((cat:any) => (
                        <p key={cat.id}>
                            
                            <input type='radio'
                            id={`category-${cat.id}`}
                            hidden
                            // onSelect={() => setCategory(cat.id)}
                            onClick={() => setCategory(cat.id)}
                            // onChange={(e) => handleCheckbox(cat.slug,e.target.checked)} 
                            />
                            <label htmlFor={`category-${cat.id}`} className='check'><span>{selectedCategory === cat.id && <Check size={15} />}</span>{cat.name}</label>
                        </p>
                    ))}
                    </div>
                
                
                </div>


            {subCategories.length > 0 && (
            <div className="filter__item">
                  <h3 className={`tracking-wide ${neueFont.className}`}>Sub Category</h3>
                  <div className='filter__list'>
                  {subCategories.map((sub:any) => (
                      <p key={sub.id}>
                          <input type='checkbox'
                          id={`sub-${sub.id}`}
                          hidden
                          // onClick={() => setSubCategory(sub.id)}
                          onChange={(e) => handleCheckbox(sub.id,e.target.checked)} 
                          />
                          <label htmlFor={`sub-${sub.id}`} className='check'><span>{selectedSubCategory.includes(sub.id) && <Check size={15} />}</span>{sub.name}</label>
                      </p>
                  ))}
                  </div>
                </div>
              )}

              

            </>
          )}
                

          {step === 2 && (
            <>
              {localSizes.length > 0 && (
        <div className="filter__item">
          <h3 className={`tracking-wide ${neueFont.className}`}>Sizes</h3>
          <div className="filter__list">
            {localSizes.map((s) => (
              <p key={s}>
                          <input type='checkbox'
                          id={`size-${s}`}
                          hidden
                          checked={selectedSizes.includes(s)}
                          onChange={() => toggleSize(s)}
                          />
                          <label htmlFor={`size-${s}`} className='check'><span>{selectedSizes.includes(s) && <Check size={15} />}</span>{s}</label>
                      </p>
              
            ))}
          </div>
        </div>
      )}

             {localbrands.length > 0 && (
        <div className="filter__item">
          <h3 className={`tracking-wide ${neueFont.className}`}>Brands</h3>
          <div className="space-y-1">
            {localbrands.map((b) => (
              <label key={b.slug} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.slug)}
                  onChange={() => toggleBrand(b.slug)}
                />
                <span>{b.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

            </>
           
          )} 
            
      {/* Reset */}
      <div className="pt-2 flex flex-row justify-between">
        <button
          onClick={() => {resetFilter(); window.location.href = '/shop'; }}
          className="text-md text-red-500 hover:underline cursor-pointer"
        >
          Reset Filters
        </button>
        {selectedCategory && (
            <div className="flex flex-row gap-4">
              
              
              {step === 2 && (
                <div className="">
                <button
                  className="border-black text-black px-4 py-2 rounded text-sm cursor-pointer"
                  onClick={() => setStep(1)}
                  disabled={loadingFilters}
                >
                  {"Back"}
                </button>
              </div>
              )}

              {step === 1 && (
                <div className="">
                <button
                  className="border-black text-black px-4 py-2 rounded text-sm cursor-pointer"
                  onClick={handleNextStep}
                  disabled={loadingFilters}
                >
                  {loadingFilters ? "Loading..." : "Next"}
                </button>
              </div>
              )}
              
            </div>
              
            )}
      </div>
        </div>

    )
}

export default Filters