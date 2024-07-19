import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { BiDollar } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateAmount } from "../redux/slices/basketSlice";
import "../css/ProductDetails.css";
import { getProductById } from "../redux/slices/productSlice";

function ProductDetails() {

  const { id } = useParams();

  const { products, selectedProduct } = useSelector((store) => store.product);

  const { price, image, title, description } = selectedProduct;

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
    return 0;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsById();
  }, []);

  const getProductsById = () => {
    products &&
      products.map((product) => {
        if (product.id === id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const addBasket = () => {
    const payload = {
      id,
      price,
      title,
      description,
      image,
      count,
    };
    dispatch(addToBasket(payload));
    dispatch(calculateAmount());
  };

  return (
    <div className="product-container">
      <div className="image-content">
        <img src={image} alt="" className="content-image" />
      </div>
      <div>
        <h1 className="product-title">{title}</h1>
        <p className="product-desc">{description}</p>
        <div className="price-div">
          <h1 className="price-list">{price}</h1>
          <BiDollar className="dollar" />
        </div>
        <div className="price-div">
          <CiCircleMinus className="minus" onClick={decrement} />
          <span className="count">{count}</span>
          <CiCirclePlus className="plus" onClick={increment} />
        </div>
        <div>
          <button className="add-btn" onClick={addBasket}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
