import { useTheme } from "@emotion/react";
import React from "react";
import { Box } from "../../";

export const LogoPrimaryMds = ({ reverse, ...props }) => {
  const { colors } = useTheme();
  const primary = reverse ? "white" : colors.mds.primary;
  const accent = colors.mds.accent;
  return (
    <Box
      as="svg"
      display="flex"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 173.8 39"
      {...props}
    >
      <g>
        <g>
          <path
            fill={primary}
            d="M68.2,30.3c-0.8,0-1-0.4-1.1-1.3l-0.4-11.1h-0.1l-4.9,11.7c-0.3,0.6-0.7,0.7-1.1,0.7h-1.2
			c-0.6,0-1-0.1-1.3-0.7l-5.6-11.7h-0.1l-0.2,11.4c0,0.9-0.4,1-1.1,1h-2.6c-0.8,0-1.1-0.3-1.1-1l0.9-20.4c0-0.8,0.4-1,1-1h2.3
			c0.7,0,1,0.3,1.3,0.9l7.1,14.6h0.1l6.5-14.6c0.3-0.5,0.6-0.9,1.3-0.9h2.3c0.6,0,0.9,0.2,0.9,0.8l1.1,20.6c0,0.6-0.2,1-0.9,1H68.2z
			"
          />
          <path
            fill={primary}
            d="M84.4,30.3h-6.6c-0.6,0-1-0.2-1-1V8.9c0-0.7,0.2-1,1.1-1H83c8,0,13.2,2.7,13.2,11.3
			C96.2,26.9,91,30.3,84.4,30.3z M83.8,12.3h-1.8v13.6h2.3c3.2,0,6.5-1.4,6.5-6.8C90.7,14.3,88.3,12.3,83.8,12.3z"
          />
          <path
            fill={primary}
            d="M106.4,30.7c-2.1,0-4.7-0.4-6.8-1.2c-0.5-0.2-0.7-0.4-0.7-0.7c0-0.2,0.1-0.4,0.1-0.5l0.9-2.6
			c0.1-0.3,0.3-0.6,0.7-0.6c0.2,0,0.3,0,0.5,0.1c1.6,0.6,3.4,1,5,1c1.4,0,3.1-0.7,3.1-2.3c0-1.2-1-1.8-2-2.3l-4.3-2
			c-2.4-1.1-4-3.1-4-5.8c0-4.1,4.1-6.5,7.9-6.5c2.3,0,4.3,0.4,6.4,1.3c0.5,0.2,0.7,0.5,0.7,0.7c0,0.1-0.1,0.3-0.1,0.5l-1,2.5
			c-0.2,0.4-0.4,0.6-0.6,0.6c-0.2,0-0.4-0.1-0.6-0.2c-1.3-0.6-3.1-1-4.4-1c-1.3,0-2.7,0.5-2.7,2c0,1,1.3,1.7,2.1,2l3.7,1.7
			c2.6,1.2,4.2,2.9,4.2,5.8C114.5,28,110.8,30.7,106.4,30.7z"
          />
        </g>
        <g>
          <path
            fill={accent}
            d="M136.8,29.3c0,0.7-0.3,0.9-0.9,0.9h-3.2c-0.7,0-1-0.2-1-0.9V21h-8.2v8.3c0,0.7-0.3,0.9-0.9,0.9h-3.2
			c-0.7,0-1-0.2-1-0.9V8.7c0-0.6,0.4-0.8,1-0.8h3.2c0.6,0,0.9,0.2,0.9,0.8v8.1h8.2V8.7c0-0.6,0.4-0.8,1-0.8h3.2
			c0.6,0,0.9,0.2,0.9,0.8V29.3z"
          />
          <path
            fill={accent}
            d="M155.2,29.2c0,0.8-0.2,1.1-1,1.1h-2.6c-0.5,0-0.8-0.2-0.9-0.6l-0.1-0.7c-1.5,1.2-3.3,1.8-5.2,1.8
			c-3.5,0-5.1-2.3-5.1-5.8v-9.6c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8v8.7c0,1.3,0.4,2.3,1.8,2.3c1.1,0,2.4-0.5,3.3-1.3
			v-9.7c0-0.6,0.4-0.8,1-0.8h2.9c0.6,0,0.9,0.2,0.9,0.8V29.2z"
          />
          <path
            fill={accent}
            d="M166.7,30.7c-1.3,0-3.1-0.8-3.9-1.7c-0.1,0.7-0.1,1.3-0.9,1.3h-2.5c-0.7,0-0.9-0.3-0.9-1V8.5
			c0-0.6,0.2-0.9,0.8-1l3.4-0.5c0.5,0,0.6,0.3,0.6,0.7v7.7c1-0.8,2.5-1.4,3.9-1.4c1.8,0,3.1,0.6,4.2,1.6c1.7,1.6,2.5,4.1,2.5,6.8
			C173.8,26.9,171.5,30.7,166.7,30.7z M165.9,18.2c-1,0-1.9,0.5-2.7,1v6.3c0.7,0.6,1.7,1.2,2.6,1.2c2.5,0,2.9-2.2,2.9-4.2
			C168.8,20.5,168.3,18.2,165.9,18.2z"
          />
        </g>
        <g>
          <path
            fill={accent}
            d="M25.2,0.9C15-2.3,4,3.5,0.9,13.8C-2.3,24,3.5,35,13.8,38.1C24,41.3,35,35.5,38.1,25.2S35.5,4,25.2,0.9z
			 M35.2,24.3c0,0.1-0.1,0.2-0.1,0.3c-2.4-2.2-5.6-3.4-8.9-3.4c-0.2,0-0.4,0-0.6,0c0.9-1.5,1.5-3.2,1.7-5c0.4-3.4-0.5-6.7-2.6-9.3
			c-1.4-1.8-3.1-3.1-5.2-3.9c1.6,0,3.2,0.2,4.8,0.7C33,6.5,37.9,15.7,35.2,24.3z M5.3,13.6c0.3-2.5,1.6-4.8,3.6-6.4
			c1.7-1.3,3.8-2,5.9-2c0.4,0,0.8,0,1.2,0.1c2.5,0.3,4.8,1.6,6.4,3.6c1.6,2,2.3,4.5,2,7.1c-0.3,2.5-1.6,4.8-3.6,6.4
			c-2,1.6-4.5,2.3-7.1,2c-2.5-0.3-4.8-1.6-6.4-3.6C5.6,18.7,4.9,16.2,5.3,13.6z M3.1,19.6c0.4,1.1,1,2.1,1.7,3
			c2.1,2.7,5.1,4.3,8.4,4.8c0.5,0.1,1,0.1,1.5,0.1c0.3,0,0.6,0,0.9,0c-1.3,2.3-2,4.9-1.7,7.5C7.3,32.6,3.1,26.4,3.1,19.6z
			 M31.4,30.8c-0.2-0.4-0.5-0.7-0.8-1c-2.3-2.2-5.9-2.1-8.1,0.2c-0.6,0.6-0.6,1.6,0,2.2c0.6,0.6,1.6,0.6,2.2,0
			c1-1.1,2.7-1.1,3.7-0.1c0.3,0.2,0.5,0.5,0.6,0.9c-3.4,2.4-7.6,3.5-11.9,2.9c-0.6-3,0.3-6.2,2.5-8.5c1.8-1.8,4.2-2.9,6.7-3
			c2.6-0.1,5,0.9,6.8,2.7c0.2,0.2,0.4,0.4,0.6,0.7C33.1,28.8,32.3,29.8,31.4,30.8z"
          />
          <path
            fill={accent}
            d="M14.1,20.5c0.2,0,0.5,0,0.7,0c1.3,0,2.5-0.4,3.5-1.2c1.2-0.9,2-2.3,2.1-3.8c0.2-1.5-0.2-3-1.2-4.2
			c-0.9-1.2-2.3-2-3.8-2.1c-0.8-0.1-1.6,0.5-1.7,1.3c-0.1,0.8,0.5,1.6,1.3,1.7c0.7,0.1,1.3,0.4,1.8,1c0.4,0.6,0.6,1.2,0.5,1.9
			c-0.1,0.7-0.4,1.3-1,1.8c-0.6,0.4-1.2,0.6-1.9,0.5c-1.4-0.2-2.5-1.5-2.3-2.9c0.1-0.8-0.5-1.6-1.3-1.7c-0.8-0.1-1.6,0.5-1.7,1.3
			C8.7,17.2,11,20.1,14.1,20.5z"
          />
        </g>
      </g>
    </Box>
  );
};
