import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import Card from "react-bootstrap/Card";

export default function CartScreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;

  const dispatch = useDispatch();

  //   function sendToKichen() {
  //     const mainItems = cartItems.filter((item) => item.category === "Main");
  //     const sideItems = cartItems.filter((item) => item.category === "Side");
  //     const dessertItems = cartItems.filter(
  //       (item) => item.category === "dessert"
  //     );

  //     console.log(cartItems,mainItems,sideItems,dessertItems);

  //     if (dessertItems.length > 0 && (sideItems.length > 0 || mainItems.length === 0)) {
  //   dispatch(placeOrder());
  // } else {
  //   if (mainItems.length === 0) {
  //     alert("You can't send to kitchen. Please add a Main item.");
  //   } else if (sideItems.length === 0) {
  //     alert("You can't send to kitchen. Please add Sub items also.");
  //   }
  // }
  //  }

  function sendToKichen() {

    const mainItems = cartItems.filter((item) => item.category === "Main");
    const sideItems = cartItems.filter((item) => item.category === "Side");
    const desertItems = cartItems.filter((item) => item.category === "desert");

    if (desertItems.length>0 && mainItems.length===0 && sideItems.length === 0) {
      dispatch(placeOrder());
    } else if (sideItems.length === 0) {
      alert("You can't send to kitchen. Please add Sub items also.");
    } else if (mainItems.length === 0) {
      alert("You can't send to kitchen. Please add Main items also.");
    }else {
      dispatch(placeOrder());
    }
  }

  function clearCart() {
    // Delete all local storage data
    localStorage.clear();

    // Redirect to the "home" page
    window.location.href = "/";
  }

  return (
      <div>

          <div
              style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              }}
          >
              <h2 style={{fontSize: "35px"}}>Order Cart Screen</h2>
          </div>

          <div className="row justify-content-center">
              <Card className="col-md-3 m-3">
                  <Card.Body>
                      <h3 className="row justify-content-center">Selected Items</h3>
                      <hr />

                      {cartItems.map((item) => {
                          return (
                              <div className="flex-container">
                                  <div className="text-left m-1 w-50">
                                      <h1>Name : {item.name}</h1>
                                      <h1>Quantity : {item.quantity}</h1>
                                      <hr/>
                                  </div>

                                  <div className="m-1 w-50 d-flex justify-content-end">
                                      <img
                                          src={item.image}
                                          className="img-fluid"
                                          alt=""
                                          style={{height: "80px", width: "80px"}}
                                      />
                                  </div>
                              </div>

                          );
                      })}

                  </Card.Body>
              </Card>

              <Card className="col-md-3 m-3 border-0">
                  <Card.Body>
                      <h1>Navigate Buttons</h1>

                      <button className="btn m-1" onClick={sendToKichen}>
                          Send To Kichen
                      </button>

                      <button className="btn m-1" onClick={clearCart}>
                          Clear Cart
                      </button>

                  </Card.Body>
              </Card>
          </div>

      </div>
  );
}
