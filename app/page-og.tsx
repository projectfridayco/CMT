"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import localFont from "next/font/local"

const neueFont = localFont({
        src: "./fonts/neue.ttf",
    })

const Home = () => {

    // useGSAP(() => {
    //   gsap.registerPlugin(ScrollTrigger);
    // const stickySection = document.querySelector(".sticky");
    // const totalStickyheight = window.innerHeight;

    // // const lenis = new Lenis();

    // // lenis.on('scroll', ScrollTrigger.update);
    // // gsap.ticker.add((time) => {
    // //     lenis.raf(time * 1000);
    // // });

    // // gsap.ticker.lagSmoothing(0);
  
    // const introParagraphs = document.querySelectorAll(".intro h2")
    // introParagraphs.forEach((paragraph) => {
    //     const text = paragraph.textContent;
    //     paragraph.innerHTML= text
    //         .split(/(\s+)/)
    //         .map((part) => {
    //             if(part.trim() === ""){
    //                 return part;
    //             }
    //             else{
    //                 return part
    //                 .split("")
    //                 .map((char) => `<span style="opacity:0; display: inline-block;">${char}</span>`)
    //                 .join("");
    //             }
    //         })
    //         .join("");
    // });

    // function flickerAnimation(targets, toOpacity){
    //     gsap.to(targets, {
    //         opacity: toOpacity,
    //         duration: 0.1,
    //         stagger: {
    //             amount: 0.3,
    //             from: "random"
    //         }
    //     })
    // }



    // ScrollTrigger.create({
    //     trigger: stickySection,
    //     start: "top top",
    //     end: () => `${window.innerHeight * 3}`,
    //     onEnter: () => flickerAnimation(".intro h2 span",1),
    //     onLeave: () => flickerAnimation(".intro h2 span", 0),
    //     onEnterBack: () => flickerAnimation(".intro h2 span",1),
    //     onLeaveBack: () => flickerAnimation(".intro h2 span", 0),
    // });


    // ScrollTrigger.create({
    //     trigger: stickySection,
    //     start: "top top",
    //     end: () => `+=${totalStickyheight}`,
    //     pin: true,
    //     pinSpacing: true
    // });

    // gsap.to("img-1 img", {
    //     scale: 1.125,
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: stickySection,
    //         start: "top top",
    //         end: () => `+=${window.innerHeight}`,
    //         scrub: true
    //     }
    // });

    // gsap.to(".img-2", {
    //     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: stickySection,
    //         start: "top top",
    //         end: () => `+=${window.innerHeight}`,
    //         scrub: true,
    //         onUpdate: (self) => {
    //             const progress = self.progress;
    //             gsap.set(".img-2", {
    //                 clipPath: `polygon(
    //                 ${gsap.utils.interpolate(40,0,progress)}% ${gsap.utils.interpolate(25,0,progress)}%
    //                 ${gsap.utils.interpolate(60,100,progress)}% ${gsap.utils.interpolate(25,0,progress)}%
    //                 ${gsap.utils.interpolate(60,100,progress)}% ${gsap.utils.interpolate(75,100,progress)}%
    //                 ${gsap.utils.interpolate(40,0,progress)}% ${gsap.utils.interpolate(75,100,progress)}%
    //                 )`
    //             })
    //         }
    //     }
    // });

    // gsap.to(".img-2 img", {
    //     scale: 1.125,
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: stickySection,
    //         start: "top top",
    //         end: () => `+=${window.innerHeight}`,
    //         scrub: true,
    //     }
    // })


    // gsap.fromTo(".img-2 img", {
    //     scale: 1.125
    // }, {
    //     scale: 1.25,
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: stickySection,
    //         start : () => `${window.innerHeight * 3}`,
    //         end: () => `${window.innerHeight}`,
    //         scrub: true
    //     }
    // });
    // })

    

    return(
        <>
          <section className="section hero__section" id="home">
            <div className="container hero__container">
                <h1 className={`hero__title ${neueFont.className}`}>ORIGINALS</h1>
                <div className="hero__img-box">
                 
                </div>
                <div className="hero__img-fg">
                    <img src="./assets/img/hero-cmt.png"/>
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
                <div className="swiper-wrapper">
                    <div className="slide-1 swiper-slide">
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="./assets/img/pro1.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product One</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="./assets/img/pro2.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product two</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="./assets/img/pro3.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product three</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="./assets/img/pro4.png" alt="" className="product-img"/>
                            </div>
                            <div className="product__item-data">
                                <h3>Product four</h3>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="context-copy">
                <h1>The New <span className="spcl-text">Age</span> Realm</h1>
            </div>
        </section>
        <section className="sticky">
            <div className="intro">
                <h2>
                    Categories
                </h2>
              
            </div>
            <div className="img-1">
   
                 
            </div>
            <div className="img-2">
                <img src="./assets/img/c-1.jpg"/>
                


            </div>
 
            <div className="copy">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quas voluptates repellendus illum aut qui aspernatur nemo voluptate commodi mollitia.</h1>
            </div>

        </section>
        <section className="section category__section">
            <div className="container category__container">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur iste beatae consequatur</p>
                <div className="slide-1 swiper-slide category__wrapper">
                        <div className="product__item">
                            <div className="product__item-img">
                                <img src="./assets/img/pro1.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Category One</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                      
                                <img src="./assets/img/pro2.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Category two</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                                <div className="product__circle"></div>
                                <img src="./assets/img/pro3.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Category three</h3>
                            
                            </div>
                        </div>
                        <div className="product__item">
                            <div className="product__item-img">
                   
                                <img src="./assets/img/pro4.png" alt="" className="product-img"/>
                            </div>
                            <div className="category__item-data">
                                <h3>Category four</h3>
                            
                            </div>
                        </div>
                    </div>
            </div>
        </section>
        <section className="section contact__section">
            <div>
                <h1>Infinite Realms <br/>
            Beckon <span className="spcl-text">Beyond</span></h1>
            <form action="" className="contact__form">
                <div className="contact__content">
                    <input type="email" className="contact__item" placeholder=" "/>
                    <label htmlFor="" className="contact__label">Email</label>
                </div>
                        
                  
                <button className="btn">Enquire <i className="ri-send-plane-line btn-icon"></i></button>
                </form>
            </div>
            

            <div className="contact__img">
                <img src="./assets/img/filler.jpg" />
            </div>
        </section>
        <section className="footer">
            <div className="footer__brand">
                <img src="./assets/img/logo-main.png"/>

            </div>  
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum repellat dignissimos voluptatum omnis corrupti animi neque culpa qui, veniam, sunt magnam tempore facere suscipit eveniet excepturi earum perspiciatis a perferendis sint consequatur vitae. Sequi autem sit repellendus dignissimos itaque velit error, qui facilis labore, voluptates repudiandae accusantium consequuntur odio voluptatibus.</p>
        </section>
        </>
    )
}

export default Home