import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function TopNav() {
  
  const cart = useSelector((state) => state.cart.value)

  return (
    <>
      <nav className='w-full h-16 bg-white flex items-center px-8 justify-between shadow-sm fixed'>
            <Link href='/'>
                <span className='text-4xl font-extrabold text-center'>MAC <sup className='font-semibold text-sm'>TM</sup></span>
            </Link>

            <div>
                <Link href='/cart'>
                    <span className='mr-4'>Cart 
                      {cart.length > 1 && <sup className='px-1.5 rounded-full text-red-600 text-lg font-bold'>{(cart.length - 1)}</sup>}
                    </span>
                </Link>
                <Link href='/login'>
                    <span>Login</span>
                </Link>
            </div>
        </nav>
    </>
  )
}