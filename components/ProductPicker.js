import useProducts from "@/hooks/useProducts";
import Image from "next/image";

export default function ProductPicker() {
  const { products, scrolledThroughResults } = useProducts();

  return (
    <div className={`m-4 ml-auto mr-auto flex w-[90vw] flex-col lg:w-[50vw]`}>
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
        <div className={`flex h-[2px] flex-1 border-b`}></div>
      </div>

      <div className="mt-8">
        <p className="">Find a Product</p>
        <div>
          <select
            id="countries"
            className={`mt-2 block w-full rounded-lg border border-gray-300 bg-white p-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-200`}
          >
            <option value="default">Pick a Category</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
