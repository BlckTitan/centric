import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function Unauthorized() {
    const router = useRouter()
    let message = router.query
    
  return (
    <Layout title='Unauthorized Page'>
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='text-xl md:text-3xl xl:text-5xl font-semibold md:font-bold'>Access Denied</h1>
            {message &&
                <div className='mb-4 text-xl md:text-3xl font-semibold md:font-bold text-gray-400'>{message.message}</div>
            }
        </div>
    </Layout>
  )
}
