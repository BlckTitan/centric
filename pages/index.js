import Layout from '@/components/Layout';
import ProductItem from '@/components/product/ProductItem';
import { cartItem } from '@/slices/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({productData, cartData}) {

  const message = useSelector((state) => state.promptMessage.value)
  const dispatch = useDispatch()
  const [products, setProducts] = useState()

  useEffect(() => {
    setProducts(productData)

    dispatch(cartItem(cartData.length))

  }, [products, productData])

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
  const req = await fetch('http://localhost:5000/products')
  const res = await req.json()

  const cartReq = await fetch('http://localhost:5000/cart')
  const cartRes = await cartReq.json()

  return {
    props: { 
      productData: res,
      cartData: cartRes
    }
  }
}