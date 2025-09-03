import Image from "next/image"
import Link from "next/link"

const Thankyou = () => {
    return(
        <div className="flex flex-col">
            <Image src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/08/undraw_success_288d.svg" alt="Order Success" width={250} height={0} className="self-center mb-4" />
            <h1 className="text-lg font-black uppercase text-center tracking-wide mb-4">
                Your Order has been successfully placed
            </h1>
            <Link href="/shop" className="uppercase font-bold border p-2 align-center text-center">Continue Shopping</Link>
        </div>
    )
}

export default Thankyou