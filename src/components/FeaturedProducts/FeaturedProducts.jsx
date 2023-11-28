import React from "react";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

register();

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('swiperprogress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('swiperslidechange', (e) => {
      console.log('slide changed');
    });
  }, []);
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
      </div>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="4"
        pagination="true"
      >
        {error
          ? "Something went wrong!"
          : loading
            ? "loading"
            : data?.map((item) => <swiper-slide><Card item={item} key={item.id} /></swiper-slide>)}
      </swiper-container>
    </div>
  );
};

export default FeaturedProducts;
