// svg set up

var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

let svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



//load data
d3.tsv("data/france.tsv")
  .row( (d, i) => {
    return {
      codePostal: +d["Postal Code"],
      inseeCode: +d.inseecode,
      place: d.place,
      longitude: +d.x,
      latitude: +d.y,
      population: +d.population,
      density: +d.density
    };
  })
  .get( (error, rows) => {
    console.log("Loaded " + rows.length + " rows");
    if (rows.length > 0) {
      console.log("First row: ", rows[0]);
      console.log("Last  row: ", rows[rows.length-1]);

      rows = rows.filter(function(d){
        if(isNaN(d.latitude) || isNaN(d.longitude)){  return false;  }
        else return true;
      });

      var x = d3.scaleLinear()
        .domain(d3.extent(rows, (row) =>  row.longitude))
        .range([ 0, width ]);


      var y = d3.scaleLinear()
        .domain(d3.extent(rows, (row) => row.latitude))
        .range([ 0, height]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));


      let draw  = (data) => {
        console.log(data);
        // svg.selectAll("rect")
        //   .data(data)
        //   .enter()
        //   .append("rect")
        //   .attr("width", 1)

        //   .attr("height", 1);

        console.log("hi");
        svg.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => {
            // console.log(d);
            return x(d.longitude);
          })
          .attr("cy", (d) =>{
            return y(d.latitude);
          })
          .attr("r", 0.2)
          .style("stroke", "grey")
          // .style("fill", (d) => { return toColor(d);})
          // .style("fill", "#69b3a2")
      };

      draw(rows);


    }
  });





