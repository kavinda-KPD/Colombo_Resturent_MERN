import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Food from "../components/Food";
import { getAllFoods } from "../actions/foodActions";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const foodsstate = useSelector((state) => state.getAllFoodsReducers);
  const { foods, error, loading } = foodsstate;

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);

  console.log(foods);


  return (
    <div>
      <div className="row justify-content-center">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          foods.map((food) => {
            return (
              <div className="col-md-3 m-3"  key={food._id}>
                <div>
                  <Food food={food} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
