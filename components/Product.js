export default function Product({product}) {
    return (
        <div className={`flex items-center justify-between border-b border-gray-400 p-4 bg-gray-300 cursor-pointer`}>
            {JSON.stringify(product)}
            <p>
                {product.name} 
            </p>
        </div>
    );
}