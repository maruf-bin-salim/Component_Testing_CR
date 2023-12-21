import { useEffect, useState } from "react";

const categories = [
  {
    name: "Pick A category",
    value: "all",
  },
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Clothing",
    value: "clothing",
  },
  {
    name: "Toys",
    value: "toys",
  },
];

export default function useProducts(selectedCategory) {
  const [page, setPage] = useState(0);
  const page_size = 10; // min 10
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

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
    if (page <= MAX_PAGE) {
      appendToResults();
    }
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [selectedCategory]);

  return {
    products,
    categories,
    isLoading,
    page,
    setPage,
  };
}
