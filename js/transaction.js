
import dataAgent from './loadData.js';
import { svg, projection } from './main.js';

const { getAllCarAssignments, getCarTrackingDataById, getCreditCardTransactions, getLoyaltyCardTransactions} = dataAgent;

var storeLocationSelector = svg.append("g");

var transactionSelector = svg.append("g");




//TODO update instead of redraw









//TODO update instead of redraw
// function drawCreditCardLocation(data) {
//   d3.select("#transactions").remove();
//   transactionSelector
//     .append("g")
//     .attr("id", "gpsGraph")
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => {
//
//       var coord = projection([d.long, d.lat]);
//
//       return coord[0];
//     })
//     .attr("cy", (d) =>{
//       var coord = projection([d.long, d.lat]);
//       return coord[1];
//     })
//     .attr("r", 2)
//     // .style("stroke", "red")
//     .style("fill", (d) => { return "red"})
//   ;
//
// }



console.log("");

// buttons
d3.select('#btn1')
  .on('click', function()
  {
  });
d3.select('#btn2')
  .on('click', function()
  {
  });
