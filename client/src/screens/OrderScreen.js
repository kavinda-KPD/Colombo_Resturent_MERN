import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderAction";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getAllOrderReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  console.log(orders);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "35px" }}>Our Oders</h2>
      </div>
      <div className="row">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          orders.map((order) => {
            return (
              <div
                className="m-2"
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="flex-container">
                  <div className="text-left w-100 m-1">
                    {order.orderItems.map((item, index) => {
                      return (
                        <div>
                          <h1>
                            {item.name} * {item.quantity}
                          </h1>
                        </div>
                      );
                    })}
                 
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
