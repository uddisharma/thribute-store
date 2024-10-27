"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Toast from "../ui/toast";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      <div className={`newsletter-block bg-green py-7`}>
        <div className="container flex max-lg:flex-col items-center lg:justify-between justify-center gap-8 gap-y-4">
          <div className="text-content">
            <div className="heading3 max-lg:text-center">
              Sign up and get more discount
            </div>
            <div className="mt-2 max-lg:text-center">
              Sign up for early sale access, new in, promotions and more
            </div>
          </div>
          <div className="input-block xl:w-5/12 md:w-1/2 sm:w-3/5 w-full h-[52px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setEmail("");
                  toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } `}
                    >
                      <Toast type="success" message="Thanks for subscribing!" />
                    </div>
                  ));
                }, 2000);
              }}
              className="w-full h-full relative"
            >
              <input
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your e-mail"
                className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
                required
              />
              <button
                disabled={loading}
                className="button-main bg-green text-black absolute top-1 bottom-1 right-1 flex items-center justify-center"
              >
                {loading ? "Loading..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
