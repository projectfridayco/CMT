import localFont from "next/font/local"
import { IndianRupee } from "lucide-react"

const neueFont = localFont({
        src: "./../fonts/neue.ttf"

    })


const Checkout = () => {

    
    return(
        <>  
            <h1 className={`text-8xl font-bold mb-8 tracking-wide ${neueFont.className}`}>Checkout</h1>
            
            <div className="grid grid-cols-4 gap-8">
            <div className="col-span-3">

            </div>
            <div className="col-span-1">
                <h1 className="font-semibold text-xl flex flex-row">Total: <IndianRupee/> {total}</h1>
                <form className="">
                    

                    <button className="bg-primary cursor-pointer rounded-md py-3 px-6 w-full">Proceed to Checkout</button>


                </form>
            </div>
        </div>
        </>
        
    )
}

export default Checkout