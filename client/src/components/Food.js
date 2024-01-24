import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartAction";

export default function Food({ food }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [quentity, setquantity] = useState(1);

  const dispatch = useDispatch();
  function addtoCart() {
    dispatch(addToCart(food, quentity));
  }

  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <div className="flex-container">
          <div className="w-100">
            <h1>{food.name}</h1>
          </div>

          <div className="w-100 m-1">
            <h1>
              <button className="btn-category">{food.category}</button>
            </h1>
          </div>
        </div>

        <img
          src={food.image}
          className="img-fluid"
          alt=""
          style={{ height: "200px", width: "200px" }}
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <h1>Price : {food.price * quentity}</h1>
        </div>

        <div className="w-100 m-1">
          <select
            value={quentity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="m-1 w-100 d-flex justify-content-left">
        <button className="btn" onClick={addtoCart}>
          Add To Cart
        </button>
      </div>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{food.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={food.image}
            className="img-fluid"
            alt=""
            style={{ height: "400px" }}
          />

          <p>{food.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
