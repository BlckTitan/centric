import React from 'react';
import Head from 'next/head';
import TopNav from '@/components/navigation/TopNav';
export default function Layout({title, children}) {
  return (
    <>
        <Head>
            <title>{title ? title + ' | Centric Shopping App' : 'Centric Shopping App'}</title>
        </Head>

        <div className='flex w-full min-h-screen flex-col justify-between relative'>

            <header>
                <TopNav/>
            </header>

            <main  className='w-full h-full m-auto mt-16 py-16 px-4'>
                {children}
            </main>

            <footer className='flex justify-center items-center h-10 shadow-inner'>
                &copy; Copyright Centric 2023
            </footer>

        </div>
    </>
  )
}
