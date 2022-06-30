import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Pagination, Slider, TextField } from "@mui/material";

import { productsContext } from "../../contexts/productsContext";

import ProductCard from "../ProductCard/ProductCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const { products, getProducts, pages } = useContext(productsContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("_page") ? +searchParams.get("_page") : 1
  );
  const [price, setPrice] = useState([1, 100000]);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  useEffect(() => {
    setSearchParams({
      q: search,
      _page: currentPage,
      _limit: 2,
      price_gte: price[0],
      price_lte: price[1],
    });
  }, [search, currentPage, price]);
  // console.log(price);

  useEffect(() => {
    getProducts();
  }, [searchParams]);
  // console.log(currentPage);

  // console.log(window.location.search);

  return (
    <Container>
      <Box>
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          label="Search"
          variant="outlined"
        />
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={(event, value) => {
            // console.log(value);
            setPrice(value);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={1000}
        />
      </Box>
      <Box>
        {products.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Box>
      <Box>
        <Pagination
          onChange={(event, page) => {
            // console.log(page);
            setCurrentPage(page);
          }}
          page={currentPage}
          count={pages}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductsList;
