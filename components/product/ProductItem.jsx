/* eslint-disable @next/next/no-img-element */
//import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductItem({product}) {
  return (
    <div className='card'>

        <div className='card_header bg-white w-full h-3/5 flex items-center justify-center'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className='rounded w-full h-40 object-contain'
                    width={300}
                    height={10}
                />
            </Link>
        </div>

        <div className='flex flex-col items-center justify-center p-5'>
            <Link href={`/product/${product.slug}`}>
                <h2 className='text-lg'>{product.name}</h2>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p className='mb-2'>${product.price}</p>
            <button className='primary-button' type='button'>Add to Cart</button>
        </div>

    </div>
  )
}
