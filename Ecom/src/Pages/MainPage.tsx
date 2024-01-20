import React, { useState } from 'react'
import pfp from '../assets/pf-poto.jpg'
import Product  from '../Data/ProductData'
import { useAppDispatch, useAppSelector } from '../store/store'
import { calculateNewProduct, calculatePrice, deleteNewProduct, deleteProduct, pushProduct, setcountRedux } from '../store/pages/page.slice'
import useWindowResize from '../hooks/UseWindowResize'

const MainPage = () => {
    const[imagecount, setimagecount] = useState(0)
    const[navslide, setnavslide] = useState(false)
    const[count, setcount] = useState(0)
    const[counterror, setcounterror] = useState(false)
    const[bought, setbought] = useState(false)
    const[cart, setcart] = useState(false)
    const dispath = useAppDispatch()
    const newProdcut = useAppSelector((state) => state.ProductReducer.newProduct)
    const price = useAppSelector((state) => state.ProductReducer.price)
    const productList = useAppSelector((state) => state.ProductReducer.count)
    const currentProduct = useAppSelector((state) => state.ProductReducer.products)
    const {height, width } = useWindowResize()
    const[image, setimage] = useState(0)

    const imageSlider = (type : string) => {
        if(type == "increment"){
            if(imagecount === 3){
                setimagecount(0)
            }
            else{
                setimagecount((prev) => prev+ 1)
            }
        }
        else if(type == 'dicrement'){
            if(imagecount == 0){
                setimagecount(3)
            }
            else{
                setimagecount(prev => prev - 1)
            }
        }
    }
    return (
        <div className='w-full h-screen bg-white'>
            {/* Moduls */}
            {navslide && (
                <div className="absolute w-[70%] h-full bg-white z-50 px-6 pt-20">
                        <ul id='nav_ul' className='flex flex-col gap-6'>
                            <li>Collections</li>
                            <li>Man</li>
                            <li>Woman</li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                </div>
            )}
            {
                counterror && (
                    <div className='absolute xl:w-[20%] xl:h-12 w-[95%] h-12 items-center justify-center flex-col pt-2 text-red-700 bg-white text-center rounded-lg border-2 border-red-700 z-40 mt-12 left-[50%] translate-x-[-50%]'>
                        <h2 id='err'>You can not purchase 0 Snikers</h2>
                        <h2 id='err_x' onClick={() => setcounterror(false)} className='absolute cursor-pointer top-[-5px] right-[-5px] h-5 w-5 rounded-full bg-white flex items-center justify-center'>X</h2>
                    </div>
                )
            }
            {
                bought && (
                    <div className='absolute w-[95%] xl:w-[30%] lg:w-[50%] h-56 items-center justify-center flex-col pt-2  bg-white text-center rounded-lg border-2 border-green-700 z-40 mt-12 left-[50%] translate-x-[-50%]'>
                       <h2 id='err_x' onClick={() => {
                        setbought(false)
                        setcount(0)
                        }} className='cursor-pointer absolute top-[-5px] right-[-5px] h-5 w-5 rounded-full bg-white flex items-center justify-center'>X</h2>
                       <div className='flex p-5 items-center flex-col'>
                        <div className='flex items-center'>
                        <img className='h-20 w- 20 rounded-md' src={Product.images[0]} alt="" />
                        <div id='bought_box' className='flex flex-col pl-3 text-start'>
                            <h4>{count} x {Product.heading_txt}</h4>
                            <h5>{count * 125}$</h5>
                        </div>
                        </div>
                        <button 
                        onClick={() => {
                            dispath(setcountRedux(count))
                            setcounterror(false)
                            dispath(pushProduct(Product))
                            dispath(calculatePrice())
                            setcount(0)
                            setbought(false)
                            dispath(calculateNewProduct(count))
                        }}
                        id='checkout_btn' className='mt-10 w-[90%] h-12 bg-orange-600 text-white rounded-xl'>Checkout</button>
                       </div>
                       
                    </div>
                )
            }
            {
                cart && (
                    <div className="w-[95%] lg:left-[70vw] sm:w-96  h-56 bg-white border-2 border-orange-700 absolute left-[50%] rounded-xl translate-x-[-50%] top-14 z-40">
                        <div className="w-full h-[30%] p-4 border-b-2">
                            <h2 id='cart_heading'>Cart</h2>
                        </div>
                        <div className="w-full h-[70%]  flex flex-col">
                        <h2 id='err_x' onClick={() => {
                        setcart(false)
                        setcount(0)
                        }} className=' cursor-pointer absolute top-[-5px] right-[-5px] h-5 w-5 rounded-full bg-white flex items-center justify-center'>X</h2>
                        {currentProduct.length > 0 ? (
                            <div className='flex p-5 items-center flex-col'>
                            <div className='flex items-center'>
                            <img className='h-14 w- rounded-md' src={Product.images[0]} alt="" />
                            <div id='bought_box' className='flex flex-col pl-3 text-start'>
                                <h4>{productList} x {Product.heading_txt}</h4>
                                <h5>{price}$</h5>
                            </div>
                            <i 
                            onClick={() => {
                                dispath(deleteProduct(Product))
                            }}
                            className="text-gray-500 ml-5 cursor-pointer fa-solid fa-trash"></i>
                            </div>
                            <button 
                            onClick={() => {
                            }}
                            id='checkout_btn' className='mt-5 w-[80%] h-12 bg-orange-600 text-white rounded-xl'>Pay</button>
                           </div>
                        ) : <h2 id='empty' className='absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>your cart is empty</h2>}
                        </div>
                    </div>
                )
            }



            
            {/* NavBar */}
            {(navslide || bought || counterror) && (
                <div className='absolute w-full h-full bg-black z-20 opacity-80 '>
                </div>
                )}
                            
            <nav className='h-[8%] md:px-24 xl:px-64 w-full flex items-center justify-between px-6'>
                <div className='flex items-center md:gap-16 gap-6'>
                {navslide ? <i onClick={() => setnavslide(false)} id='x' className="xl:hidden cursor-pointer z-50 fa-solid fa-x"></i> : <i onClick={() => setnavslide(true)} className="xl:hidden fa-solid fa-bars text-gray-600 text-xl cursor-pointer"></i>}
                <h2 className='text-xl md:text-2xl cursor-pointer' id='nav_txt'>Sneakers</h2>
                <ul id='nav_ul_res' className='hidden xl:flex gap-14 pl-9'>
                    <li className='cursor-pointer'>Collections</li>
                    <li className='cursor-pointer'>Men</li>
                    <li className='cursor-pointer'>Woman</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>
                </div>
                <div className='flex items-center md:gap-16 gap-6'>
                <i onClick={() => {
                    dispath(deleteNewProduct())
                    setcart(true)
                }} className="md:text-2xl fa-solid fa-cart-shopping cursor-pointer relative text-gray-600 text-xl">
                    <p id='new_product' className='absolute top-0 right-0'>{newProdcut == 0 ? "" : newProdcut}</p>
                </i>
                <img src={pfp} className='lg:w-10 lg:h-10 w-6 h-6 rounded-full' alt="" />
                </div>
            </nav>
            <div className="w-full xl:px-40 xl:gap-32 lg:px-10 lg:gap-7 h-[92%] sm:justify-center lg:flex-row items-center flex flex-col">
                {/* carousel */}
                {Number(width) > 980 ? 
                <div className="xl:w-2/6 xl:h-[65vh] w-2/3 h-[70vh] relative">
                <img className='w-full h-[80%] rounded-lg' src={Product.images[image]} alt="" />
                <div className='w-full flex justify-between absolute bottom-0'>
                    {Product.images.map((img, i) => (
                        <img
                            key={i}
                            onClick={() => setimage(i)}
                            className={`cursor-pointer w-24 h-24 rounded-md ${i === image ? "opacity-60" : ""}`}
                            src={img}
                            alt=""
                        />
                    ))}
                </div>
            </div>
                :
                (
                    <div className="h-[40%] sm:w-[460px] md:w-2/3 lg:w-[70%] w-full bg-red-900 relative">
                    <div className="w-full h-24 absolute items-center justify-between px-2 flex top-[50%] translate-y-[-50%]">
                    <i onClick={() => imageSlider('dicrement')} className=" w-9 h-9 flex items-center justify-center rounded-full cursor-pointer bg-white fa-solid fa-angle-left"></i>
                    <i onClick={() => imageSlider('increment')} className=" w-9 h-9 flex items-center justify-center rounded-full cursor-pointer bg-white fa-solid fa-angle-right"></i>
                    </div>
                    <img className='w-full h-full' src={Product.images[imagecount]} alt="" />
                </div>
                )    
            }
                {/* Information */}
                <div className="h-[60%] xl:w-1/3 xl:h-[80vh] xl:gap-7 xl:justify-center sm:w-[460px] md:w-2/3  flex flex-col  pt-4 px-4 gap-2">
                    <h5 id='info_company' className='text-sm text-orange-600'>{Product.company}</h5>
                    <h1 id='info_txt' className='text-3xl w-[70%]'>{Product.heading_txt}</h1>
                    <p id='info_desc'>{Product.description}</p>
                    <div className="w-full flex h-16 items-center justify-between">
                        <div className='flex items-center w-[50%] justify-between '>
                         <h1 id='price_txt'>${Product.price}</h1>
                         <h6 id='sale_txt' className='bg-orange-300 px-3 py-1 rounded-md'>{Product.sale}%</h6>
                        </div>
                        <h3 id='original_txt'>${Product.original_price}</h3>
                    </div>
                    <div id='purchase' className="w-full h-12 flex items-center bg-gray-100 rounded-xl justify-between px-5 text-orange-600">
                        <h2 onClick={() => setcount(prev => prev >= 1 ? prev - 1 : 0)} className='text-4xl cursor-pointer'>-</h2>
                        <h1 className='text-black text-xl'>{count}</h1>
                        <h2 onClick={() => setcount(prev => prev +1)} className='text-2xl cursor-pointer'>+</h2>
                    </div>
                    <button 
                    onClick={() => {
                        if(count == 0){
                            setcounterror(true)
                        }else{
                            setbought(true)
                        }
                       
                    } }
                    id='purchase_button' className='cursor-pointer mt-5 w-[100%] bg-orange-600 h-14 text-white rounded-xl'>
                    <i className="fa-solid fa-cart-shopping"></i> Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainPage