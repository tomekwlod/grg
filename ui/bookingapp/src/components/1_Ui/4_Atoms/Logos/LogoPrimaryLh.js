import { useTheme } from "@emotion/react";
import React from "react";
import { Box } from "../../";

export const LogoPrimaryLh = ({ reverse, ...props }) => {
  const { colors } = useTheme();
  const primary = reverse ? "white" : colors.lh.primary;
  const accent = colors.lh.accent;
  return (
    <Box
      as="svg"
      display="flex"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 265.5 39"
      {...props}
    >
      <g id="LH_1_">
        <path
          id="Fill-1_1_"
          fill={primary}
          d="M64.8,30.3H52.5c-0.7,0-1-0.2-1-1V8.7c0-0.6,0.3-0.9,0.9-0.9h3.3c0.7,0,1,0.2,1,1V26H65
		c0.6,0,0.9,0.4,0.9,0.9v2.5C65.8,30.1,65.4,30.3,64.8,30.3"
        />
        <path
          id="Fill-3_1_"
          fill={primary}
          d="M82.3,15.4l-6.4,16.7c-1.5,3.9-3.4,5.3-7.7,5.3c-0.7,0-1.3-0.1-1.9-0.2
		c-0.4-0.1-0.6-0.3-0.6-0.6c0-0.1,0-0.3,0-0.4l0.3-2c0.1-0.6,0.3-0.7,0.6-0.7h0.1h0.1c0.4,0,0.8,0.1,1.2,0.1c2.2,0,2.8-0.7,3.5-2.1
		l0.5-1l-6-15.1c0-0.1-0.1-0.2-0.1-0.3c0-0.3,0.3-0.6,0.6-0.6h3.9c0.6,0,0.8,0.3,1,0.6l3.1,9.6l2.9-9.4c0.2-0.7,0.6-0.9,1.2-0.9h3.3
		c0.3,0,0.6,0.2,0.6,0.6C82.4,15.2,82.3,15.3,82.3,15.4"
        />
        <path
          id="Fill-5_1_"
          fill={primary}
          d="M107.3,30.3h-2.9c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.5,0.6-3.3,1.4
		v6.4v3.3c0,0.7-0.3,0.9-0.9,0.9h-2.7c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.2,0.6-3.1,1.4v6.4v3.3
		c0,0.7-0.3,0.9-0.9,0.9H85c-0.7,0-1-0.2-1-0.9v-3.3v-11c0-0.6,0.4-0.8,0.9-0.8h2.7c0.6,0,0.9,0.2,0.9,0.7l0.1,0.6
		c1.3-1.1,3-1.8,4.6-1.8c2.2,0,3.4,1.1,4.1,2.2c1.5-1.5,3.6-2.2,5.6-2.2c2.5,0,4.1,1.4,4.7,2.8c0.6,1.3,0.6,2.8,0.6,5.1v4.2v3.3
		C108.2,30.1,107.9,30.3,107.3,30.3"
        />
        <path
          id="Fill-7_1_"
          fill={primary}
          d="M121.1,19.2c-0.6-0.8-1.4-1.2-2.3-1.2s-2.1,0.6-2.7,1.2v6.6c0.6,0.6,1.6,1,2.6,1
		c0.9,0,1.8-0.5,2.2-1.1c0.6-0.9,0.9-1.9,0.9-3.4C121.9,21,121.6,19.9,121.1,19.2 M124.9,28.5c-1.2,1.4-2.9,2.3-5,2.3
		c-1.4,0-2.8-0.5-3.6-1.3v6.9c0,0.7-0.4,1-1,1h-3c-0.6,0-0.9-0.3-0.9-1v-21c0-0.6,0.3-0.9,0.9-0.9h2.5c0.6,0,0.9,0.2,1,0.7l0.1,0.6
		c0.8-0.9,2.6-1.8,4.3-1.8c2.2,0,3.7,0.9,4.7,2c1.4,1.5,2.1,3.8,2.1,6.1C126.9,24.7,126.2,26.9,124.9,28.5"
        />
        <path
          id="Fill-9_1_"
          fill={primary}
          d="M143.5,30.3h-3.8c-0.5,0-0.6-0.1-0.6-0.6v-9c0-1.4-0.4-2.3-1.9-2.3c-1.1,0-2.5,0.5-3.4,1.3v10
		c0,0.6-0.1,0.6-0.6,0.6h-3.7c-0.4,0-0.5-0.1-0.5-0.6V8.4c0-0.7,0.3-0.9,0.8-0.9l3-0.4c0.2,0,0.4,0,0.5,0c0.4,0,0.6,0.2,0.6,0.7v8
		c1.3-1.1,3.3-1.6,5-1.6c3.5,0,5.2,2.3,5.2,5.8v9.8C144.1,30.2,144,30.3,143.5,30.3"
        />
        <path
          id="Fill-11_1_"
          fill={primary}
          d="M154.4,17.9c-2.4,0-3.2,2.1-3.2,4.4c0,2.4,0.7,4.6,3.1,4.6s3.2-2.1,3.2-4.5
		S156.8,17.9,154.4,17.9 M154.2,30.7c-5.5,0-8.1-3.5-8.1-8.4c0-4.8,3-8.3,8.3-8.3c5.5,0,8.1,3.5,8.1,8.4
		C162.5,27.2,159.5,30.7,154.2,30.7"
        />
        <path
          id="Fill-13_1_"
          fill={primary}
          d="M188,30.3h-3c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.5,0.6-3.3,1.4v6.4
		v3.3c0,0.7-0.3,0.9-0.9,0.9h-2.7c-0.7,0-1-0.2-1-0.9v-3.3v-5.4c0-1.3-0.3-2.3-1.8-2.3c-1.1,0-2.2,0.6-3.1,1.4v6.4v3.3
		c0,0.7-0.3,0.9-0.9,0.9h-2.9c-0.7,0-1-0.2-1-0.9v-3.3v-11c0-0.6,0.4-0.8,0.9-0.8h2.7c0.6,0,0.9,0.2,0.9,0.7l0.1,0.6
		c1.3-1.1,3-1.8,4.6-1.8c2.2,0,3.4,1.1,4.1,2.2c1.5-1.5,3.6-2.2,5.6-2.2c2.5,0,4.1,1.4,4.7,2.8c0.6,1.3,0.6,2.8,0.6,5.1v4.2v3.3
		C188.9,30.1,188.6,30.3,188,30.3"
        />
        <path
          id="Fill-15_1_"
          fill={primary}
          d="M201.7,19.2c-0.6-0.5-1.7-1.1-2.6-1.1c-1.6,0-3.1,1.3-3.1,4.3c0,2,0.5,4.4,3,4.4
		c1.2,0,2.3-0.9,2.7-1.4L201.7,19.2L201.7,19.2z M207.3,30.3h-1.7c-1.9,0-2.7-0.6-3.1-1.5h-0.1c-0.9,1-3,1.9-4.5,1.9
		c-4.7,0-6.9-3.7-6.9-8c0-5.7,3.6-8.7,7.1-8.7c1.8,0,3.3,0.8,4,1.8l0.1-0.7c0-0.4,0.3-0.6,0.7-0.6h2.9c0.5,0,0.8,0.3,0.8,0.8v11.2
		c0,0.3,0.1,0.6,0.5,0.6h0.3c0.5,0,0.7,0.2,0.7,0.6v1.9C208,30.1,207.7,30.3,207.3,30.3z"
        />
        <path
          id="Fill-17_1_"
          fill={accent}
          d="M227.6,30.3h-3.2c-0.7,0-1-0.2-1-0.9V21h-8.2v8.4c0,0.7-0.3,0.9-0.9,0.9H211
		c-0.7,0-1-0.2-1-0.9V8.6c0-0.7,0.4-0.8,1-0.8h3.2c0.6,0,0.9,0.2,0.9,0.8v8.2h8.2V8.6c0-0.7,0.4-0.8,1-0.8h3.2
		c0.6,0,0.9,0.2,0.9,0.8v20.7C228.5,30.1,228.2,30.3,227.6,30.3"
        />
        <path
          id="Fill-19_1_"
          fill={accent}
          d="M245.9,30.3h-2.6c-0.5,0-0.8-0.2-0.9-0.6l-0.1-0.7c-1.5,1.2-3.3,1.8-5.2,1.8
		c-3.5,0-5.1-2.3-5.1-5.8v-9.6c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v8.8c0,1.3,0.4,2.3,1.9,2.3c1.1,0,2.4-0.5,3.3-1.3
		v-9.8c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v13.9C246.9,30.1,246.7,30.3,245.9,30.3"
        />
        <g id="Group-23_1_" transform="translate(250.000000, 7.000000)">
          <g id="Clip-22_1_"></g>
          <path
            id="Fill-21_1_"
            fill={accent}
            d="M7.6,11.2c-1,0-1.9,0.5-2.7,1v6.3c0.7,0.6,1.7,1.2,2.6,1.2c2.5,0,3-2.2,3-4.3
			C10.5,13.5,10,11.2,7.6,11.2 M8.4,23.7c-1.3,0-3.1-0.8-4-1.7c-0.1,0.7-0.1,1.3-0.9,1.3H0.9c-0.7,0-0.9-0.3-0.9-1V1.5
			c0-0.6,0.2-0.9,0.8-1L4,0h0.2c0.5,0,0.6,0.3,0.6,0.7v7.7c1-0.8,2.5-1.4,4-1.4C10.7,7,12,7.7,13,8.6c1.7,1.6,2.5,4.1,2.5,6.8
			C15.5,20,13.2,23.7,8.4,23.7"
          />
        </g>
        <path
          id="Fill-24_1_"
          fill={accent}
          d="M3,19.5c0-5.1,2.3-9.7,6-12.7v12.7c0,3.3,2.7,6,6,6s6-2.7,6-6c0-1.7,1.3-3,3-3s3,1.3,3,3v14.7
		c-2.3,1.2-4.8,1.8-7.5,1.8C10.4,36,3,28.6,3,19.5 M36,19.5c0,5.1-2.3,9.7-6,12.7V19.5c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,1.7-1.3,3-3,3
		s-3-1.3-3-3V4.8C14.3,3.7,16.8,3,19.5,3C28.6,3,36,10.4,36,19.5 M39,19.5C39,8.7,30.3,0,19.5,0C16,0,12.8,0.9,9.9,2.5
		C9.8,2.6,9.7,2.7,9.6,2.8C3.8,6.2,0,12.4,0,19.5C0,30.3,8.7,39,19.5,39c3.5,0,6.7-0.9,9.6-2.5c0.1-0.1,0.3-0.1,0.4-0.2
		C35.2,32.8,39,26.6,39,19.5"
        />
      </g>
    </Box>
  );
};