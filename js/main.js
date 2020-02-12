import dataAgent from './loadData.js';

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
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


var storeLocationSelector = svg.append("g");

getAlibaData().then(alibaJson => {
  projection.fitSize([width, height], alibaJson);
  drawBaseMap(alibaJson.features);
  // loadImage();

});



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
      console.log(projection.invert(d3.mouse(this)));
    })
    ;
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
    .selectAll("locationPoints")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      console.log(d.long);
      console.log(d.lat);
      // console.log(projection);
      var coord = projection([d.long, d.lat]);
      console.log(coord);
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
    console.log("transactions");
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

    console.log(listOfCoord);
    var storeLocationList = listOfPlaces.map(function (placeName, idx) {
      // return [placeName, listOfCoord[idx].long, listOfCoord[idx].lat];
      return {placeName: placeName,
              long : listOfCoord[idx].long,
              lat : listOfCoord[idx].lat,
      };
    });

    console.log(storeLocationList);
    drawStoreLocations(storeLocationList);

  }
);





function loadImage(){
  var myimage = svg.append('image')
    .attr('src', 'data/assignment2/MC2-tourist.jpg')
    .attr('width', 1000)
    .attr('height', 800)
}









export {svg, projection};