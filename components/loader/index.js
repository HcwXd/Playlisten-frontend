import React, { Component } from 'react';
import './loader.scss';

const loader = () => (
  <div id="loader" className="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

// class loader extends Component {
//   render() {
//     return (
//       <div id="loader" className="loader">
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     );
//   }
// }
export default loader;
