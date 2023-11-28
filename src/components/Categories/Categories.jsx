import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Categories = () => {

  const { data, loading, error } = useFetch(`/categories?populate=*`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const thirdLength = Math.ceil(data?.length / 3);
  // console.log(thirdLength)
  const firstThirdData = data?.slice(0, 2);
  const secondThirdData = data?.slice(2, 3);
  const lastThirdData = data?.slice(3, 5);

  return (
    <div className="categories">
      <div className="col">
        {firstThirdData?.map((item) => (
          <div className="row" key={item?.id}>
            <img
              src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.img?.data?.attributes?.url }
              alt=""
            />
            <button>
              <Link className="link" to={`/products/${item?.id}`}>
                {item?.attributes?.title}
              </Link>
            </button>
          </div>
        ))}
      </div>
      <div className="col">
        {secondThirdData?.map((item) => (
          <div className="row" key={item?.id}>
            <img
              src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.img?.data?.attributes?.url }
              alt=""
            />
            <button>
              <Link className="link" to={`/products/${item?.id}`}>
                {item?.attributes?.title}
              </Link>
            </button>
          </div>
        ))}
      </div>
      <div className="col col-1">
        {lastThirdData?.map((item) => (
          <div className="row" key={item?.id}>
            <img
              src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.img?.data?.attributes?.url }
              alt=""
            />
            <button>
              <Link className="link" to={`/products/${item?.id}`}>
                {item?.attributes?.title}
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;