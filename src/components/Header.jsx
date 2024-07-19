import { useState } from "react";
import "../css/Header.css";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import logo from '../images/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";

function Header() {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    const root = document.querySelector("body");
    setTheme(!theme);
    if (theme) {
      root.style.backgroundColor = "black";
      root.style.color = "white";
    } else {
      root.style.backgroundColor = "white";
      root.style.color = "black";
    }
  };

  const navigate = useNavigate();

  const {products} = useSelector((store)=>store.basket);

  const dispatch = useDispatch();

  return (
    <div className="container">
      <div
        className="flex-row"
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/")}>
        <img className="logo" src={logo} alt="" />
        <p className="logo-text">E-Commerce</p>
      </div>
      <div className="flex-row">
        <input type="text" className="search-input" placeholder="Search..." />
        <div>
          {theme ? (
            <FaMoon className="icon" onClick={changeTheme} />
          ) : (
            <CiLight className="icon" onClick={changeTheme} />
          )}
          <Badge badgeContent={products.length} color="error" style={{ marginTop:"-15px" }} onClick={()=>dispatch(setDrawer())}>
            <CiShoppingBasket className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
