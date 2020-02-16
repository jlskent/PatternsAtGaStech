import dataAgent from './loadData.js';
import {show, hide} from './util.js';

const {getAlibaData, getCreditCardTransactions} = dataAgent;

// path for geojson
var projection = d3.geoMercator();
var path = d3.geoPath(projection);

//canvas and selectors
var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  // .attr("id", )
  .attr("preserveAspectRatio", "none")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom + 200);


var storeLocationSelector = svg.append("g");

getAlibaData().then(alibaJson => {
  projection.fitSize([width, height], alibaJson);
  loadImage();
  //drawBaseMap(alibaJson.features);

});

const carTrackingTab = document.querySelector(".tracking-tab");
const transactionTab = document.querySelector(".transaction-tab");

carTrackingTab.addEventListener('click', function (e) {
  if(this.classList.contains('tab-selected')) return;

  // show and hide corresponding items
  hide('.transaction-item');
  show('.tracking-item');

  // modify tab style
  this.classList.add("tab-selected");
  transactionTab.classList.remove("tab-selected");
});

transactionTab.addEventListener('click', function (e) {
  if(this.classList.contains('tab-selected')) return;

  // show and hide corresponding items
  hide('.tracking-item');
  show('.transaction-item');

  // modify tab style
  this.classList.add("tab-selected");
  carTrackingTab.classList.remove("tab-selected");

});

const {timeline, xScaleWeek1, xScaleWeek2, yScale} = drawTimelineAxis();

function drawTimelineAxis() {
  const timelinePadding = 40;
  const timelinePaddingTop = 20;
  const timelineWidth = 910;
  const timelineHeight = 200;

  const minDateWeek1 = new Date('01/06/2014');
  const maxDateWeek1 = new Date('01/13/2014');
  const minDateWeek2 = new Date('01/13/2014');
  const maxDateWeek2 = new Date('01/20/2014');

  // define scales
  const xScaleWeek1 = d3.scaleTime()
                    .domain([minDateWeek1, maxDateWeek1])
                    .range([0, timelineWidth - 2 * timelinePadding]);

  const xScaleWeek2 = d3.scaleTime()
                      .domain([minDateWeek2, maxDateWeek2])
                      .range([0, timelineWidth - 2 * timelinePadding]);

  const yScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([timelineHeight - 2 * timelinePaddingTop, timelinePadding]);

  // draw timeline group 
  const timeline = svg.append('g')
            .style('transform', `translate(${timelinePadding}px, ${height}px)`)
            .attr('id', 'timelineGroup');
  
  // draw x axis
  const xAxis = d3.axisBottom(xScaleWeek1).tickFormat(d => {
    if(d.getHours() === 12) return '12 PM';
    else if(d.getDate() === 13) return '';
    else return new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(d);
  });
  timeline.append('g')
          .style('transform', `translateY(${timelineHeight - 2 * timelinePaddingTop}px)`)
          .call(xAxis);
                  
  // draw y axis
  const yAxis = d3.axisLeft(yScale).ticks(4).tickFormat(function (d) {
                                      if(d === 0.4) return "week1";
                                      if(d === 0.8) return "week2";
                                      return "";
                                    });
  timeline.append('g')
          .call(yAxis);

  return {timeline, xScaleWeek1, xScaleWeek2, yScale};
}

function drawBaseMap(alibaData){
  // console.log(" hihih ");
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
    })
    // util to get coordinates to pin stores
    .on('mousemove', function() {
      // get current long lat
      // console.log(projection.invert(d3.mouse(this)));
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


let drawStoreLocations = (data) => {
  // d3.select("#transactions").remove();
  storeLocationSelector
    .attr("id", "locations")
    .attr("class", "transaction-item hidden")
    .selectAll("locationPoints")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      // console.log(d.long);
      // console.log(d.lat);
      // console.log(projection);
      var coord = projection([d.long, d.lat]);
      // console.log(coord);
      return coord[0];

    })
    .attr("cy", (d) =>{
      var coord = projection([d.long, d.lat]);
      return coord[1];
    })
    .attr("r", 50)
    // .style("stroke", "red")
    .style("fill", (d) => { return "black"})
    .text("text", d => d.placeName)
  ;

};




// pin places on map
getCreditCardTransactions().then( data =>
  {
    // console.log("transactions");
    var listOfPlaces = [];
    data.forEach(row => listOfPlaces.push(row.location));
    listOfPlaces = listOfPlaces.filter((item, i, array) => array.indexOf(item) == i);
    // console.log(listOfPlaces);
    var listOfCoord = [];

    // TODO fill this by hovering on map
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });

    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });

    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });

    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });
    listOfCoord.push({ long: 24.86286569, lat: 36.05024141 });

    // console.log(listOfCoord);
    var storeLocationList = listOfPlaces.map(function (placeName, idx) {
      // return [placeName, listOfCoord[idx].long, listOfCoord[idx].lat];
      return {placeName: placeName,
              long : listOfCoord[idx].long,
              lat : listOfCoord[idx].lat,
      };
    });

    // console.log(storeLocationList);
    drawStoreLocations(storeLocationList);

  }
);





function loadImage(){
  var myimage = svg.append('image')
    .attr('xlink:href', 'data/assignment2/MC2-tourist.jpg')
    .attr('width', width)
    .attr('height', 653.63)
    .attr('x', 0)
    .attr('y', 53.37)
    .attr("preserveAspectRatio", "none")
}









export {svg, projection, timeline, xScaleWeek1, xScaleWeek2, yScale};