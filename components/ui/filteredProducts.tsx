import { useFilterStore } from "@/store/filter-store";
import { useMemo } from "react";


const filteredProducts = useMemo(() => {
    const {products, selectedBrands, selectedSizes} = useFilterStore.getState()

    return products.filter(product => {
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