import Layout from '@/components/Layout';
import ProductItem from '@/components/product/ProductItem';
// import data from '../data';
import { useEffect, useState } from 'react';

export default function Home({productData}) {
  const [products, setProducts] = useState()

  useEffect(() => {
    setProducts(productData)
  }, [products, productData])

  if(!products) return <div>Loading...</div>
  
  return (
      <Layout title="Home Page">
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

  return {
    props: { productData: res }
  }
}
