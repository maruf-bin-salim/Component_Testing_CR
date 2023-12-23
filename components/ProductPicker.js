import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useRef } from "react";
import { PAGE_MODES } from "@/data/enums";
import Header from "./Header";
import ProductsDisplay from "./ProductsDisplay";

export default function ProductPicker() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, possibleToLoadMore, setPage, isLoading, page, maxPage } =
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
        console.log("page", page, "maxPage", maxPage);
        if (page < maxPage) {
          setPage((page) => page + 1);
        }
      }
    }
  };

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

  return (
    <div
      className={`overflow-y-none m-4 ml-auto mr-auto mt-0 flex h-[100%] w-[90vw] flex-col overflow-y-hidden p-4 lg:w-[50vw]`}
    >
      <Header />

      {pageMode === PAGE_MODES.ALL_PRODUCTS && (
        <ProductsDisplay
          page={page}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          products={products}
          possibleToLoadMore={possibleToLoadMore}
          setPage={setPage}
          isLoading={isLoading}
          setPageMode={setPageMode}
          setSelectedProduct={setSelectedProduct}
          scrollTrackerRef={scrollTrackerRef}
        />
      )}

      {pageMode === PAGE_MODES.PRODUCT_DETAILS && selectedProduct && (
        <div className="mt-4 flex h-[min-content] max-h-[90%] w-full flex-col">
          <div>
            <p className="mt-8">Select A Product Color</p>
          </div>
          <div className="scrollbar-hidden flex flex-[1] flex-col overflow-y-scroll bg-[#F5F5F5]">
            {/* top portion */}
            <div className="flex min-h-[max-content] p-2">
              <div className="flex flex-1 flex-col">
                <img
                  src="/back.png"
                  alt=""
                  className="w-[20px] cursor-pointer lg:w-[30px]"
                  onClick={() => {
                    setPageMode(PAGE_MODES.ALL_PRODUCTS);
                    setSelectedProduct(null);
                  }}
                />

                <img
                  src="/pick_product.png"
                  className="m-auto w-[40%] min-w-[100px]"
                />
              </div>

              <div className="flex flex-col flex-1 justify-center">
                <h1 className="text-xl font-bold">{selectedProduct.brand}</h1>
                <h2 className="">{selectedProduct.name}</h2>
              </div>
            </div>

            <div className="flex  flex-wrap p-4">
              {
                // create a 20 size arrat and map it

                selectedProduct?.images?.map((current, index) => (
                  <div
                    key={index}
                    className="m-1 bg-blue-500"
                    style={{
                      backgroundColor: current.color_code,
                      width: "20px",
                      height: "20px",
                    }}
                  ></div>
                ))
              }
            </div>
            <div className="flex flex-col w-[100%] p-4">
              <button className="rounded-xl bg-[#a1b5ff] p-2 mb-2 text-white">
                Next
              </button>

              <p className="text-[#a1b5ff]">
                Maybe Later
              </p>
            </div>
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}
