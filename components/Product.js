import Image from "next/image";

export default function Product({ product, setSelectedProduct, setPageMode }) {
  return (
    <div
      onClick={() => {
        setPageMode("PRODUCT_DETAILS");
        setSelectedProduct(product);
      }}
      className={`flex cursor-pointer items-center gap-4 border-b border-gray-400 bg-gray-300 p-4`}
    >
      <img
        className={`h-18 w-16`}
        src={product.base_image}
        alt={product.name}
        height={50}
        width={50}
      />
      <p>{product.name}</p>
    </div>
  );
}
