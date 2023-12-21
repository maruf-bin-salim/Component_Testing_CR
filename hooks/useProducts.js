import { useEffect, useState } from "react";

export default function useProducts(selectedCategory) {
  const [page, setPage] = useState(0);
  const page_size = 10; // min 10
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(10000); // Math.ceil(totalCount / page_size) - 1

  const [possibleToLoadMore, setPossibleToLoadMore] = useState(false);

  // calls the next js api endpoint with page, paze_size query params
  async function getProducts(page, page_size) {
    setIsLoading(true);
    console.log("fetching products for page", page, "page_size", page_size);
    let products = await fetch(
      `/api/getProducts?page=${page}&page_size=${page_size}`,
    );
    let JSON_Products = await products.json();
    setMaxPage(Math.ceil(parseInt(JSON_Products.meta.total_count) / page_size));
    setIsLoading(false);
    return JSON_Products;
  }

  async function appendToResults() {
    let fetched = await getProducts(page + 1, page_size);
    console.log("fetched", fetched);
    if (fetched.results) {
      if (page == 0) {
        setPossibleToLoadMore(true);
        setProducts(fetched.results);
      } else {
        setProducts((products) => [...products, ...fetched.results]);
      }
      setTotalCount(parseInt(fetched.meta.total_count));
    }
  }

  useEffect(() => {
    let MAX_PAGE = Math.ceil(totalCount / page_size);
    console.log("page", page, "MAX_PAGE", MAX_PAGE);
    let loadPossibility = page + 1 <= MAX_PAGE && !isLoading;
    setPossibleToLoadMore(loadPossibility);

    if (page <= MAX_PAGE) {
      appendToResults();
    }
  }, [page]);



  return {
    products,
    isLoading,
    page,
    maxPage,
    setPage,
    possibleToLoadMore,
  };
}
