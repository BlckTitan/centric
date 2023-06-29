/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import { cartItem } from '@/slices/cartSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdHighlightOff } from "react-icons/md";
import { displayMessage } from '@/slices/promptSlice';
import { useRouter } from 'next/router';
import { getAllCartData, deleteOneCartData } from '@/utils/queryFunc';



export default function CartScreen() {
    const [cart, setCart] = useState()
    let vat = 0.00;
    const [subTotalPrice, setSubTotalPrice] = useState(0.00)
    const [totalPrice, setTotalPrice] = useState(0.00)

    const dispatch = useDispatch()
    const router = useRouter()

    const message = useSelector((state) => state.promptMessage.value);

    const fetchCart = async () =>{
        
        const res = await getAllCartData()
        if(!res) return <div>Loading...</div>
        setCart(res)
        dispatch(cartItem(res?.length))
        computeTotal(res)
    }

    const removeItemHandler = async (item) =>{
        const existingItem = cart?.find((deleteItem) => deleteItem.id = item)
        
        deleteOneCartData(existingItem.id)
        fetchCart()
        dispatch(cartItem(cart?.length))
        dispatch(displayMessage('Item deleted successfully!!!'))
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

    useEffect(() => {
        fetchCart()
        dispatch(cartItem(cart?.length))

        setTimeout(() =>{
            dispatch(displayMessage(''))
        }, 5000)

    }, [message])

  return (
    <Layout title='Cart' >

        <div className='w-full flex flex-col items-center'>
            <div className='w-5/6 h-16 flex items-center justify-between'>
                <h1 className='font-semibold xl:text-xl'>Shopping Cart</h1>
                {(message !== '') && <span className='py-2 px-4 bg-green-300 text-green-800 font-semibold rounded-sm'>{message}</span>}
            </div>

            <div className=' w-5/6 grid md:grid-cols-1 md:gap-5 justify-center bg-white rounded-md py-5 px-10'>
                <div className='overflow-x-auto md:col-span-3'>

                    <table className='min-w-full'>

                        <thead className='border-b border-solid border-slate-300'>
                            <tr>
                                <th className='px-5 text-left'>Item</th>
                                <th className='p-5 text-right'>Quantity</th>
                                <th className='p-5 text-right'>Price</th> 
                                <th className='p-5 text-right'>Total</th> 
                                <th className='p-5'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {(cart?.length === 0) ? 
                                <div className='w-full flex justify-center'>Cart is empty!!</div> :
                                cart?.map((item, index) => (
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

                                        <td className='p-5 text-center'>
                                            <button onClick={() => removeItemHandler(item.id)} style={{color: 'red', fontSize: '1.9rem'}}>
                                                <MdHighlightOff/>
                                            </button>
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
                        <div className='checkout'>
                            <button 
                                className='primary-button'
                                onClick={() => router.push('login?redirect=/shipping')}
                            >Checkout</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
    </Layout>
  )
}
