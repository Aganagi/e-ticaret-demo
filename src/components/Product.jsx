import React from "react";
import "../css/Product.css";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { id, price, image, title, description } = product;
  const navigate = useNavigate();
  return (
    <div className="card">
      <img className="img" src={image} alt="image" />
      <div>
        <div className="title-container">
          <p className="text-center title">{title}</p>
        </div>
        <h4 className="text-center">{price}&nbsp;$</h4>
      </div>
      <div className="btn-content">
        <button className="btn-details" onClick={()=>navigate("/product-details/" + id)}>Details</button>
      </div>
    </div>
  );
}

export default Product;
