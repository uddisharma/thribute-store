export const convertImage = (w: any, h: any) => `
<svg width="${w / 2}" height="${
  h / 2
}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w / 2}" height="${h / 2}" fill="#333" />
  <rect id="r" width="${w / 2}" height="${h / 2}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w / 2}" to="${
  w / 2
}" dur="1s" repeatCount="indefinite" />
</svg>`;

export const toBase64 = (str: any) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function getFirstProductPhoto(orderItems: any) {
  if (orderItems?.length === 0) {
    return null;
  }

  const firstProduct = orderItems[0];

  if (
    !firstProduct?.productId ||
    firstProduct?.productId?.images?.length === 0
  ) {
    return null;
  }

  return firstProduct?.productId?.images[0];
}
