import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import RouterConfig from "./config/RouterConfig";
import PageContainer from "./container/PageContainer";
import Drawer from "@mui/material/Drawer";
import { calculateAmount, deleteProduct, setDrawer } from "./redux/slices/basketSlice";
import { useEffect } from "react";

function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateAmount());
  },[]);

  const removeProdut = (productId) =>{
    dispatch(deleteProduct(productId));
    dispatch(calculateAmount());
  }

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className="drawer" anchor="right" open={drawer} onClose={()=>dispatch(setDrawer())}>
          {
            products && products.map((product)=>{
              return(
                  <div className="list-content" key={product.id}>
                    <img src={product.image} width={50} height={50} alt="" className="list-image"/>
                    <p className="list-title">{product.title}&nbsp;({product.count})</p>&nbsp;
                    <p className="list-price">{product.price}$</p>
                    <button className="del-btn" onClick={()=>dispatch(removeProdut(product.id))}>delete</button>
                  </div>
              )
            })
          }
          <div className="list-amount">
            <p>Total: {totalAmount}$</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
