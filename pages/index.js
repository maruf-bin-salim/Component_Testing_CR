import useProducts from '@/hooks/useProducts'

export default function Home() {

  // get the products using the useProducts hook from page 1 where page size is 20
  let products = useProducts(1, 20);

  return (
    <main className={`flex min-h-screen flex-col items-center p-0`}>
      <p className={`text-4xl font-bold mb-8`}>Products</p>
    </main>
  )
}

