/* eslint-disable @next/next/no-img-element */
//import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItem  } from '@/slices/cartSlice';

export default function ProductItem({product}) {
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch()


    const addToCartHandler = (selectedItem) => {

        const existingItem = cart.find((item) => item?.type === selectedItem?.type)
        let match = (typeof existingItem === 'undefined') ? 'no match' : existingItem;

        if(match !== 'no match') {
            return false
        }else{
            dispatch(cartItem([...cart, selectedItem]))
        }

    }

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
                    <h2 className='text-base xl:text-lg text-white text-left font-bold'>{product.title}</h2>
                </Link>
            </div>

            <div className='w-full flex items-center justify-between'>   
                <p className='text-slate-300 font-semibold'>Price - ${product.price}</p> 
                <p className='text-slate-300 font-semibold'>{product.brand}</p>
            </div>
            <button 
                className='primary-button w-full h-10 2xl:h-14 text-lg md:text-xl font-semibold flex items-center justify-center' 
                type='button'
                onClick={() => addToCartHandler({type: product.title, quantity: 1})}

            >Add to cart</button>
        </div>

    </div>
  )
}
