// import React from 'react';

// const AnimatedHero = () => {
//   return (
//     <svg
//       className="w-full h-full"
//       viewBox="0 0 400 300"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
//         </linearGradient>
//       </defs>
      
//       {/* Brain */}
//       <path
//         d="M200 50 Q 100 50 100 150 Q 100 250 200 250 Q 300 250 300 150 Q 300 50 200 50 Z"
//         fill="url(#grad1)"
//       >
//         <animate
//           attributeName="d"
//           dur="10s"
//           repeatCount="indefinite"
//           values="
//             M200 50 Q 100 50 100 150 Q 100 250 200 250 Q 300 250 300 150 Q 300 50 200 50 Z;
//             M200 70 Q 120 70 120 170 Q 120 270 200 270 Q 280 270 280 170 Q 280 70 200 70 Z;
//             M200 50 Q 100 50 100 150 Q 100 250 200 250 Q 300 250 300 150 Q 300 50 200 50 Z
//           "
//         />
//       </path>
      
//       {/* Neurons */}
//       <circle cx="150" cy="100" r="5" fill="white">
//         <animate
//           attributeName="cy"
//           dur="2s"
//           values="100; 120; 100"
//           repeatCount="indefinite"
//         />
//       </circle>
//       <circle cx="250" cy="200" r="5" fill="white">
//         <animate
//           attributeName="cx"
//           dur="3s"
//           values="250; 230; 250"
//           repeatCount="indefinite"
//         />
//       </circle>
//       <circle cx="200" cy="150" r="5" fill="white">
//         <animate
//           attributeName="r"
//           dur="1.5s"
//           values="5; 7; 5"
//           repeatCount="indefinite"
//         />
//       </circle>
      
//       {/* Connections */}
//       <line x1="150" y1="100" x2="200" y2="150" stroke="white" strokeWidth="2">
//         <animate
//           attributeName="y1"
//           dur="2s"
//           values="100; 120; 100"
//           repeatCount="indefinite"
//         />
//       </line>
//       <line x1="250" y1="200" x2="200" y2="150" stroke="white" strokeWidth="2">
//         <animate
//           attributeName="x1"
//           dur="3s"
//           values="250; 230; 250"
//           repeatCount="indefinite"
//         />
//       </line>
//     </svg>
//   );
// };

// export default AnimatedHero;
