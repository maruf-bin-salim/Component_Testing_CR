const { categories } = require("@/data/categories");
const { default: Product } = require("./Product");

export default function ProductsDisplay({
    selectedCategory,
    setSelectedCategory,
    searchKeyword,
    setSearchKeyword,
    products,
    possibleToLoadMore,
    setPage,
    isLoading,
    setPageMode,
    setSelectedProduct,
    scrollTrackerRef,
  }) {
    function getProductCount() {
      return products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          (product.category === selectedCategory || selectedCategory === "all"),
      ).length;
    }
  
    return (
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
    );
  }
  