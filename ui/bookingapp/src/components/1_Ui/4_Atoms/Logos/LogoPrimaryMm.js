import { useTheme } from "@emotion/react";
import React from "react";
import { Box } from "../../";

export const LogoPrimaryMm = ({ reverse, ...props }) => {
  const { colors } = useTheme();
  const primary = reverse ? "white" : colors.mm.primary;
  const accent = colors.mm.accent;
  return (
    <Box
      as="svg"
      display="flex"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 355.2 39"
      {...props}
    >
      <g id="MM_1_">
        <path
          id="Fill-1_1_"
          fill={primary}
          d="M75.4,30.3h-3.2c-0.8,0-1-0.4-1.1-1.3l-0.4-11.1h-0.1l-4.9,11.8c-0.3,0.7-0.7,0.7-1.1,0.7h-1.2
		c-0.6,0-1-0.1-1.3-0.7l-5.6-11.7h-0.1l-0.2,11.5c0,0.9-0.4,1-1.1,1h-2.7c-0.7,0-1.1-0.3-1.1-0.9v-0.1l0.9-20.5c0-0.8,0.4-1,1-1h2.3
		c0.7,0,1,0.3,1.3,0.9l7.2,14.7h0.1l6.5-14.7c0.3-0.6,0.6-0.9,1.3-0.9h2.3c0.7,0,0.9,0.2,0.9,0.8l1.1,20.7v0.1
		C76.3,30,76,30.3,75.4,30.3"
        />
        <path
          id="Fill-3_1_"
          fill={primary}
          d="M93.5,30.3h-2.6c-0.5,0-0.8-0.2-0.9-0.6L89.9,29c-1.5,1.2-3.3,1.8-5.2,1.8
		c-3.5,0-5.1-2.3-5.1-5.8v-9.6c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v8.8c0,1.3,0.4,2.3,1.8,2.3c1.1,0,2.4-0.5,3.3-1.3
		v-9.8c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v13.9C94.5,30.1,94.3,30.3,93.5,30.3"
        />
        <path
          id="Fill-5_1_"
          fill={primary}
          d="M101.6,30.3h-3.2c-0.5,0-0.9-0.3-0.9-0.9V8.4c0-0.7,0.3-0.8,0.8-0.9l3.1-0.4h0.1h0.2
		c0.5,0,0.7,0.3,0.7,0.8v21.6C102.5,30,102.1,30.3,101.6,30.3"
        />
        <path
          id="Fill-7_1_"
          fill={primary}
          d="M115.7,29.9c-1.2,0.6-2.7,0.8-4.2,0.8c-1.8,0-3.3-0.4-4.2-1.5c-1-1.2-1.1-2.6-1.1-5.2v-6.2H105
		c-0.8,0-0.9-0.2-0.9-1.1v-1.4c0-0.5,0.3-0.8,0.7-0.8h1.5v-3.4c0-0.6,0.4-0.8,1-0.8l2.9-0.4h0.2c0.5,0,0.7,0.3,0.7,0.8v3.8h3.5
		c0.5,0,0.8,0.2,0.8,0.7v1.9c0,0.5-0.3,0.7-0.8,0.7h-3.5v6.3c0,1.7,0.2,2.7,1.7,2.7c0.8,0,1.4-0.2,2.1-0.4c0.2-0.1,0.3-0.1,0.5-0.1
		c0.3,0,0.4,0.2,0.5,0.5l0.4,2.1c0,0.1,0,0.2,0,0.3C116.3,29.6,116.1,29.7,115.7,29.9"
        />
        <path
          id="Fill-9_1_"
          fill={primary}
          d="M122,30.3h-2.9c-0.7,0-1-0.2-1-0.9v-14c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v14
		C123,30,122.7,30.3,122,30.3 M120.5,12.6c-1.2,0-2.6-0.9-2.6-2.4c0-1.6,1.3-2.5,2.6-2.5c1.3,0,2.6,0.9,2.6,2.5
		S121.8,12.6,120.5,12.6"
        />
        <path
          id="Fill-11_1_"
          fill={primary}
          d="M136,19.2c-0.6-0.8-1.4-1.2-2.3-1.2c-0.9,0-2.1,0.6-2.7,1.2v6.6c0.6,0.6,1.6,1,2.6,1
		s1.8-0.5,2.2-1.1c0.6-0.9,0.9-1.9,0.9-3.4C136.8,21,136.5,19.9,136,19.2 M139.7,28.5c-1.2,1.4-2.9,2.3-5,2.3
		c-1.4,0-2.8-0.5-3.6-1.3v6.9c0,0.7-0.4,1-1,1h-3c-0.6,0-0.9-0.3-0.9-1v-21c0-0.6,0.3-0.9,0.9-0.9h2.5c0.6,0,0.9,0.2,1,0.7l0.1,0.6
		c0.8-0.9,2.6-1.8,4.3-1.8c2.2,0,3.7,0.9,4.7,2c1.4,1.5,2.1,3.8,2.1,6.1C141.8,24.7,141.1,26.9,139.7,28.5"
        />
        <path
          id="Fill-13_1_"
          fill={primary}
          d="M148,30.3h-3.1c-0.5,0-0.9-0.3-0.9-0.9V8.4c0-0.7,0.3-0.8,0.8-0.9l3.1-0.4h0.1h0.2
		c0.5,0,0.7,0.3,0.7,0.8v21.6C148.8,30,148.5,30.3,148,30.3"
        />
        <path
          id="Fill-15_1_"
          fill={primary}
          d="M159,17.8c-1.6,0-2.7,1.3-2.9,2.8h5.4C161.5,19.2,160.7,17.8,159,17.8 M165.1,23.7H156
		c0.4,2,2.2,3.2,4.2,3.2c1.4,0,2.8-0.3,4.1-0.8c0.1-0.1,0.3-0.1,0.4-0.1c0.3,0,0.5,0.2,0.5,0.5c0.1,0.6,0.6,2,0.6,2.5
		c0,0.4-0.3,0.6-0.6,0.7c-1.7,0.8-4,1.1-5.9,1.1c-5.2,0-8.4-3.2-8.4-8.4c0-5,3.4-8.3,8.4-8.3c2.1,0,3.8,0.8,5,2.1
		c1.6,1.7,1.9,4,1.9,6.2v0.4C166.3,23.5,165.9,23.7,165.1,23.7"
        />
        <path
          id="Fill-17_1_"
          fill={primary}
          d="M192.5,30.3h-3.2c-0.8,0-1-0.4-1.1-1.3l-0.4-11.1h-0.1l-4.9,11.8c-0.3,0.7-0.7,0.7-1.1,0.7
		h-1.2c-0.6,0-1-0.1-1.3-0.7l-5.6-11.7h-0.1l-0.2,11.5c0,0.9-0.4,1-1.1,1h-2.7c-0.7,0-1.1-0.3-1.1-0.9v-0.1l0.9-20.5
		c0-0.8,0.4-1,1-1h2.3c0.7,0,1,0.3,1.3,0.9l7.2,14.7h0.1l6.5-14.7c0.3-0.6,0.6-0.9,1.3-0.9h2.3c0.6,0,0.9,0.2,0.9,0.8l1.1,20.7v0.1
		C193.4,30,193.1,30.3,192.5,30.3"
        />
        <path
          id="Fill-19_1_"
          fill={primary}
          d="M211.7,15.4l-6.4,16.7c-1.5,3.9-3.4,5.3-7.7,5.3c-0.7,0-1.3-0.1-1.9-0.2
		c-0.4-0.1-0.6-0.3-0.6-0.6c0-0.1,0-0.3,0-0.4l0.3-2c0.1-0.6,0.3-0.7,0.6-0.7h0.1h0.1c0.4,0,0.8,0.1,1.2,0.1c2.2,0,2.8-0.7,3.5-2.1
		l0.5-1l-6-15.1c0-0.1-0.1-0.2-0.1-0.3c0-0.3,0.3-0.6,0.6-0.6h3.9c0.6,0,0.8,0.3,1,0.6l3.1,9.6l2.9-9.4c0.2-0.6,0.6-0.9,1.2-0.9h3.3
		c0.3,0,0.6,0.2,0.6,0.6C211.7,15.2,211.7,15.3,211.7,15.4"
        />
        <path
          id="Fill-21_1_"
          fill={primary}
          d="M219.7,17.8c-1.6,0-2.7,1.3-2.9,2.8h5.4C222.2,19.2,221.4,17.8,219.7,17.8 M225.8,23.7h-9.1
		c0.4,2,2.2,3.2,4.2,3.2c1.4,0,2.8-0.3,4.1-0.8c0.1-0.1,0.3-0.1,0.4-0.1c0.3,0,0.5,0.2,0.5,0.5c0.1,0.6,0.6,2,0.6,2.5
		c0,0.4-0.3,0.6-0.6,0.7c-1.7,0.8-4,1.1-5.9,1.1c-5.2,0-8.4-3.2-8.4-8.4c0-5,3.4-8.3,8.4-8.3c2.1,0,3.8,0.8,5,2.1
		c1.6,1.7,1.9,4,1.9,6.2v0.4C227,23.5,226.6,23.7,225.8,23.7"
        />
        <path
          id="Fill-23_1_"
          fill={primary}
          d="M232.9,30.3h-3.1c-0.5,0-0.9-0.3-0.9-0.9V8.4c0-0.7,0.3-0.8,0.8-0.9l3.1-0.4h0.1h0.2
		c0.5,0,0.7,0.3,0.7,0.8v21.6C233.7,30,233.4,30.3,232.9,30.3"
        />
        <path
          id="Fill-25_1_"
          fill={primary}
          d="M244.1,17.9c-2.4,0-3.2,2.1-3.2,4.4c0,2.4,0.7,4.6,3.1,4.6c2.4,0,3.2-2.1,3.2-4.5
		C247.2,20,246.5,17.9,244.1,17.9 M243.9,30.7c-5.5,0-8.1-3.5-8.1-8.4c0-4.8,3-8.3,8.3-8.3c5.5,0,8.1,3.5,8.1,8.4
		C252.2,27.2,249.2,30.7,243.9,30.7"
        />
        <path
          id="Fill-27_1_"
          fill={primary}
          d="M277.6,30.3h-2.9c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.5,0.6-3.3,1.4
		v6.4v3.3c0,0.7-0.3,0.9-0.9,0.9H265c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.2,0.6-3.1,1.4v6.4v3.3
		c0,0.7-0.3,0.9-0.9,0.9h-2.9c-0.7,0-1-0.2-1-0.9v-3.3V15.3c0-0.6,0.4-0.8,0.9-0.8h2.7c0.6,0,0.9,0.2,0.9,0.7l0.1,0.6
		c1.3-1.1,3-1.8,4.6-1.8c2.2,0,3.4,1.1,4.1,2.2c1.5-1.5,3.6-2.2,5.6-2.2c2.5,0,4.1,1.4,4.7,2.8c0.6,1.3,0.6,2.8,0.6,5.1v4.2v3.3
		C278.6,30.1,278.3,30.3,277.6,30.3"
        />
        <path
          id="Fill-29_1_"
          fill={primary}
          d="M291.4,19.2c-0.6-0.5-1.7-1.1-2.6-1.1c-1.6,0-3.1,1.3-3.1,4.3c0,2,0.5,4.4,3,4.4
		c1.2,0,2.3-0.9,2.7-1.4V19.2z M296.9,30.3h-1.7c-1.9,0-2.7-0.6-3.1-1.5H292c-0.9,1-3,1.9-4.5,1.9c-4.7,0-6.9-3.7-6.9-8
		c0-5.7,3.6-8.7,7.1-8.7c1.8,0,3.3,0.8,4,1.8l0.1-0.7c0-0.4,0.3-0.6,0.7-0.6h2.9c0.5,0,0.8,0.3,0.8,0.8v11.2c0,0.3,0.1,0.6,0.5,0.6
		h0.3c0.5,0,0.7,0.2,0.7,0.6v1.9C297.7,30.1,297.4,30.3,296.9,30.3z"
        />
        <path
          id="Fill-31_1_"
          fill={accent}
          d="M317.3,30.3H314c-0.7,0-1-0.2-1-0.9V21h-8.2v8.4c0,0.7-0.3,0.9-0.9,0.9h-3.2
		c-0.7,0-1-0.2-1-0.9V8.6c0-0.7,0.4-0.8,1-0.8h3.2c0.6,0,0.9,0.2,0.9,0.8v8.2h8.2V8.6c0-0.7,0.4-0.8,1-0.8h3.2
		c0.6,0,0.9,0.2,0.9,0.8v20.7C318.2,30.1,317.9,30.3,317.3,30.3"
        />
        <path
          id="Fill-33_1_"
          fill={accent}
          d="M335.6,30.3H333c-0.5,0-0.8-0.2-0.9-0.6L332,29c-1.5,1.2-3.3,1.8-5.2,1.8
		c-3.5,0-5.1-2.3-5.1-5.8v-9.6c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v8.8c0,1.3,0.4,2.3,1.9,2.3c1.1,0,2.4-0.5,3.3-1.3
		v-9.8c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v13.9C336.6,30.1,336.4,30.3,335.6,30.3"
        />
        <g id="Group-37_1_" transform="translate(339.000000, 7.000000)">
          <g id="Clip-36_1_"></g>
          <defs>
            <filter
              id="Adobe_OpacityMaskFilter"
              filterUnits="userSpaceOnUse"
              x="0.7"
              y="0"
              width="15.5"
              height="23.7"
            >
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
              />
            </filter>
          </defs>
          <mask
            maskUnits="userSpaceOnUse"
            x="0.7"
            y="0"
            width="15.5"
            height="23.7"
            id="mask-2_1_"
          >
            <g>
              <polygon
                id="path-1_1_"
                points="0.7,0 16.2,0 16.2,23.7 0.7,23.7 				"
              />
            </g>
          </mask>
          <path
            id="Fill-35_1_"
            fill={accent}
            d="M8.3,11.2c-1,0-1.9,0.5-2.7,1v6.3c0.7,0.6,1.7,1.2,2.6,1.2c2.5,0,3-2.2,3-4.3
			C11.2,13.5,10.7,11.2,8.3,11.2 M9,23.7c-1.3,0-3.1-0.8-4-1.7C5,22.8,5,23.3,4.1,23.3H1.6c-0.7,0-0.9-0.3-0.9-1V1.5
			c0-0.6,0.2-0.9,0.8-1L4.7,0c0.1,0,0.2,0,0.3,0c0.5,0,0.6,0.3,0.6,0.7v7.7c1-0.8,2.5-1.4,4-1.4c1.8,0,3.1,0.6,4.2,1.6
			c1.7,1.6,2.5,4.1,2.5,6.8C16.2,20,13.9,23.7,9,23.7"
          />
        </g>
        <path
          id="Fill-38_1_"
          fill={accent}
          d="M19.5,36C10.4,36,3,28.6,3,19.5S10.4,3,19.5,3S36,10.4,36,19.5S28.6,36,19.5,36 M19.5,0
		C8.7,0,0,8.7,0,19.5S8.7,39,19.5,39S39,30.3,39,19.5S30.3,0,19.5,0"
        />
        <path
          id="Fill-40_1_"
          fill={accent}
          d="M26.6,27.5L26.6,27.5c-2.5,1.5-3.9,0.5-6.3-1.4L20,25.8c0,0-0.1-0.1-0.1-0.1
		c-1-0.7-1.7-2.6-1.8-4.1c0.2-1.1,2-2.1,3.5-2.4c0,0,0.1,0,0.1,0l0.2,0c2.9-0.4,4.9-0.6,5.6,0.8C28.6,21.9,28.5,26.3,26.6,27.5
		 M30.2,18.5c-1.8-3.2-5.6-2.7-8.7-2.3l-0.3,0c-0.1,0-0.1,0-0.2,0c-2.8,0.5-5.6,2.4-5.9,5.1c0,0.1,0,0.1,0,0.2
		c0.1,2.3,1.1,5.2,3.1,6.6l0.2,0.2c1.5,1.3,3.5,2.9,6,2.9c1.1,0,2.4-0.3,3.8-1.2C31.7,27.9,31.8,21.5,30.2,18.5"
        />
      </g>
    </Box>
  );
};
