import { useEffect, useState } from "react";

export default function useProducts(page, page_size) {

    const [products, setProducts] = useState([]);
    // calls the next js api endpoint with page, paze_size query params
    async function getProducts() {
        let products = await fetch(`/api/getProducts?page=${page}&page_size=${page_size}`);
        let JSON_Products = await products.json();
        return JSON_Products;
    }

    useEffect(() => {


        // calls the next js api endpoint with product_id query param
        getProducts().then((products) => {
            setProducts(products);
        });


    }, [])

}