import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamousFoods } from "../actions/orderAction";

export default function StatsScreen() {
  const dispatch = useDispatch();
  const famousfoodstate = useSelector((state) => state.getFamousDishesReducer);
  const { famousFood, error, loading } = famousfoodstate || {};

  useEffect(() => {
    dispatch(getFamousFoods());
  }, []);

 

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <>
          <Card className="m-1">
            <Card.Body>
              <h1>Most famous main dish</h1>
              {famousFood.data.mostSoldMainDish.name} : {famousFood.data.mostSoldMainDish.quantity}
            </Card.Body>
          </Card>

          <Card className="m-1">
            <Card.Body>
              <h1>Most famous side dish</h1>
              {famousFood.data.mostSoldSideDish.name} : {famousFood.data.mostSoldSideDish.quantity}
            </Card.Body>
          </Card>
        </>
      )}

      <Card className="m-1">
        <Card.Body>
          <div className="">Daily sales revenue : //</div>
        </Card.Body>
      </Card>
    </div>
  );
}
