import React from "react";
import { useTheme } from "@emotion/react";
import { Box } from "../../";

export const LogoPrimaryKnowAll = ({ reverse, ...props }) => {
  const { colors } = useTheme();
  const primary = reverse ? "white" : colors.all.primary;
  const accent = colors.all.accent;
  return (
    <Box
      as="svg"
      viewBox="0 0 318 49"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <polygon id="path-1" points="0 0 49 0 49 49 0 49"></polygon>
        <polygon id="path-3" points="0 0 49 0 49 49 0 49"></polygon>
        <polygon
          id="path-5"
          points="-4.20523278e-14 0 49 0 49 49 -4.20523278e-14 49"
        ></polygon>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Home-1" transform="translate(-120.000000, -27.000000)">
          <g id="Navigation" transform="translate(0.000000, 27.000000)">
            <g id="Group-22" transform="translate(120.000000, 0.000000)">
              <g id="Group-3" transform="translate(162.000000, 0.000000)">
                <g id="Clip-2"></g>
                <path
                  d="M49,24.500037 C49,38.0306148 38.0305574,49.000074 24.5,49.000074 C10.9687028,49.000074 0,38.0306148 0,24.500037 C0,10.9687194 10.9687028,0 24.5,0 C38.0305574,0 49,10.9687194 49,24.500037"
                  id="Fill-1"
                  fill={accent}
                  mask="url(#mask-2)"
                ></path>
              </g>
              <path
                d="M189.830402,25.4639401 L186.499267,16.0360453 L183.169598,25.4639401 L189.830402,25.4639401 Z M174.233069,34.7683223 C174.07769,34.6141141 174,34.4416348 174,34.2501535 C174,34.1076388 174.010994,34.0009355 174.035913,33.9285819 L182.4528,10.9997954 C182.523893,10.7133043 182.679273,10.4765107 182.918206,10.2850294 C183.157872,10.0950098 183.467165,10 183.849018,10 L189.150982,10 C189.532835,10 189.842861,10.0950098 190.081794,10.2850294 C190.320727,10.4765107 190.476107,10.7133043 190.5472,10.9997954 L198.928174,33.9285819 L199,34.2501535 C199,34.4416348 198.92231,34.6141141 198.766931,34.7683223 C198.611551,34.9232613 198.426854,35 198.212108,35 L193.807241,35 C193.233363,35 192.85151,34.7500512 192.660217,34.2501535 L191.263999,30.608355 L181.700088,30.608355 L180.339783,34.2501535 C180.147024,34.7500512 179.754911,35 179.156845,35 L174.752712,35 C174.559953,35 174.388449,34.9232613 174.233069,34.7683223 L174.233069,34.7683223 Z"
                id="Fill-4"
                fill="#FFFFFF"
              ></path>
              <g id="Group-8" transform="translate(216.000000, 0.000000)">
                <g id="Clip-7"></g>
                <path
                  d="M49,24.500037 C49,38.0306148 38.0311316,49.000074 24.5003699,49.000074 C10.9688684,49.000074 0,38.0306148 0,24.500037 C0,10.9687194 10.9688684,0 24.5003699,0 C38.0311316,0 49,10.9687194 49,24.500037"
                  id="Fill-6"
                  fill={accent}
                  mask="url(#mask-4)"
                ></path>
              </g>
              <path
                d="M233.264334,34.7325109 C233.088834,34.553454 233,34.3458941 233,34.1076388 L233,10.8930921 C233,10.6314497 233.088834,10.4165814 233.264334,10.249218 C233.442001,10.0833163 233.646391,10 233.881836,10 L238.540906,10 C238.79874,10 239.011796,10.0833163 239.177186,10.249218 C239.340408,10.4165814 239.422742,10.6314497 239.422742,10.8930921 L239.422742,29.607098 L250.117442,29.607098 C250.375276,29.607098 250.588332,29.6969918 250.753721,29.8745871 C250.916944,30.0543748 251,30.2736282 251,30.5352706 L251,34.1076388 C251,34.3458941 250.916944,34.553454 250.753721,34.7325109 C250.588332,34.910837 250.375276,35 250.117442,35 L233.881836,35 C233.646391,35 233.442001,34.910837 233.264334,34.7325109"
                id="Fill-9"
                fill="#FFFFFF"
              ></path>
              <g id="Group-13" transform="translate(269.000000, 0.000000)">
                <g id="Clip-12"></g>
                <path
                  d="M49.000148,24.500037 C49.000148,38.0306148 38.0312464,49.000074 24.4997041,49.000074 C10.9689015,49.000074 -4.20523278e-14,38.0306148 -4.20523278e-14,24.500037 C-4.20523278e-14,10.9687194 10.9689015,0 24.4997041,0 C38.0312464,0 49.000148,10.9687194 49.000148,24.500037"
                  id="Fill-11"
                  fill={accent}
                  mask="url(#mask-6)"
                ></path>
              </g>
              <path
                d="M287.264345,34.7325109 C287.088837,34.553454 287,34.3458941 287,34.1076388 L287,10.8930921 C287,10.6314497 287.088837,10.4165814 287.264345,10.249218 C287.441297,10.0833163 287.646417,10 287.881871,10 L292.541128,10 C292.798973,10 293.011315,10.0833163 293.177434,10.249218 C293.339941,10.4165814 293.423,10.6314497 293.423,10.8930921 L293.423,29.607098 L304.118129,29.607098 C304.375973,29.607098 304.588316,29.6969918 304.753712,29.8745871 C304.916941,30.0543748 305,30.2736282 305,30.5352706 L305,34.1076388 C305,34.3458941 304.916941,34.553454 304.753712,34.7325109 C304.588316,34.910837 304.375973,35 304.118129,35 L287.881871,35 C287.646417,35 287.441297,34.910837 287.264345,34.7325109"
                id="Fill-14"
                fill="#FFFFFF"
              ></path>
              <path
                d="M120.890325,43 L126.222789,43 C126.789883,43 127.235245,42.8609244 127.554421,42.5776222 C127.875824,42.2965276 128.105185,41.9779046 128.247701,41.6261684 L133.526722,26.9849648 L138.805,41.6261684 C138.911887,41.9779046 139.124176,42.2965276 139.445579,42.5776222 C139.764755,42.8609244 140.208632,43 140.777211,43 L146.162376,43 C146.731697,43 147.210461,42.8329621 147.603121,42.4981504 C147.993555,42.1633388 148.222916,41.750527 148.295659,41.256036 L154,7.42828448 L154,7.11039736 C154,6.82856688 153.893113,6.5746987 153.680824,6.34364186 C153.46705,6.11626427 153.200576,6 152.880658,6 L145.895901,6 C145.362209,6 144.971776,6.09786802 144.723115,6.29139652 C144.473713,6.48492502 144.314125,6.79324609 144.242867,7.21635973 L140.936798,27.1431725 L137.259595,15.6205004 C136.973821,14.6697824 136.387428,14.1929518 135.499674,14.1929518 L131.500326,14.1929518 C130.611829,14.1929518 130.024694,14.6697824 129.740405,15.6205004 L126.062459,27.1954178 L122.809834,7.21635973 C122.702947,6.40618909 122.133627,6 121.104099,6 L114.1186,6 C113.833569,6 113.576743,6.11626427 113.345898,6.34364186 C113.113567,6.5746987 113,6.82856688 113,7.11039736 C113,7.25094467 113.017072,7.35764289 113.051959,7.42828448 L118.757785,41.256036 C118.8283,41.750527 119.050239,42.1633388 119.424343,42.4981504 C119.797704,42.8329621 120.286118,43 120.890325,43"
                id="Fill-16"
                fill={primary}
              ></path>
              <path
                d="M38.3199184,43.471712 L45.0238694,43.471712 C45.4111729,43.471712 45.7374779,43.3490081 46.0013146,43.1021308 C46.2651513,42.856723 46.3967022,42.5400441 46.3967022,42.152094 L46.3967022,23.5745775 L58.8021716,42.4702425 C59.1887402,43.137399 59.7877009,43.471712 60.5968492,43.471712 L66.5629393,43.471712 C66.9495078,43.471712 67.2662588,43.340191 67.5131924,43.0771492 C67.758656,42.8133725 67.8828577,42.4878766 67.8828577,42.0999265 L67.8828577,7.89933872 C67.8828577,7.51285819 67.758656,7.18809699 67.5131924,6.9235856 C67.2662588,6.65980896 66.9495078,6.52681852 66.5629393,6.52681852 L59.8589883,6.52681852 C59.470215,6.52681852 59.1541989,6.65980896 58.9080003,6.9235856 C58.6610668,7.18809699 58.5383349,7.51285819 58.5383349,7.89933872 L58.5383349,27.2167524 L46.0806861,7.53049229 C45.6919128,6.86333578 45.0944218,6.52681852 44.2860085,6.52681852 L38.3199184,6.52681852 C37.9318801,6.52681852 37.6158639,6.65980896 37.3696654,6.9235856 C37.1227318,7.18809699 37,7.51285819 37,7.89933872 L37,42.152094 C37,42.5055107 37.1322858,42.8133725 37.3968574,43.0771492 C37.6606941,43.340191 37.9678912,43.471712 38.3199184,43.471712 M91.5289466,44 C96.5264106,44 100.458239,42.7854519 103.328106,40.3578251 C106.195034,37.9294636 107.71779,34.3600294 107.894171,29.6443791 C107.963254,27.6737693 108,26.1601763 108,25.104335 C108,24.0852314 107.963254,22.5554739 107.894171,20.5135929 C107.753066,15.8699486 106.212672,12.289493 103.273722,9.77369581 C100.335507,7.2578986 96.4205819,6 91.5289466,6 C86.6013001,6 82.6687369,7.2578986 79.730522,9.77369581 C76.7923071,12.289493 75.2511774,15.8699486 75.1122773,20.5135929 C75.0762662,21.5349008 75.0578932,23.0646583 75.0578932,25.104335 C75.0578932,27.146216 75.0762662,28.6590742 75.1122773,29.6443791 C75.2864536,34.3600294 76.8172945,37.9294636 79.7040648,40.3578251 C82.5893654,42.7854519 86.5307477,44 91.5289466,44 M91.5289466,36.0830272 C89.6637166,36.0830272 88.1857901,35.528288 87.0936973,34.4202792 C86.0038092,33.3122704 85.4217516,31.614989 85.3534039,29.3269655 C85.3173928,28.3078619 85.2990198,26.8471712 85.2990198,24.946363 C85.2990198,23.0830272 85.3173928,21.6576047 85.3534039,20.6722998 C85.4217516,18.385011 86.0038092,16.6869949 87.0936973,15.578986 C88.1857901,14.4702425 89.6637166,13.9155033 91.5289466,13.9155033 C93.3589003,13.9155033 94.8191887,14.4702425 95.9105466,15.578986 C97.0004347,16.6869949 97.5824923,18.385011 97.6530447,20.6722998 C97.7221273,22.6429096 97.7588734,24.0683321 97.7588734,24.946363 C97.7588734,25.8273328 97.7221273,27.2872888 97.6530447,29.3269655 C97.5824923,31.614989 97.0004347,33.3122704 95.9105466,34.4202792 C94.8191887,35.528288 93.3589003,36.0830272 91.5289466,36.0830272"
                id="Fill-18"
                fill={accent}
              ></path>
              <path
                d="M1.34923467,43 L8.57996056,43 C8.97586628,43 9.29965255,42.8682829 9.55131937,42.6048487 C9.8029862,42.3406786 9.92844399,42.0323575 9.92844399,41.6784137 L9.92844399,29.0460801 L20.1821767,41.9425838 C20.3249131,42.1898294 20.5773312,42.4282447 20.9371772,42.6563581 C21.296272,42.8859433 21.7642971,43 22.3397502,43 L30.8122828,43 C31.1353179,43 31.4147807,42.8859433 31.6491689,42.6563581 C31.8820547,42.4282447 32,42.1736407 32,41.8903385 C32,41.6092439 31.9271293,41.3965833 31.7836417,41.256036 L18.1861208,23.7082256 L30.7589445,7.74469989 C30.9016809,7.60488843 30.9745516,7.39296368 30.9745516,7.11039736 C30.9745516,6.82856688 30.8573575,6.5746987 30.6229693,6.34364186 C30.3893323,6.11626427 30.1286506,6 29.840924,6 L21.585501,6 C20.5773312,6 19.8764203,6.35394376 19.4805146,7.05741617 L9.92844399,18.8979754 L9.92844399,7.37456744 C9.92844399,6.98751044 9.8029862,6.66226483 9.55131937,6.3973589 C9.29965255,6.13318882 8.97586628,6 8.57996056,6 L1.34923467,6 C0.952577707,6 0.628791436,6.13318882 0.377875857,6.3973589 C0.125457789,6.66226483 0,6.98751044 0,7.37456744 L0,41.6784137 C0,42.0323575 0.135223965,42.3406786 0.40492065,42.6048487 C0.675368579,42.8682829 0.989388675,43 1.34923467,43"
                id="Fill-20"
                fill={primary}
              ></path>
            </g>
          </g>
        </g>
      </g>
    </Box>
  );
};
