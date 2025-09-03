import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const {searchParams} = new URL(req.url)

  const params = new URLSearchParams({
    consumer_key:process.env.WC_CONSUMER_KEY!,
    consumer_secret:process.env.WC_CONSUMER_SECRET!
  })

  if(searchParams.has("category")){
    console.log("im inside category")
    params.append("category",searchParams.get("category")!)
  }

  if(searchParams.has("size")){
    console.log("im inside size")
    params.append("attribute","pa_size")
    params.append("attribute_term",searchParams.get("size")!)
  }

  if(searchParams.has("brand")){
    console.log("im inside brand")
    params.append("attribute","pa_brand")
    params.append("attribute_term",searchParams.get("brand")!)
  }

  

  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64")

  const baseURL = "https://endpoint.originalsbycmt.com/wp-json/wc/v3"

  try {
    console.log(`${baseURL}/products?${params.toString()}`)
    const [productData,categoryData,attributeData] = await Promise.all([
      fetch(`${baseURL}/products?${params.toString()}`),
      fetch(`${baseURL}/products/categories`, {
        headers: {Authorization: `Basic ${auth}`},
      }),
      fetch(`${baseURL}/products/attributes`, {
        headers: {Authorization: `Basic ${auth}`}
      }),
    ])

    const products = await productData.json()
    const categories = await categoryData.json()
    const attributes = await attributeData.json()

    const sizeAttr = attributes.find((a:any) => a.slug == "pa_product-size")
    // const brandAttr = attributes.find((a:any) => a.slug == "pa_brand")

    const [sizeData,brandData] = await Promise.all([
      sizeAttr ? fetch(`${baseURL}/products/attributes/${sizeAttr.id}/terms`, {
        headers: {Authorization: `Basic ${auth}`}
      })
      : Promise.resolve({json: async() => []}),
    

    fetch(`https://endpoint.originalsbycmt.com/wp-json/wp/v2/product_brand`, {
        headers: {Authorization: `Basic ${auth}`}
      })
      
  ])

  const sizes = await sizeData.json()
  const brands = await brandData.json()

  const filteredProducts = products.filter((product:any) => {
    return !product.categories.some((cat:any) => cat.id === 39)
  })

  const filteredCategories = categories.filter((category: any) => {
    return category.id !== 39
  })

  // const filteredSizes = categories.filter((category:any) => {
  //   return category
  // } )

  return NextResponse.json({
    products:filteredProducts,
    filters: {
      categories: filteredCategories,
    },
  })


  } catch (error) {
    console.error("Error fetch products data", error)
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    )
  }
}