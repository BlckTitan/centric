/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import data from '@/utils/data';
import Link from 'next/link';
import {cartItem} from '@/slices/cartSlice';

export default function ProductScreen() {
    const [newItem, setNewItem] = useState()
    //const [updatedItem, setUpdatedItem] = useState({})
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch()
    const {query} = useRouter();
    const {slug} = query;

    const productData = data.products.find((item) => item.slug === slug)

    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch()


    const addToCartHandler = (selectedItem) => {

        const existingItem = cart.find((item) => item?.type === selectedItem?.type)
        let match = (typeof existingItem === 'undefined') ? 'no match' : existingItem;

        if(match !== 'no match') {
            return false
            //dispatch(cartItem([...cart, {type: existingItem.type, quantity: existingItem.quantity}]))
        }else{
            dispatch(cartItem([...cart, selectedItem]))
        }
        
        console.log(cart)
    }

    if(!productData) return <p>Product not found!!!</p>

  return (
    <Layout title={productData.title}>
        <div className='py-2 w-full flex flex-col items-center'>
            
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
                                src={productData.image}
                                alt={productData.description}
                                className='w-96 h-fit rounded-md mb-4 object-cover hover:scale-105'
                            />

                        </div>

                        <div>
                            <ul>
                                <li className='my-4'>
                                    <h1 className='text-base md:text-lg xl:text-xl font-bold'>{productData.title}</h1>
                                </li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Category: {productData.category}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Brand: {productData.brand}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>{productData.rating.rate} of {productData.rating.count} reviews</li>
                                <li className='w-full xl:5/6 2xl:w-1/2 text-base md:text-lg xl:text-xl font-semibold'>Description: {productData.description}</li>
                            </ul>
                        </div>

                        <div>{cart.length > 1 && cart.map((productItem, index) => (
                            <div key={index}>
                                <span>{(productItem?.type !== '') ? productItem?.type : ''}</span>
                                <span>{productItem?.quantity > 0 ? productItem?.quantity : ''}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    

                    <div className='card h-fit p-5 xl:col-span-1 mt-8 xl:mt-0'>
                        <div className='mb-2 flex justify-between'>
                            <span>Price</span>
                            <span>{productData.price}</span>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <span>Status</span>
                            <span>{productData.stockCount > 0 ? 'In Stock': 'Unavailable'}</span>
                        </div>
                        <button 
                            className='primary-button w-full h-12 xl:h-14 text-base xl:text-lg font-semibold'
                            onClick={() => addToCartHandler()}
                        >Add to Card</button>
                    </div>
                </div>
            </div>
            
        </div>
    </Layout>
  )
}
