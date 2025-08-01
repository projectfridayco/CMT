import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import localFont from "next/font/local";

const neueFont = localFont({
  src: "../../app/fonts/neue.ttf"
})

export default function Loading({ trigger = false, onExit = () => {} }) {

  

  useGSAP(() => {

    if(trigger){
    const bannerOne = document.getElementById("banner-1")
    // const bannerTwo = document.getElementById("banner-2")
    // const bannerThree = document.getElementById("banner-3")
    // const bannerFour = document.getElementById("banner-4")
    const loader = document.getElementById("loader")

    if(bannerOne) {
      const tl =  gsap.timeline({
        onComplete: onExit
      })

      tl.set([bannerOne],{
        yPercent: 0,
      })
      .to(loader,{
        opacity: 0
      })
      .to([bannerOne], {
        yPercent: 100,
      })
    }
  }
    
  },[trigger])
  return (
    <div className="">
      <div id="banner-1" className="min-h-screen bg-neutral-950 z-99 fixed top-0 left-0 w-full"></div>
      <h4
  id="loader"
  className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-wide text-xl z-[100] ${neueFont.className} highlight`}
>
  Loading...
</h4>
    </div>
  );
}