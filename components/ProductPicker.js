import useProducts from "@/hooks/useProducts";
import Image from "next/image";

export default function ProductPicker() {
  const { products, scrolledThroughResults } = useProducts();
  return (
    <div className="m-4 ml-auto mr-auto flex w-[90vw] flex-col lg:w-[50vw]">
      <Image
        className="m-auto"
        src="/pick_product.png"
        alt="Pick a Product"
        height={10}
        width={200}
      />
      <div className="flex items-center">
        <div className="flex h-[2px] flex-1 border-b"></div>
        <p className="m-4">Buy it now!</p>
        <div className="flex h-[2px] flex-1 border-b"></div>
      </div>
      <p className="">Find a Product</p>
      {/* <h1>Product Picker {JSON.stringify(products)}</h1> */}
      <div>
        <select
          id="countries"
          defaultValue={"Choose a country"}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    </div>
  );
}
