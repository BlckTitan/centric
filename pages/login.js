import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import getError from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {

    const { data: session} = useSession();
    const router = useRouter()
    const { redirect } = router.query;

    useEffect(()=>{
        if(session?.user){
            router.push(redirect || '/')
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = async({email, password}) => {
        try{
            const result = await signIn('credentials', {
                redirect: false,
                email, password
            });
            if(result.error){
                toast.error(result.error)
            }
        } catch(err){
            toast.error(getError(err))
        }
    }
  return (
    <Layout title={'Login'}>
        <form className='mx-auto max-w-screen-md loginForm' onSubmit={handleSubmit(submitHandler)}>

            <h1 className='mb-4 text-2xl font-bold'>Login</h1>

            <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input 
                    {...register('email', {required: 'Please enter email', 
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.]+$/i,
                            message: 'Please enter a valid email'
                        },
                    })}
                    type='email' className='w-full' id='email' autoFocus
                />
                {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
            </div>

            <div className='mb-4'>
                <label htmlFor='password'>Password</label>
                <input 
                    {...register('password', {
                        required: 'Please enter password', 
                        minLength: {value: 6, message: 'Password should be at least 6 characters'}
                    })}
                    type='password' className='w-full' id='password' autoFocus/>
                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
            </div>

            <div className='mb-4'>
                <button className='primary-button text-xl'>Login</button>
            </div>

            <div className='mb-4'>
                Don&apos;t have an account? &nbsp; 
                <Link href='/register' className='text-xl text-indigo-500'>Register</Link>
            </div>

        </form>
    </Layout>
  )
}
