import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react'

export default function LoginScreen() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const submitHandler = async(email, password) => {
        try{
            const result = await signIn('credentials', {
                redirect: false,
                email, password
            });
            if(result.error){
                toast.error(result.error)
            }
        } catch(error){
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
                        minLength: {value: 8, message: 'Password should be at least 8 characters'}
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
