import Layout from '@/components/Layout';
import ProductItem from '@/components/product/ProductItem';
import data from '@/utils/data';

export default function Home() {
  return (
      <Layout title="Home Page">
        <div className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center'>
          {data.products.map((productData, index) => (
            <ProductItem product={productData} key={index}/>
          ))}
        </div>
      </Layout>
  )
}
