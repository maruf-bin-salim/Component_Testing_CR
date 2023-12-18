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
  const [page, setPage] = useState(1);
  const page_size = 20;
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

  // calls the next js api endpoint with page, paze_size query params
  async function getProducts() {
    setIsLoading(true);
    let products = await fetch(
      `/api/getProducts?page=${page}&page_size=${page_size}`,
    );
    let JSON_Products = await products.json();
    setIsLoading(false);
    return JSON_Products;
  }

  function goToNextPage() {
    if (products.meta.total_count > page * page_size) {
      setPage(page + 1);
    }
  }

  function goToPreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function appendToResults(page) {
    if (products.meta.total_count > page * page_size) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    // calls the next js api endpoint with product_id query param
    getProducts().then((fetched) => {
      if (fetched.results) {
        setProducts([...products, ...fetched.results]);
      }
    });
  }, [page]);

  useEffect(() => {
    if (true || selectedCategory !== "all") {
      // calls the next js api endpoint with product_id query param
      getProducts().then((fetched) => {
        if (fetched.results) {
          setProducts(fetched.results);
        }
      });
    }
  }, [selectedCategory]);

  return {
    products,
    categories,
    isLoading,

    goToNextPage,
    goToPreviousPage,
    appendToResults,
  };
}
