import React, {useEffect} from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DropDown from '../DropDown';

export default function TopNav() {
  
  const cart = useSelector((state) => state.cart.value)
  const{ status, data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query;

  useEffect(() => {
    if(session?.user){
      console.log(1)
      //router.push(redirect || '/')
    }
  }, [router, session, redirect]);

  return (
    <>
      <nav className='w-full h-16 bg-white flex items-center px-8 justify-between shadow-sm fixed'>
            <Link href='/'>
                <span className='text-4xl font-extrabold text-center'>CENTRIC <sup className='font-semibold text-sm'>TM</sup></span>
            </Link>

            <div>
                <Link href='/cart'>
                    <span className='mr-4'>Cart 
                      { 
                        <sup className='px-1.5 rounded-full text-red-600 text-lg font-bold'>
                          {(cart !== 0) && cart}
                        </sup>
                      }
                    </span>
                </Link>
                  {
                    status === 'loading' ? ('Loading') : session?.user ?
                    <DropDown username={session.user.name} /> : ( 
                      <Link href='/login'>
                          <span>Login</span>
                      </Link>
                  )}
            </div>
        </nav>
    </>
  )
}