import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.scss";
import useFetch from "../../hooks/useFetch";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, loading, error } = useFetch(`/sliders?populate=*`);
  console.log(data)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data?.length - 1 : currentSlide - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === data?.length - 1 ? 0 : currentSlide + 1);
  };

  const getImageUrl = (item) => {
    if (item?.attributes?.Images?.data.length > 0) {
      const imageURL = item.attributes.Images.data[0].attributes.url;
      console.log("imageURL ----> ", imageURL)
      return imageURL;
    }
    return '';
  };

  return (
    <div className="slider">
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {data?.map((item, index) => (
          <img key={index} src={process.env.REACT_APP_UPLOAD_URL + getImageUrl(item)} alt="" />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;