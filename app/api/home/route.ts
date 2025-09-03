import { NextResponse } from "next/server"

export async function GET(req: Request) {


  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64")

  const baseURL = "https://endpoint.originalsbycmt.com/wp-json/wc/v3"

  try {
 
    const featuredRes = await fetch(
      `${baseURL}/products?featured=true&per_page=4`,
      {
        headers: { Authorization: `Basic ${auth}` },
        cache: "no-store",
      }
    );
    const featuredProducts = await featuredRes.json();
    
    const categoriesRes = await fetch(
        `${baseURL}/products/categories?parent=0&per_page=8`,
        {
            headers: { Authorization: `Basic ${auth}` },
            cache: "no-store",
        }
        );

        const categories = await categoriesRes.json();

        // Example: filter out specific unwanted category
        const filteredCategories = categories.filter((c: any) => c.id !== 39);

  return NextResponse.json({
    products:featuredProducts,
    categories: filteredCategories
  })


  } catch (error) {
    console.error("Error fetch products data", error)
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    )
  }
}