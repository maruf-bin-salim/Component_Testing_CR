import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useRef } from "react";
import { PAGE_MODES } from "@/data/enums";
import Header from "./Header";
import ProductsDisplay from "./ProductsDisplay";
import ColorPicker from "./ColorPicker";

export default function ProductPicker() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, possibleToLoadMore, setPage, isLoading, page, maxPage } =
    useProducts(selectedCategory);
  const [pageMode, setPageMode] = useState(PAGE_MODES.ALL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollTrackerRef = useRef();
  const [selectedColor, setSelectedColor] = useState(null);

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
        <ColorPicker
          selectedProduct={selectedProduct}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setPageMode={setPageMode}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {pageMode === PAGE_MODES.PRODUCT_CHECKOUT && (
        <div className="mt-4 flex h-[min-content] max-h-[90%] w-full flex-col">
          <div>
            <div>
              <div className="flex flex-1 flex-col justify-center">
                <div>
                  <p className="text-lg">{`Brand : ${selectedProduct?.brand}`}</p>
                  <p className=" text-lg">{selectedProduct?.name}</p>
                </div>
                {selectedColor && (
                  <>
                    <div
                      className="mb-2 flex h-[20px] w-[20px] flex-wrap border-2 border-black"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                  </>
                )}
              </div>
            </div>
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
                    setPageMode(PAGE_MODES.PRODUCT_DETAILS);
                  }}
                />

                <img
                  src={
                    selectedProduct?.images?.find((image) => {
                      return image.color_code === selectedColor;
                    })?.image_url || selectedProduct.base_image
                  }
                  className="m-auto w-[40%] min-w-[100px]"
                />
              </div>

              <div className="flex flex-1 flex-col pt-[15px] lg:pt-[30px]">
                <h1 className="text-xl font-bold">{selectedProduct.brand}</h1>
                <h2 className="">{selectedProduct.name}</h2>
              </div>
            </div>

            <div className="flex w-[100%] flex-col p-4">
              <button
                disabled={!selectedColor}
                onClick={async () => {
                  alert("Thank you for your purchase!");
                  setSelectedColor(null);
                  setSelectedProduct(null);
                  setPageMode(PAGE_MODES.ALL_PRODUCTS);
                }}
                className="mb-2 rounded-xl border-2 border-[#7190ff] bg-[#a1b5ff] p-2 text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-none disabled:bg-[#a1b5ff] disabled:opacity-50"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}
