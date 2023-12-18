import useProducts from '@/hooks/useProducts'
import Image from 'next/image';




export default function ProductPicker() {
    const { products, goToNextPage, goToPreviousPage, goToPage } = useProducts();
    return (
        <div className={`flex flex-col min-h-screen py-2`}>
            <Image src="/pick_product.png" alt={"Pick a Product"} width={500} height={500} />
            <h1>Product Picker</h1>
        </div>
    )
}