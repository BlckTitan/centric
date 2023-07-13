/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/checkoutWizard/CheckoutWizard';
import { cartItem } from '@/slices/cartSlice';
import { getAllCartData } from '@/utils/queryFunc';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function PlaceOrderScreen() {

    const [cartData, setCartData] = useState('');
    let vat = 0.00;
    const [subTotalPrice, setSubTotalPrice] = useState(0.00);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const dispatch = useDispatch();

    const fetchShippingCookieData = () => {
        const COOKIE_DATA = Cookies.get('shipping');
        if(COOKIE_DATA){
           const PARSED_COOKIE = JSON.parse(COOKIE_DATA)
           return PARSED_COOKIE.shippingAddress;
        }
    }
    const computeTotal = (res) =>{
        let subTotal = 0.00;
        if(res){
            res.map((cost) => (
                subTotal += cost.totalItemPrice
            )),
            setSubTotalPrice(subTotal)
            setTotalPrice(subTotal + vat)
        }
    }
    const fetchPaymentCookieData = () => {
        const COOKIE_DATA = Cookies.get('user-payment-method');
        if(COOKIE_DATA){
           const PARSED_COOKIE = JSON.parse(COOKIE_DATA)
           return PARSED_COOKIE
        }
    }
    const PAYMENT_DATA = fetchPaymentCookieData();
    const SHIPPING_DATA = fetchShippingCookieData();

    useEffect(() => {

        const CART_FETCH_RESPONSE = async () => {
            const DATA = await getAllCartData();
            
            dispatch(cartItem(DATA.length));
            setCartData(DATA)
            computeTotal(DATA)
        }
        CART_FETCH_RESPONSE()

    }, [dispatch])
  return (
    <Layout title='Payment'>
        <div className='w-full flex flex-col bg-white py-4 px-5'>

            <CheckoutWizard activePanel={3}/>
            
            <div className='w-full text-left'>
                <h1 className='mb-4 text-xl'>Place Order</h1>
            </div>

            <div className='w-full flex flex-col'>

                <div className='w-full grid grid-cols-1 xl:grid-cols-12 gap-8'>

                    <div className='xl:col-span-4'>
                        <div className='overflow-x-auto md:col-span-3'>
                            <div className='border-solid border-b p-5'>
                                <h2 className='mb-2 text-lg font-semibold'>Shipping Address</h2>
                                <div className='w-full'>
                                    <p>{SHIPPING_DATA.fullName}</p> {SHIPPING_DATA.address}, &nbsp;
                                    {SHIPPING_DATA.city}, {SHIPPING_DATA.postalCode},  &nbsp;
                                    {SHIPPING_DATA.country}
                                </div>
                                
                                <div className='link'>
                                    <Link href='/shipping'>
                                        <span className='text-indigo-500'>Edit</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='overflow-x-auto md:col-span-3'>
                            <div className='border-solid border-b p-5'>
                                <h2 className='mb-2 text-lg font-semibold'>Payment Method</h2>
                                <div className='w-full'>
                                    {PAYMENT_DATA.payment}
                                </div>

                                
                            <div className='link'>
                                <Link href='/payment'>
                                    <span className='text-indigo-500'>Edit</span>
                                </Link>
                            </div> 

                            </div>
                        </div>
                    </div>

                    <div className='overflow-x-auto md:col-span-8 border-l-2 border-solid'>
                        <div className='border-solid border-b p-5 overflow-y-auto'>
                            <table className='min-w-full'>

                                <thead className='border-b border-solid border-slate-300'>
                                    <tr>
                                        <th className='px-5 text-left'>Item</th>
                                        <th className='p-5 text-right'>Quantity</th>
                                        <th className='p-5 text-right'>Price</th> 
                                        <th className='p-5 text-right'>Total</th> 
                                    </tr>
                                </thead>

                                <tbody>
                                    {(cartData?.length === 0) ? 
                                        <div className='w-full flex justify-center'>Cart is empty!!</div> :
                                        cartData?.map((item, index) => (
                                            <tr key={index} className='border-b border-solid border-slate-300 text-xl'>
                                                <td className='py-2'>
                                                    <Link href={`/product/${item.slug}`} className='flex'>
                                                        <img
                                                            className='w-24 xl:w-48 h-10 xl:h-24 object-contain bg-red-500 xl:bg-transparent'
                                                            src={item.img}
                                                            alt={item.type}
                                                        />
                                                        <span className='flex items-center'>
                                                            &nbsp;
                                                            {item.type}
                                                        </span>
                                                    </Link>
                                                </td>

                                                <td className='p-5 text-right'>
                                                    {item.quantity}
                                                </td>

                                                <td className='p-5 text-right'>
                                                    ${item.price}
                                                </td>

                                                <td className='p-5 text-right'>
                                                    ${item.totalItemPrice}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>

                            <div className='pricing w-full flex flex-col items-end justify-center'>
                                <div>
                                    <span>Sub Total</span>
                                    <span className='price'>${subTotalPrice.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>VAT </span>
                                    <span className='price'>${vat.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <span className='price'>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            
                        <div className='link'>
                            <Link href='/cart'>
                                <span className='text-indigo-500'>Edit</span>
                            </Link>
                        </div> 

                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </Layout>
  )
}
