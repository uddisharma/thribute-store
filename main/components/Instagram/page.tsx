import React from "react";

const InstagramPost = ({ id }: any) => {
  return (
    <div
      style={{
        overflowY: "hidden",
        maxWidth: "100%",
        maxHeight: "100%",
        marginTop: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="heading3 text-center my-5">Instagram View</div>
      <iframe
        src={`https://www.instagram.com/p/${id}/embed`}
        width="100%"
        height="550px"
      ></iframe>
    </div>
  );
};

export default InstagramPost;
