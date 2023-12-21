import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useRef } from "react";
import { PAGE_MODES } from "@/data/enums";
import Header from "./Header";
import ProductsDisplay from "./ProductsDisplay";


export default function ProductPicker() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products, possibleToLoadMore, setPage, isLoading } =
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

      {/*  */}
    </div>
  );
}
