import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {

    const {searchParams} = new URL(req.url)

    const allProducts:any[] = []

    if(!searchParams.has("category")){
        return NextResponse.json({ message: "No categories Selected", },
      { status: 404 })
        
    }

    const raw = searchParams.get("category")
    const categories = raw?.split(",") || []

    
    const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64")

  const baseURL = "https://originalsbycmt.com/wp-json/wc/v3"

  try{


  for(const cat of categories){
    const res = await fetch(`${baseURL}/products?category=${cat}`,
        {
            headers: {
                Authorization: `Basic ${auth}`,
                cache: "no-store"
            }
        }
    )
    if (!res.ok) {
        return NextResponse.json(
          { error: `Failed to fetch products for category ${cat}` },
          { status: res.status }
        )
      }

      
    
    const data = await res.json()
    allProducts.push(...data)
  }

  const categoryData = await fetch(`${baseURL}/products/categories`,
        {
            headers: {
                Authorization: `Basic ${auth}`,
                cache: "no-store"
            }
        }
    )

    const AllCategories = await categoryData.json()

    const filteredCategories = AllCategories.filter((category: any) => {
    return category.id !== 39
  })
  
    return NextResponse.json({
      products:allProducts,
      filters: {
      categories: filteredCategories,
      }
    })

  


}catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
