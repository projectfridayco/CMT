import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest) => {
  const {searchParams} =  new URL(req.url)
  const slug = searchParams.get("slug")

  if(!slug){
    return NextResponse.json({error: "Missing slug"}, {status: 400})
  }

  const baseURL = 'https://originalsbycmt.com/wp-json/wc/v3'

  let recommendedData = []
  
  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64")

  try{
    const res = await fetch(`${baseURL}/products?slug=${slug}`, {
      
      headers: {
        Authorization: `Basic ${auth}`,
      }
    })

    const data = await res.json()

    if(data[0].categories.some((cat: any) => cat.id === 17)){
      const recommended = await fetch(`${baseURL}/products?category=19&limit=4`, {
      
      headers: {
        Authorization: `Basic ${auth}`,
      }
    })

    recommendedData = await recommended.json()

    } 

    if(!data || data.length === 0){
      return NextResponse.json({error: "Product not found"}, {status: 404})
    }

    return NextResponse.json({
      ...data[0],
      recommended: recommendedData
    })

  }catch(err){
    return NextResponse.json({error: "Failed to fetch Product", detail:err},{status:500})
  }

   

}