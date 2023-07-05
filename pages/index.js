import Layout from '@/components/Layout';
import ProductItem from '@/components/product/ProductItem';
import Product from '@/models/Product';
import { cartItem } from '@/slices/cartSlice';
import db from '@/utils/db';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({ prodtData, cartData}) {

  const message = useSelector((state) => state.promptMessage.value)
  const dispatch = useDispatch()
  const [products, setProducts] = useState()

  // const getAllProducts = async () => {
  //   const req = await fetch('/api/product')
  //   const res = await req.json()
    
  //   setProducts(res)
  // }
  useEffect(() => {
    // getAllProducts()
    setProducts(prodtData)
    dispatch(cartItem(cartData.length))

  }, [dispatch, cartData.length])

  if(!products) return <div>Loading...</div>
  
  return (
      <Layout title="Homepage">

        <div className='w-full h-14 flex items-center justify-between'>
          <div className='hidden'>search</div>

          {(message !== '') && <span className='py-2 px-4 bg-green-300 text-green-800 font-semibold rounded-sm'>{message}</span>}

        </div>

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center'>
          {products?.map((productData, index) => (
            <ProductItem product={productData} key={index}/>
          ))}
        </div>

      </Layout>
  )
}

export async function getStaticProps(){

  await db.connect()
  const products = await Product.find().lean();

  const cartReq = await fetch('http://localhost:5000/cart')
  const cartRes = await cartReq.json()

  return {
    props: { 
      prodtData: products.map(db.convertDocToObj),
      cartData: cartRes
    }
  }
}