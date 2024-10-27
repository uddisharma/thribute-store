import React from "react";

const Rates = ({ discount, shipping, totalCart }: any) => {
  return (
    <div>
      <div className="discount-block py-5 flex justify-between border-b border-line">
        <div className="text-title">Subtotal</div>
        <div className="text-title">
          ₹<span className="discount">{totalCart}</span>
          <span>.00</span>
        </div>
      </div>
      <div className="ship-block py-5 flex justify-between border-b border-line">
        <div className="text-title">Shipping</div>
        <div className="text-title">
          {Number(shipping) === 0 ? "Not Calculated" : `₹${shipping}.00`}
        </div>
      </div>
      <div className="discount-block py-5 flex justify-between border-b border-line">
        <div className="text-title">Discounts</div>
        <div className="text-title">
          -₹<span className="discount">{discount}</span>
          <span>.00</span>
        </div>
      </div>

      <div className="total-cart-block pt-5 flex justify-between">
        <div className="heading5">Total</div>
        <div className="heading5 total-cart">
          ₹{totalCart - Number(discount) + Number(shipping)}.00
        </div>
      </div>
    </div>
  );
};

export default Rates;
