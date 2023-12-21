import { PAGE_MODES } from "@/data/enums";


export default function Product({index, product, setSelectedProduct, setPageMode }) {
  return (
    <div
      onClick={() => {
        setPageMode(PAGE_MODES.PRODUCT_DETAILS);
        setSelectedProduct(product);
      }}
      className={`flex cursor-pointer items-center gap-4 border-b border-[#b1b1b180] bg-[#F5F5F5] p-4`}
    >
      <img
        className={`h-18 w-16`}
        src={product.base_image}
        alt={product.name}
        height={50}
        width={50}
      />
      <p>{`${index+1} . ${product.name}`}</p>
    </div>
  );
}
