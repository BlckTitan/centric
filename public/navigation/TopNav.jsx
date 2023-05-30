import React from 'react';
import Link from 'next/link';
//import styles from '../../styles/TopNav.module.css';

export default function TopNav() {
  return (
    <>
       <nav className='w-full h-16 bg-white flex items-center px-8 justify-between shadow-sm fixed'>
            <Link href='/'>
                <span className='text-2xl font-semibold'>Home</span>
            </Link>

            <div>
                <Link href='/cart'>
                    <span className='mr-4'>Cart</span>
                </Link>
                <Link href='/login'>
                    <span>Login</span>
                </Link>
            </div>
        </nav>
    </>
  )
}