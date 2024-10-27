import React from "react";

const OrderNote = ({ note, setCheckOutData, checkoutData }: any) => {
  return (
    <div>
      <div className="infor">
        <div className="row">
          <div className="col-12 mt-3">
            <textarea
              value={note}
              onChange={(e) => {
                setCheckOutData({
                  ...checkoutData,
                  note: e.target.value,
                });
              }}
              className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2"
              id="order-note"
              placeholder="Order Note"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNote;
