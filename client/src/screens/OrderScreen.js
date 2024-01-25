import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderAction";
import Card from "react-bootstrap/Card";

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
              <>
                <div className="row justify-content-center">
                  <Card className="col-md-6 m-3">
                    <Card.Body>
                    {order.orderItems.map((item, index) => {
                        return (
                          <div>
                            <h1>
                              {item.name} * {item.quantity}
                            </h1>
                          </div>
                        );
                      })}
                      Date: {order.createdAt}
                    </Card.Body>
                  </Card>
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
}
