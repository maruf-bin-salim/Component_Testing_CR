import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import { useState } from "react";
import Product from "./Product";

const PAGE_MODES = {
  ALL_PRODUCTS: "ALL_PRODUCTS",
  PRODUCT_DETAILS: "PRODUCT_DETAILS",
};

export default function ProductPicker() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, categories, appendToResults, isLoading } =
    useProducts(selectedCategory);
  const [pageMode, setPageMode] = useState(PAGE_MODES.ALL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (pageMode === PAGE_MODES.PRODUCT_DETAILS && selectedProduct) {
    return <p>Product Details {JSON.stringify(selectedProduct)}</p>;
  }

  if (pageMode === PAGE_MODES.ALL_PRODUCTS) {
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
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              id="categories"
              className={`mt-2 block w-full rounded-t-lg border border-gray-300 bg-white p-3 text-sm`}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Type to search ..."
              type="text"
              className={`block w-full border border-t-0 border-gray-300 bg-white p-3 text-sm`}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />

            {isLoading && <p className="m-2 text-center">Loading ...</p>}

            {!isLoading && (
              <div>
                {products
                  .filter(
                    (product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase()) &&
                      (product.category === selectedCategory ||
                        selectedCategory === "all"),
                  )
                  .map((product) => (
                    <Product key={product.product_id} product={product} setPageMode={setPageMode} setSelectedProduct={setSelectedProduct}/>
                  ))}
              </div>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    );
  }
}
