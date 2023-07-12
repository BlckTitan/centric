/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { cartItem } from '@/slices/cartSlice';
import { displayErrorMessage, displaySuccessMessage } from '@/slices/promptSlice';
import { createCartData, updateCartData } from '@/utils/queryFunc';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function ProductScreen(prodtData) {
    const MESSAGE = useSelector((state) => state.promptMessage)
    const PRODUCT_DATA = prodtData.prodtData;
    const [cartData, setCartData] = useState()

    const dispatch = useDispatch()
    let EXISTING_ITEM = cartData?.find((item) => item?.type === PRODUCT_DATA?.name)
    let MATCH = (typeof EXISTING_ITEM === 'undefined') ? 0 : EXISTING_ITEM;

    
    const [productQty, setProductQty] = useState(0 || MATCH.quantity)

    const getAllCartData = async () =>{

        const REQ = await fetch('http://localhost:5000/cart')
        const RES = await REQ.json()

        setCartData(RES)
        dispatch(cartItem(RES.length))

    }
    console.log(MESSAGE.errorMessage, MESSAGE.successMessage)

    const verifyStock = () => {

        if(productQty > PRODUCT_DATA.stockCount){
            let updatedItem = '';
            let newItem = '';
            return dispatch(displayErrorMessage('Item exceeded stock quantity')),
            {updatedItem, newItem};
        }else if(productQty < 0){
            let updatedItem = '';
            let newItem = '';
            return dispatch(displayErrorMessage('Invalid item quantity')),
            {updatedItem, newItem}
        }else if(EXISTING_ITEM){
            let newItem = '';
            let newUpdatedItem = {_id: PRODUCT_DATA._id, type: MATCH.type, quantity: productQty, price: MATCH.price, img: MATCH.img, slug: MATCH.slug}
            let newUpdatedItemPriceByQty = (newUpdatedItem.price * newUpdatedItem.quantity)
            let updatedItem = {_id: PRODUCT_DATA._id, type: MATCH.type, quantity: productQty, price: MATCH.price, img: MATCH.img, slug: MATCH.slug, totalItemPrice: newUpdatedItemPriceByQty}
            return {updatedItem, newItem}
            
        }else{
            let updatedItem = '';
            const newCartItem = {_id: PRODUCT_DATA._id, type: PRODUCT_DATA.title, quantity: 1, price: PRODUCT_DATA.price, img: PRODUCT_DATA.image, slug: PRODUCT_DATA.slug}
            const itemPriceByQty = (newCartItem.price * newCartItem.quantity)
            let newItem = {_id: PRODUCT_DATA._id, type:PRODUCT_DATA.name, quantity: productQty, price: PRODUCT_DATA.price, img: PRODUCT_DATA.image, slug: PRODUCT_DATA.slug, totalItemPrice: itemPriceByQty}
            return {updatedItem, newItem}
        }
        
    }

    const addToCartHandler = () => {
        const { updatedItem, newItem } = verifyStock();

        if(EXISTING_ITEM && updatedItem !== ''){
            updateCartData(EXISTING_ITEM.id, updatedItem)
            dispatch(displaySuccessMessage('Item updated successfully!'));
        }else if(newItem !== ''){
            createCartData(newItem)
            dispatch(displaySuccessMessage('Item added successfully!'));
        }else{
            dispatch(displaySuccessMessage(''));
        }
        getAllCartData();
    }

    useEffect(() => {
        getAllCartData();

        if(MATCH.quantity !== 0){
            setProductQty(MATCH.quantity);
        }else if(MATCH === 0){
            setProductQty(MATCH);
        }else{
            setProductQty(productQty);
        }

        setTimeout(() =>{
            dispatch(displayErrorMessage(''))
            dispatch(displaySuccessMessage(''))
        }, 5000)

    }, [MESSAGE.errorMessage, MESSAGE.successMessage])

    if(!PRODUCT_DATA) return <p>Product not found!!!</p>

  return (
    <Layout title={PRODUCT_DATA.name}>
        <div className='py-2 w-full flex flex-col items-center'>
            
            <div className='w-4/6 h-14 flex items-center justify-end'>

                {(MESSAGE.successMessage !== '') && <span className='py-2 px-4 bg-green-300 text-green-800 font-semibold rounded-sm'>{MESSAGE.successMessage}</span>}
                {(MESSAGE.errorMessage !== '') && <span className='py-2 px-4 bg-red-300 text-red-800 font-semibold rounded-sm'>{MESSAGE.errorMessage}</span>}
            </div>

            <div className='bg-white w-4/6 p-4 md:p-5 xl:p-10'>
                    
                <div className='w-full h-12 flex items-center justify-between '>
                    <Link href='/'>
                        <span className='font-semibold'>&#8592; Go Back</span>
                    </Link>
                </div>

                <div className='grid xl:grid-cols-3 xl:grid-gap-3'>
                    <div className='xl:col-span-2'>
                        <div className='w-full h-fit bg-white flex justify-center'>
                            <img
                                src={PRODUCT_DATA.image}
                                alt={PRODUCT_DATA.description}
                                className='w-96 h-fit rounded-md mb-4 object-cover hover:scale-105'
                            />

                        </div>

                        <div>
                            <ul>
                                <li className='my-4'>
                                    <h1 className='text-base md:text-lg xl:text-xl font-bold'>{PRODUCT_DATA.name}</h1>
                                </li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Category: {PRODUCT_DATA.category}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>Brand: {PRODUCT_DATA.brand}</li>
                                <li className='my-2 text-base md:text-lg xl:text-xl'>{PRODUCT_DATA.rating} of {PRODUCT_DATA.ratingCount} reviews</li>
                                <li className='w-full xl:5/6 2xl:w-1/2 text-base md:text-lg xl:text-xl font-semibold'>Description: {PRODUCT_DATA.description}</li>
                            </ul>
                        </div>
                    </div>

                    

                    <div className='card h-fit p-5 xl:col-span-1 mt-8 xl:mt-0'>
                        <div className='mb-2 flex justify-between'> 
                            <span>Price</span>
                            <span>{PRODUCT_DATA.price}</span>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <span>Status</span>
                            <span>{PRODUCT_DATA.stockCount > 0 ? 'In Stock': 'Unavailable'}</span>
                        </div>
                        
                        <div className='w-full flex justify-between items-center py-2'>
                            <span>Quantity</span>
                            <div className='flex'>

                                <input 
                                    type='number'
                                    className='border-2 border-solid border-gray-200 w-16 text-lg px-2 text-center'
                                    value={productQty || MATCH.quantity}
                                    onChange={(e) => setProductQty(e.target.value)}
                                />
                            </div>
                        </div>
                        <button 
                            className='primary-button w-full h-12 text-base xl:text-lg font-semibold'
                            onClick={() => addToCartHandler()}
                        >Add to Card</button>
                    </div>
                </div>
            </div>
            
        </div>
    </Layout>
  )
}

export async function getStaticPaths(){

        await db.connect()
        const dbProducts = await Product.find().lean();

        const products = dbProducts.map(db.convertDocToObj)

        const paths = products.map((productID) => {
            return {
                params: {
                    slug: `${productID.slug}`
                }
            }
        })
    return {
        
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const { params } = context;
    const { slug } = params;
    
    await db.connect()
    const products = await Product.findOne({ slug }).lean();
    await db.disconnect();
  
    return {
      props: { 
        prodtData: products ? db.convertDocToObj(products) : null
      }
    }
}