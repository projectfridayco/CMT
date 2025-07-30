import {create} from 'zustand'
import {persist,PersistOptions} from 'zustand/middleware'


type FilterState =  {
    selectedCategory: number | null
    selectedSubCategory: number[]
    selectedSizes: string[]
    selectedBrands: string[]
    products: any[]
    setCategory: (id:number) => void
    setSubCategory: (ids:number[]) => void
    toggleSize: (slug: string) => void
    toggleBrand: (slug:string) => void
    resetFilter: () => void
    setProducts: (products: any[]) => void
}



export const useFilterStore = create<FilterState>()(
        persist(
        (set,get) => ({
    selectedCategory: null,
    selectedSubCategory: [],
    selectedSizes: [],
    selectedBrands: [],
    products: [],
    setCategory: (id) => set({selectedCategory: id, selectedSubCategory: [],selectedBrands: [], selectedSizes: []}),
    setSubCategory: (subIds:number[]) => {
        set({ selectedSubCategory: subIds });
},
    toggleSize: (slug) => {
        const current = get().selectedSizes
        set({
            selectedSizes: current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
        })
    },
    toggleBrand: (slug) => {
        const current = get().selectedBrands
        set({
            selectedBrands: current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug]
        })
    },
    resetFilter: () => {
        set({selectedCategory: null,
            selectedSubCategory: [],
            selectedSizes: [],
            selectedBrands: [],
            products: []
        })
    },
    setProducts: (products) => set({ products }),
}),
{
    name:'filter-store',
    partialize: (state) => ({
        selectedCategory: state.selectedCategory,
        selectedSubCategory: state.selectedSubCategory,
        selectedBrands: state.selectedBrands,
        selectedSizes: state.selectedSizes
    })
},

)
)