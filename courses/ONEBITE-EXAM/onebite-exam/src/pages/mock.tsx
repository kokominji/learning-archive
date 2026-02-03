// import { Children } from "react";

// export const MockTreeData = [
//   {
//     label: "품명",
//     value: "productNm",
//     children: [
//       {
//         label: "테슬라",
//         value: "tesla",
//       },
//       {
//         label: "BMW",
//         value: "bmw",
//         children: [
//           {
//             label: "바퀴",
//             value: "wheel",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "규격",
//     value: "standard",
//   },
// ];

export const MockTreeData = [
  {
    id: 1,
    count: 1,
    label: "차량",
    value: "vehicle",
    children: [
      {
        label: "테슬라",
        value: "tesla",
        children: [
          {
            id: 3,
            label: "바퀴",
            value: "tWheels",
            count: "5",
          },
          {
            label: "문",
            value: "tDoor",
          },
        ],
      },
      {
        label: "BMW",
        value: "bmw",
        children: [
          {
            label: "바퀴",
            value: "wheels",
          },
        ],
      },
    ],
  },
  {
    label: "부품",
    value: "parts",
    children: [
      {
        label: "엔진",
        value: "engine",
        children: [
          {
            label: "가솔린 엔진",
            value: "gasoline-engine",
          },
          {
            label: "디젤 엔진",
            value: "diesel-engine",
          },
        ],
      },
      {
        label: "타이어",
        value: "tire",
        children: [
          {
            label: "여름용 타이어",
            value: "summer-tire",
          },
          {
            label: "겨울용 타이어",
            value: "winter-tire",
          },
        ],
      },
    ],
  },
];
