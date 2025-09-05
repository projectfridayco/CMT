"use client"

import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import localFont from "next/font/local"
import Lenis from "lenis"
import { useEffect, useState } from "react"
import Loading from "@/components/ui/Loading"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useFilterStore } from "@/store/filter-store"
import { useRouter } from "next/navigation"

const neueFont = localFont({
        src: "./../fonts/neue.ttf",
    })

const Home = () => {

    const [loading,setLoading] = useState(true)
    const [canHideLoading, setCanHideLoading] = useState(false);
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const setCategory = useFilterStore((state) => state.setCategory)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)

        fetch('/api/home')
            .then((res) => res.json())
            .then((data) => {
            setProducts(data.products)

            setCategories(data.filters.categories)

            })
            .catch(() => setLoading(false))
            .finally(() => {
                setCanHideLoading(true);
                // setLoading(false)
            })
    },[])
    
    useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stickySection = document.querySelector(".sticky");
    const totalStickyheight = window.innerHeight;

    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  
    const introParagraphs = document.querySelectorAll(".intro h2")
    introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent ?? "";
        paragraph.innerHTML= text
            .split(/(\s+)/)
            .map((part) => {
                if(part.trim() === ""){
                    return part;
                }
                else{
                    return part
                    .split("")
                    .map((char) => `<span style="opacity:0; display: inline-block;">${char}</span>`)
                    .join("");
                }
            })
            .join("");
    });

     

    function flickerAnimation(targets, toOpacity){
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.1,
            stagger: {
                amount: 0.3,
                from: "random"
            }
        })
    }



    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation(".intro h2 span",1),
        onLeave: () => flickerAnimation(".intro h2 span", 0),
        onEnterBack: () => flickerAnimation(".intro h2 span",1),
        onLeaveBack: () => flickerAnimation(".intro h2 span", 0),
    });


    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyheight}`,
        pin: true,
        pinSpacing: true
    });

    gsap.to("img-1 img", {
        scale: 1.125,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true
        }
    });

    gsap.to(".img-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(".img-2", {
                    clipPath: `polygon(
                    ${gsap.utils.interpolate(40,0,progress)}% ${gsap.utils.interpolate(25,0,progress)}%
                    ${gsap.utils.interpolate(60,100,progress)}% ${gsap.utils.interpolate(25,0,progress)}%
                    ${gsap.utils.interpolate(60,100,progress)}% ${gsap.utils.interpolate(75,100,progress)}%
                    ${gsap.utils.interpolate(40,0,progress)}% ${gsap.utils.interpolate(75,100,progress)}%
                    )`
                })
            }
        }
    });
 
    gsap.to(".img-2 img", {
        scale: 1.125,
        ease: "none",
        transformOrigin: "center center",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
        }
    })


    gsap.fromTo(".img-2 img", {
        scale: 1.125
    }, {
        scale: 1.25,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start : () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight}`,
            scrub: true
        }
    });
    })

    const moveToCategory = (id) => {
        setCategory(id)
        router.push("/shop")
    }

    return(
        <>
        {loading && (
                          <Loading trigger={canHideLoading}
                        onExit={() => {
                          setLoading(false); 
                        }}
                      />
                      )}
          <section className="section hero__section" id="home">
            <div className="container hero__container">
                <h1 className={`hero__title ${neueFont.className}`}>ORIGINALS</h1>
                <div className="hero__img-box">
                 
                </div>
                <div className="hero__img-fg">
                    <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/07/hero-cmt.png"/>
                </div>
           
            </div>
        </section>

        <div className="review__section">
            <div className="scroll-text">
                <div className="scroll-text-value">
                   <h4>GUCCI -</h4>
                   <h4>RAVELLI -</h4>
                   <h4>ADIDAS -</h4>
       
                </div>
                <div className="scroll-text-value">
                    <h4>DERBY -</h4>
                    <h4>PUMA -</h4>
                    <h4>ARROW -</h4>
                </div>
                
                
             </div>
            
            </div>
      
        <section className="section context_section">
            <div className="img-context swiper">
                <div className="swiper-wrapper mb-4">
                    <div className="slide-1 swiper-slide">
                        {products.map((product:any) => (
                            <Link className="product__item relative rounded-xl overflow-hidden" key={product.id} href={`shop/${product.slug}`}>
                            {/* Background Image */}
                            <img 
                                src={product.images[0].src} 
                                alt="Parasite Tshirt" 
                                className="w-full h-64 object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                <h3 className={`${neueFont.className} text-sm tracking-wide font-semibold`}>{product.name}</h3>
                            </div>
                        </Link>
                        ))}

                        <Link className="flex flex-row justify-between rounded-xl" href="/shop">Shop All<ShoppingBag/></Link>
                        
                        {/* <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/03/LMTS004522_1.jpg" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product two</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro3.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product three</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro4.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product four</h3>
                            
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="context-copy">
                <h1 className={`${neueFont.className}`}>The New <span className="spcl-text">Age</span> Realm</h1>
                <p className="text-white p-4 mt-4 mb-4">Handpicked featured products showcasing the best styles and unbeatable value—trendy surplus clothing designed for comfort, quality, and everyday fashion.</p>

            </div>
        </section>
        <section className="sticky">
            <div className="intro">
                <h2 className={`${neueFont.className}`}>
                    Categories
                </h2>
              
            </div>
            <div className="img-1">
   
                 
            </div>
            <div className="img-2">
                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/07/c-3.jpg"/>
                


            </div>
 
            <div className="copy">
                <h1>Handpicked featured products showcasing the best styles and unbeatable value—trendy surplus clothing designed for comfort, quality, and everyday fashion.</h1>
            </div>

        </section>
        <section className="section category__section">
            <div className="container category__container ">
                <h1 className={`${neueFont.className} tracking-wide pl-4 text-4xl mt-16`}>Categories</h1>
                <p className="px-4 mt-2">Upgrade your wardrobe with quality surplus apparel—smart, stylish, and affordable.</p>
                <div className="slide-1 swiper-slide category__wrapper">
                        <div className="product__item" onClick={() => moveToCategory(17)}>
                            <div className="product__item-img">
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro1.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>TShirts</h3>
                            
                            </div>
                        </div>
                        <div className="product__item" onClick={() => moveToCategory(19)}>
                            <div className="product__item-img">
                      
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro2.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Jeans</h3>
                            
                            </div>
                        </div>
                        <div className="product__item" onClick={() => moveToCategory(43)}>
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro3.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Shirts</h3>
                            
                            </div>
                        </div>
                        <div className="product__item" onClick={() => moveToCategory(42)}>
                            <div className="product__item-img">
                   
                                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/04/pro4.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Inners</h3>
                            
                            </div>
                        </div>
                    </div>
            </div>
        </section>
        <section className="section contact__section">
            <div className="mt-16">
                <h1 className={`${neueFont.className}`}>Infinite Realms <br/>
            Beckon <span className="spcl-text">Beyond</span></h1>
            <form action="" className="contact__form mb-16">
                <div className="contact__content">
                    <input type="email" className="contact__item" placeholder=" "/>
                    <label htmlFor="" className="contact__label">Email</label>
                </div>
                        
                  
                <button className="btn">Enquire <i className="ri-send-plane-line btn-icon"></i></button>
                </form>
            </div>
            

            <div className="contact__img">
                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/07/filler.jpg" />
            </div>
        </section>
        <section className="footer">
            <div className="footer__brand">
                <img src="https://endpoint.originalsbycmt.com/wp-content/uploads/2025/05/CMT-LOGO-01-copy-white.png"/>

            </div>  
            <p>CMT Clothing is a surplus fashion retailer committed to delivering high-quality apparel at affordable prices. We source export surplus and overstock clothing from trusted manufacturers, ensuring fresh styles and excellent value for our customers.</p>
        </section>
        </>
    )
}

export default Home