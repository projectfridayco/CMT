export async function getOrCreateCustomer({name, email, phone, password}:{
    name: string,
    email: string,
    phone: string,
    password: string
}){
    const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64")

  const baseURL = "https://originalsbycmt.com/wp-json/wc/v3"

    const res = await fetch(`${baseURL}/customers`, {
      
      headers: {
        Authorization: `Basic ${auth}`,
      }
    })

    const existingUsers = await res.json()

    if(existingUsers.length > 0){
        return existingUsers[0]
    }

    // const username = email.split('@')[0] + Math.floor(Math.random() * 10000)
    // const password = 

    const createCustomer = await fetch(`${baseURL}/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`
        },
        body: JSON.stringify({
            email,
            first_name: name,
            password,
            billing: {
                phone,
                email
            }
        })
    })

    if(!createCustomer.ok){
        const error = await createCustomer.text()
        throw new Error(`Customer creation failed: ${error}`)
    }

    const newCustomer = await createCustomer.json()
    return newCustomer

}