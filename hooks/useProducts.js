import { useEffect, useState } from "react";



export default function useProducts(selectedCategory) {
  const [page, setPage] = useState(0);
  const page_size = 10; // min 10
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [possibleToLoadMore, setPossibleToLoadMore] = useState(false);

  // calls the next js api endpoint with page, paze_size query params
  async function getProducts(page, page_size) {
    setIsLoading(true);
    console.log("fetching products for page", page, "page_size", page_size);
    let products = await fetch(
      `/api/getProducts?page=${page}&page_size=${page_size}`,
    );
    let JSON_Products = await products.json();
    setIsLoading(false);
    return JSON_Products;
  }

  async function appendToResults() {
    let fetched = await getProducts(page + 1, page_size);
    console.log("fetched", fetched);
    if (fetched.results) {
      setProducts((products) => [...products, ...fetched.results]);
      setTotalCount(parseInt(fetched.meta.total_count));
    }
  }

  useEffect(() => {
    let MAX_PAGE = Math.ceil(totalCount / page_size);
    console.log("page", page, "MAX_PAGE", MAX_PAGE);
    let loadPossibility = (page <= MAX_PAGE) && !isLoading;
    setPossibleToLoadMore(loadPossibility);

    if (page <= MAX_PAGE) {
      appendToResults();
    } else {
      setPage(MAX_PAGE + 1);
    }
  }, [page]);

  useEffect(() => {
    if (page > 0) {
      setProducts([]);
    }
    setPage(0);
  }, [selectedCategory]);

  return {
    products,
    isLoading,
    page,
    setPage,
    possibleToLoadMore,
  };
}
