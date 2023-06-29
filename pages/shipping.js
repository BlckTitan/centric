import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/checkoutWizard/CheckoutWizard';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getShipping } from '@/slices/formSlice';
import Cookies from 'js-cookie';

export default function Shipping() {
    const data = useSelector((state) => state.shippingForm.shipping)
    const dispatch = useDispatch()

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    const submitHandler = ({fullName, address, city, postalCode, country}) => {
        dispatch(getShipping({fullName, address, city, postalCode, country}))
        Cookies.set('shipping',
        JSON.stringify({
            shippingAddress: {
                fullName, 
                address,
                city,
                postalCode,
                country,
                location
            }
        }))
    }
  return (
    <Layout title={'Shipping'}>

        <div className='w-full flex flex-col bg-white py-4'>

            <CheckoutWizard activePanel={1}/>
            <form className=' w-full flex justify-center' onSubmit={handleSubmit(submitHandler)}>
                <div className='w-2/5'>
                    
                    <h1 className='mb-4 text-xl'>Shipping Address</h1>

                    <div className='mb-4'>
                        <label htmlFor='fullName' className='font-semibold'>Full Name</label>
                        <input type="text" id='fullName' className='w-full py-3 px-2 rounded-md border-solid border' autoFocus {...register('fullName', {required: 'Pease enter your full name'})}/>
                        {errors.fullName && ( <div className='text-red-500'>{errors.fullName.message}</div>)}
                    </div>
                    
                    <div className='mb-4'>
                        <label htmlFor='address' className='font-semibold'>Address</label>
                        <input type="text" id='address' className='w-full py-3 px-2 rounded-md border-solid border' 
                            autoFocus {...register('address', 
                                {required: 'Please enter your address', minLength: { value: 3, message: 'Address is more than 2 chars'}})}/>
                        {errors.address && ( <div className='text-red-500'>{errors.address.message}</div>)}
                    </div> 

                    <div className='mb-4'>
                        <label htmlFor='city' className='font-semibold'>City</label>
                        <input type="text" id='city' className='w-full py-3 px-2 rounded-md border-solid border' autoFocus {...register('city', {required: 'Pease enter your city'})}/>
                        {errors.city && ( <div className='text-red-500'>{errors.city.message}</div>)}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='postalCode' className='font-semibold'>Postal Code</label>
                        <input type="text" id='postalCode' className='w-full py-3 px-2 rounded-md border-solid border' autoFocus {...register('postalCode', {required: 'Pease enter your postal code'})}/>
                        {errors.postalCode && ( <div className='text-red-500'>{errors.postalCode.message}</div>)}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='country' className='font-semibold'>Country</label>
                        <input type="text" id='country' className='w-full py-3 px-2 rounded-md border-solid border' autoFocus {...register('country', {required: 'Pease enter your country'})}/>
                        {errors.country && ( <div className='text-red-500'>{errors.country.message}</div>)}
                    </div>

                    <div className='mb-4 flex justify-center'>
                        <button className='primary-button md:px-20 md:py-3 md:text-xl'>Next</button>
                    </div>
                </div>
            </form>
        </div>

    </Layout>
  )
}
