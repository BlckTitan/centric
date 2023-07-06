/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import data from '../../data.json';
import Link from 'next/link';
import { cartItem } from '@/slices/cartSlice';
import { displayMessage } from '@/slices/promptSlice';
import { createCartData, updateCartData } from '@/utils/queryFunc';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function ProductScreen(prodtData) {
    const message = useSelector((state) => state.promptMessage.value)
    const PRODUCT_DATA = prodtData.prodtData;
    const [cartData, setCartData] = useState()

    const dispatch = useDispatch()
    // const {query} = useRouter();
    // const {slug} = query;

    // const productData = data.products.find((item) => item.slug === slug);
    let existingItem = cartData?.find((item) => item?.type === prodtData?.name)
    let match = (typeof existingItem === 'undefined') ? 0 : existingItem;

    
    const [productQty, setProductQty] = useState(0 || match.quantity)

    const getAllCartData = async () =>{

        const req = await fetch('http://localhost:5000/cart')
        const res = await req.json()

        setCartData(res)
        dispatch(cartItem(res.length))

    }
    
    const addToCartHandler = async () => {
        let newUpdatedItem = {type: match.type, quantity: productQty, price: match.price, img: match.img, slug: match.slug}
        let newUpdatedItemPriceByQty = (newUpdatedItem.price * newUpdatedItem.quantity)
        let updatedItem = {type: match.type, quantity: productQty, price: match.price, img: match.img, slug: match.slug, totalItemPrice: newUpdatedItemPriceByQty}

        const newCartItem = {type: PRODUCT_DATA.title, quantity: 1, price: PRODUCT_DATA.price, img: PRODUCT_DATA.image, slug: PRODUCT_DATA.slug}
        const itemPriceByQty = (newCartItem.price * newCartItem.quantity)
        let newItem = {type:PRODUCT_DATA.name, quantity: productQty, price: PRODUCT_DATA.price, img: PRODUCT_DATA.image, slug: PRODUCT_DATA.slug, totalItemPrice: itemPriceByQty}

        if(existingItem){
            updateCartData(existingItem.id, updatedItem)
            dispatch(displayMessage('Item updated successfully!'))
        }else{
            createCartData(newItem)
            dispatch(displayMessage('Item added successfully!'))
        }
        getAllCartData()

    }

    useEffect(() => {
        getAllCartData()

        if(match.quantity !== 0){
            setProductQty(match.quantity);
        }else if(match === 0){
            setProductQty(match);
        }else{
            setProductQty(productQty);
        }

        setTimeout(() =>{
            dispatch(displayMessage(''))
        }, 5000)

    }, [message])

    if(!PRODUCT_DATA) return <p>Product not found!!!</p>

  return (
    <Layout title={PRODUCT_DATA.name}>
        <div className='py-2 w-full flex flex-col items-center'>
            
            <div className='w-4/6 h-14 flex items-center justify-end'>

                {(message !== '') && <span className='py-2 px-4 bg-green-300 text-green-800 font-semibold rounded-sm'>{message}</span>}

            </div>

            <div className='bg-white w-4/6 p-4 md:p-5 xl:p-10'>
                    
                <div className='w-full h-12 flex items-center justify-between '>
                    <Link href='/'>
                        <span className='font-semibold'>&#8592; Go Back</span>
                    </Link>
                </div>

                <div className='grid xl:grid-cols-3 xl:grid-gap-3'>
                    <div className='xl:col-span-2'>
                        <div className='w-full h-fit bg-white flex justify-center'>
                            <img
                                src={PRODUCT_DATA.image}
                                alt={PRODUCT_DATA.description}
                                className='w-96 h-fit rounded-md mb-4 object-cover hover:scale-105'
                            />

                        </div>

                        <div>
                            <ul>
                                <li className='my-4'>
                                    <h1 className='text-base md:text-lg xl:text-xl font-bold'>{PRODUCT_DATA.name}</h1>
                                </li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Category: {PRODUCT_DATA.category}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Brand: {PRODUCT_DATA.brand}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>{PRODUCT_DATA.rating} of {PRODUCT_DATA.ratingCount} reviews</li>
                                <li className='w-full xl:5/6 2xl:w-1/2 text-base md:text-lg xl:text-xl font-semibold'>Description: {PRODUCT_DATA.description}</li>
                            </ul>
                        </div>
                    </div>

                    

                    <div className='card h-fit p-5 xl:col-span-1 mt-8 xl:mt-0'>
                        <div className='mb-2 flex justify-between'> 
                            <span>Price</span>
                            <span>{PRODUCT_DATA.price}</span>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <span>Status</span>
                            <span>{PRODUCT_DATA.stockCount > 0 ? 'In Stock': 'Unavailable'}</span>
                        </div>
                        
                        <div className='w-full flex justify-between items-center py-2'>
                            <span>Quantity</span>
                            <div className='flex'>

                                <input 
                                    type='number'
                                    className='border-2 border-solid border-gray-200 w-16 text-lg px-2 text-center'
                                    value={productQty || match.quantity}
                                    onChange={(e) => setProductQty(e.target.value)}
                                />
                            </div>
                        </div>
                        <button 
                            className='primary-button w-full h-12 text-base xl:text-lg font-semibold'
                            onClick={() => addToCartHandler()}
                        >Add to Card</button>
                    </div>
                </div>
            </div>
            
        </div>
    </Layout>
  )
}

export async function getStaticPaths(){

        await db.connect()
        const dbProducts = await Product.find().lean();

        const products = dbProducts.map(db.convertDocToObj)

        const paths = products.map((productID) => {
            return {
                params: {
                    slug: `${productID.slug}`
                }
            }
        })
    return {
        
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const { params } = context;
    const { slug } = params;
    
    await db.connect()
    const products = await Product.findOne({ slug }).lean();
    await db.disconnect();
  
    return {
      props: { 
        prodtData: products ? db.convertDocToObj(products) : null
      }
    }
}