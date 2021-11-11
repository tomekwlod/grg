import * as React from "react";

export const Prognosis = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 75 65"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="#00ADBA">
          <path
            d="M5 63h9.747V42.399H5zM23.417 63h9.747V24h-9.747zM41.836 63h9.747V40.427h-9.747zM60.253 63H70V31.885h-9.747z" />
        </g>
        <path stroke="#00ADBA" d="M15 20l9-9M33 11l9 8M52 21l7-3" />
        <g stroke="#492462">
          <path d="M9.842 19.689a5.623 5.623 0 00-5.627 5.618 5.623 5.623 0 005.627 5.618 5.624 5.624 0 005.63-5.618 5.624 5.624 0 00-5.63-5.618zM28.281 1a5.623 5.623 0 00-5.628 5.617 5.623 5.623 0 005.628 5.619 5.623 5.623 0 005.62
8-5.619A5.623 5.623 0 0028.281 1zM46.72 17.715a5.623 5.623 0 00-5.628 5.617c0 3.104 2.52 5.62 5.627 5.62a5.624 5.624 0 005.629-5.62 5.623 5.623 0 00-5.629-5.617zM65.158 9.215a5.623 5.623 0 00-5.629 5.618 5.623 5.623 0 005.63 5.618 5
.623 5.623 0 005.627-5.618 5.623 5.623 0 00-5.628-5.618zM1 63.426h73" />
        </g>
      </g>
    </svg>
  );
}