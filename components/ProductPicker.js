import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Product from "./Product";
import { PAGE_MODES } from "@/data/enums";

export default function ProductPicker() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, possibleToLoadMore, categories, setPage, isLoading } =
    useProducts(selectedCategory);
  const [pageMode, setPageMode] = useState(PAGE_MODES.ALL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollTrackerRef = useRef();

  const onScroll = async () => {
    console.log("scrolling");
    if (scrollTrackerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollTrackerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        console.log("Reached bottom");
        setPage((page) => page + 1);
      }
    }
  };

  function getProductCount() {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (product.category === selectedCategory || selectedCategory === "all"),
    ).length;
  }

  useEffect(() => {
    const scrollTrackableElement = scrollTrackerRef.current;

    if (scrollTrackableElement) {
      scrollTrackableElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        scrollTrackableElement.removeEventListener("scroll", onScroll);
      };
    }
  }, [scrollTrackerRef.current]);

  if (pageMode === PAGE_MODES.PRODUCT_DETAILS && selectedProduct) {
    return (
      <p
        onClick={() => {
          setPageMode(PAGE_MODES.ALL_PRODUCTS);
        }}
      >
        Product Details {JSON.stringify(selectedProduct)}
      </p>
    );
  }

  if (pageMode === PAGE_MODES.ALL_PRODUCTS) {
    return (
      <div
        className={`overflow-y-none m-4 ml-auto mr-auto mt-0 flex h-[100%] w-[90vw] flex-col overflow-y-hidden p-4 lg:w-[50vw]`}
      >
        <div className="h-[max-content] w-full">
          <Image
            className="m-auto"
            src="/pick_product.png"
            alt="Pick a Product"
            height={10}
            width={200}
          />
          {/* {page}  */}
        </div>
        <div className="flex h-[max-content] items-center">
          <div className="flex h-[2px] flex-1 border-b"></div>
          <p className="m-4">Buy it now!</p>
          <div className={`flex h-[2px] flex-1 border-b`}></div>
        </div>

        <div className="mt-4 flex h-[90%] w-full flex-col">
          <div>
            <p className="">Find a Product</p>
            <select
              value={selectedCategory}
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
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>

          <div
            className={`overflow-y-scroll rounded-b-lg border border-gray-300`}
            ref={scrollTrackerRef}
          >
            {products
              .filter(
                (product) =>
                  product.name
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) &&
                  (product.category === selectedCategory ||
                    selectedCategory === "all"),
              )
              .map((product, index) => (
                <Product
                  key={index}
                  index={index}
                  product={product}
                  setPageMode={setPageMode}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            {possibleToLoadMore &&
              !isLoading &&
              getProductCount() !== 0 &&
              getProductCount() < 7 && (
                <p
                  onClick={() => {
                    setPage((page) => page + 1);
                  }}
                  className="m-2 cursor-pointer p-4 text-center"
                >
                  Load More ...{" "}
                </p>
              )}
          </div>
          <div className="min-h-[100px]">
            {isLoading && <p className="m-2 p-4 text-center">Loading ...</p>}
          </div>
        </div>
        {/*  */}
      </div>
    );
  }
}
