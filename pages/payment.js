import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/checkoutWizard/CheckoutWizard';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPayment } from '@/slices/formSlice';
import { toast } from 'react-toastify';
import { getAllCartData } from '@/utils/queryFunc';
import { cartItem } from '@/slices/cartSlice';

export default function PaymentScreen() {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
    const paymentMthd = useSelector((state) => state.shippingForm.payment)

    const router = useRouter();
    const dispatch = useDispatch()
    let shippingCookieData = Cookies.get('shipping');
    let paymentCookieData = Cookies.get('user-payment-method');

    const paymentMethods = ['Paypal', 'Stripe', 'CashOnDelivery'];

    const submitHandler = (e) => {

        e.preventDefault();

        if(!selectedPaymentMethod){
            return toast.error('Select a payment method')
        }
        dispatch(getPayment(selectedPaymentMethod))
        Cookies.set(
            'user-payment-method',
            JSON.stringify({
                payment: selectedPaymentMethod
            })
        );
        router.push('/placeorder')
    }

    useEffect(() => {
        if(shippingCookieData) {
            let shippingcookieData = JSON.parse(shippingCookieData)
            let shippingData = shippingcookieData.shippingAddress

            if(!shippingData){
                return router.push('/shipping')
            }
        }else{
            return router.push('/shipping')
        }

        if(paymentCookieData) {
            let paymentData = JSON.parse(paymentCookieData)
            let paymentCookie = paymentData.payment
            setSelectedPaymentMethod(paymentCookie || '')
        }

        const RES = async () => {
            const DATA = await getAllCartData();
            
            dispatch(cartItem(DATA.length));
        }
        RES()
            

    }, [dispatch, router, shippingCookieData, paymentMthd, paymentCookieData])

  return (
    <Layout title='Payment'>
        <div className='w-full flex flex-col bg-white py-4 px-5'>

            <CheckoutWizard activePanel={2}/>
            <form className=' w-full flex justify-center' onSubmit={submitHandler}>
                <div className='w-2/5'>
        
                    <h1 className='mb-4 text-xl'>Shipping Address</h1>

                    <div className='w-full flex justify-center'>
                        {
                            paymentMethods.map((paymentMethod, index) => (
                                <div key={index} className='mb-4 mx-4'>
                                    <input 
                                        type='radio' 
                                        name={paymentMethod}
                                        className='p-2 outline-none focus:ring-0'
                                        id='payment'
                                        checked={selectedPaymentMethod === paymentMethod}
                                        onChange={() => setSelectedPaymentMethod(paymentMethod)}
                                    /> &nbsp;
                                    <label htmlFor='payment'>{paymentMethod}</label>
                                </div>
                            ))
                        }
                    </div>
                    

                    <div className='mb-4 flex justify-between'>
                        <button 
                            onClick={() => router.push('/shipping')}
                            type='button'
                            className='default-button'
                        >
                            Back
                        </button>

                        <button 
                            onClick={() => router.push('/placeOrder')}
                            type='submit'
                            className='primary-button'
                        >
                            Next
                        </button>
                    </div>
                </div>
                
            </form>
        </div>
    </Layout>
  )
}
