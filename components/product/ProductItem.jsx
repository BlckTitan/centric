/* eslint-disable @next/next/no-img-element */
//import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { displayMessage } from '@/slices/promptSlice';
import { useDispatch, useSelector } from 'react-redux';
import { cartItem } from '@/slices/cartSlice';

export default function ProductItem({product}) {
    const [cart, setCart] = useState()
    const dispatch = useDispatch()
    const MESSAGE = useSelector((state) => state.promptMessage.value)

    const getCartData = async () =>{
        const req = await fetch('http://localhost:5000/cart')
        const res = await req.json()

        dispatch(cartItem(res.length))
        setCart(res)
    }

    const storeCartData = async (productOrder) =>{
        await fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(productOrder)
        })

        getCartData()
        dispatch(displayMessage('Item added successfully!'))
    }

    const addToCartHandler = () => {
        const NEW_ITEM = {type: product.name, quantity: 1, price: product.price, img: product.image, slug: product.slug}
        const ITEM_PRICE_BY_QTY = (NEW_ITEM.price * NEW_ITEM.quantity)
        const SELECTED_ITEM = {type: product.name, quantity: 1, price: product.price, img: product.image, slug:product.slug, totalItemPrice: ITEM_PRICE_BY_QTY}
        const EXISTING_ITEM = cart?.find((item) => item?.type === SELECTED_ITEM?.type)

        if(EXISTING_ITEM) {
            dispatch(displayMessage('Item already added to cart'))
            return false
        }else{
            storeCartData(SELECTED_ITEM)
        }
    }


    useEffect(() => {
        getCartData()
        
        setTimeout(() =>{
            dispatch(displayMessage(''))
        }, 5000)
    }, [MESSAGE])
  return (
    <div className='card hover:scale-105 h-96'>

        <div className='card_header bg-white w-full h-1/2 flex items-center justify-center'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.description}
                    className='rounded w-full h-40 object-contain'
                    width={300}
                    height={100}
                />
            </Link>
        </div>

        <div className='w-full h-1/2 flex flex-col items-center justify-between px-5 py-2 md:px-5 md:py-5 text-left bg-indigo-950 rounded-b-md'>
            <div className='w-full h-14 text-ellipsis'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-base xl:text-lg text-white text-left font-bold'>{product.name}</h2>
                </Link>
            </div>

            <div className='w-full flex items-center justify-between'>   
                <p className='text-slate-300 font-semibold'>Price - ${product.price}</p> 
                <p className='text-slate-300 font-semibold'>{product.brand}</p>
            </div>
            <button 
                className='primary-button w-full h-10 2xl:h-14 text-lg md:text-xl font-semibold flex items-center justify-center' 
                type='button'
                onClick={() => addToCartHandler()}

            >Add to cart</button>
        </div>

    </div>
  )
}
