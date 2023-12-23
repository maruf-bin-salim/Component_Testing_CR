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
        <div className="mt-4 flex h-[90%] w-full flex-col">
          <div>
            <p className="mt-8">Select A Product Color</p>
          </div>
          <div className="scrollbar-hidden flex flex-[0.9] flex-col overflow-y-scroll bg-red-500">
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

              <div className="flex flex-1 flex-col bg-green-200">hey</div>
            </div>

            <div className="flex bg-red-700 p-2 flex-wrap">
              {
                // create a 20 size arrat and map it

                selectedProduct?.images?.map((current, index) => (
                  <div
                    className="m-2 bg-blue-500"
                    style={{
                      backgroundColor: current.color_code,
                      width: "20px",
                      height: "20px",
                    }}
                  >
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}
