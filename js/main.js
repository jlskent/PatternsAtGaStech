import dataAgent from './loadData.js';

const {getAlibaData} = dataAgent;

// path for geojson
var projection = d3.geoMercator();
var path = d3.geoPath(projection);

//canvas and selectors
var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  // .attr("id", )
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

getAlibaData().then(alibaJson => {
  projection.fitSize([width, height], alibaJson);
  drawBaseMap(alibaJson.features);
})


function drawBaseMap(alibaData){
  svg.append("g")
    .selectAll("path")
    .data(alibaData)
    .enter()
    .append("path")
    .attr("d", feature => path(feature))
    .style("stroke", "black")
    .style("stroke-width", "3")
    .style("fill", (d) => {
      return "rgb(213,222,217)";
    });
  // .on("mouseover", function(d) {
  // console.log(d);
  // tip.show()
  // toolTip.transition()
  //        .duration(300)
  //        .style("opacity", 1);
  // toolTip.html(d =>
  //   console.log(d.geometry)
  //
  // )
  // .style("left", (d3.event.pageX) + "px")
  // .style("top", (d3.event.pageY - 28) + "px");
  // })
  // .on("mouseout", function(d) {
  //   toolTip.transition()
  //          .duration(300)
  //          .style("opacity", 0);
  // });
}

export {svg, projection};