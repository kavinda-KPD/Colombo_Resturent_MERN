import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getFamousFoods, getRevenue , getWeekRevenue} from "../actions/orderAction";
import Table from 'react-bootstrap/Table';

export default function StatsScreen() {
  const dispatch = useDispatch();
  const famousfoodstate = useSelector((state) => state.getFamousDishesReducer);
  const { famousFood, fferror, ffloading } = famousfoodstate || {};

  const revenueState = useSelector((state) => state.getRevenueReducer);
  const { revenue, rerror, rloading } = revenueState || {};

  const weekRevenueState = useSelector((state) => state.getWeekRevenueReducer);
  const { wrevenue, wrerror, wrloading } = weekRevenueState || {};

  useEffect(() => {
    dispatch(getFamousFoods());
    dispatch(getRevenue());
    dispatch(getWeekRevenue());
  }, []);

  if (!famousFood) {
    return <div>Loading...</div>;
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
        <h2 style={{ fontSize: "35px" }}>Restuarent Report</h2>
      </div>

      {ffloading ? (
        <h1>Loading...</h1>
      ) : fferror ? (
        <h1>Something went wrong</h1>
      ) : (
        <div className="row justify-content-center">
          <Card className="col-md-3 m-3">
            <Card.Body>
              <h1>Most famous main dish</h1>
              {famousFood && famousFood.data.mostSoldMainDish.name} :{" "}
              {famousFood && famousFood.data.mostSoldMainDish.quantity}
            </Card.Body>
          </Card>

          <Card className="col-md-3 m-3">
            <Card.Body>
              <h1>Most famous side dish</h1>
              {famousFood && famousFood.data.mostSoldSideDish.name} :{" "}
              {famousFood && famousFood.data.mostSoldSideDish.quantity}
              <p>
                {" "}
                {famousFood && famousFood.data.topMainDish[0].name} is most going Main Dish
                with {famousFood && famousFood.data.mostSoldSideDish.name}
              </p>
            </Card.Body>
          </Card>
        </div>
      )}

      <div className="row justify-content-center">
        <Card className="col-md-3 m-3">
          <Card.Body>
            <h1>Today Total Revenue </h1>
            Rs: {revenue.data.totalPrice}
          </Card.Body>
        </Card>

        <Card className="col-md-3 m-3">
          <Card.Body>
            <h1>Today Revenue Category Wise</h1>
            From Main dishes: Rs. {revenue && revenue.data.categoryTotals.Main} <br />
            From Side dishes: Rs. {revenue && revenue.data.categoryTotals.Side} <br />
            From Deserts: Rs. {revenue && revenue.data.categoryTotals.desert}
          </Card.Body>
        </Card>
      </div>

      <div className="row justify-content-center">
        <Card className="col-md-3 m-3">
          <Card.Body>
            <h1>Week Revenue Report</h1>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Main Dishes</th>
          <th>Side Dishes</th>
          <th>Desert</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
    {wrevenue.data && wrevenue.data.map((dayData, index) => (
      <tr key={index}>
        <td>{dayData._id}</td>
        <td>{dayData.categories.find(c => c.category === "Main")?.totalPrice || 0}</td>
        <td>{dayData.categories.find(c => c.category === "Side")?.totalPrice || 0}</td>
        <td>{dayData.categories.find(c => c.category === "desert")?.totalPrice || 0}</td>
        <td>{dayData.totalPrice}</td>
      </tr>
    ))}
  </tbody>
    </Table>
    

        </Card.Body>
      </Card>
      </div>
    </div>
  );
}
