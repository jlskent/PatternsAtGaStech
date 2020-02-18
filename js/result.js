import dataAgent from './loadData.js';
const { getCreditCardTransactions,getCarTrackingData, getLoyaltyCardTransactions, getListOfPlaces, getListOfPeople } = dataAgent;

var parent = d3.select("#resultab");


//records from 1 to 4 AM
getCreditCardTransactions().then(data =>{
    var result = data.filter(d => {
        return  5>ts(d.timestamp).getHours()>0});
    var TimeTable = parent.append("div").attr('id', 'TimeTable')
    TimeTable.append("h4").text("Unusual activity between 1AM to 4AM");
    TimeTable.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result)
    .enter()
    .append("li")
    .text((d) => {
      const fullName = d.FirstName + " " + d.LastName;
      return fullName + ", " + d.timestamp +", "+ d.location;
    })
    .attr("class", "list-group-item")


    //console.log(result)

});


getCarTrackingData().then(data =>{
    var result = data.filter(d => {
        return  5>ts(d.Timestamp).getHours()>0});
    var result1 = result.reduce((acc, it) => {
        acc[it.id] = acc[it.id] + 1 || 1;
        return acc;
        }, {});

    var result2=[];
    for(var i =0;i<100;i++){
        if (result1[i]>0){
            result2.push({id:i, count:result1[i]})
        }

    }
    result2.sort(function (a, b) {
        return b.count - a.count;
      });

    var CarTimeTable = parent.append("div").attr('id', 'CarTimeTable')
    CarTimeTable.append("h4").text("Unusual car activity between 1AM to 4AM");
    CarTimeTable.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result2)
    .enter()
    .append("li")
    .text((d) => {
      return "id: "+d.id + "-Count: " + d.count;
    })
    .attr("class", "list-group-item")
});

function ts(x){
    var t = new Date(x)
    return t
}

//top 10 highest transaction
getCreditCardTransactions().then(data =>{
    data.sort(function (a, b) {
        return b.price - a.price;
      });
    var result = data.slice(0, 5)

    var ccHigh = parent.append("div").attr('id', 'ccHigh')
    ccHigh.append("h4").text("Highest cc prices");
    ccHigh.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result)
    .enter()
    .append("li")
    .text((d) => {
        const fullName = d.FirstName + " " + d.LastName;
        return fullName + ", " + d.timestamp +", "+ d.location + ", "+d.price;
    })
    .attr("class", "list-group-item")
});

getLoyaltyCardTransactions().then(data =>{
    data.sort(function (a, b) {
        return b.price - a.price;
      });
    var result = data.slice(0, 5)

    var lcHigh = parent.append("div").attr('id', 'lcHigh')
    lcHigh.append("h4").text("Highest lc prices");
    lcHigh.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result)
    .enter()
    .append("li")
    .text((d) => {
        const fullName = d.FirstName + " " + d.LastName;
        return fullName + ", " + d.timestamp +", "+ d.location + ", "+d.price;
    })
    .attr("class", "list-group-item")
});


//top 5 least visited place
getCreditCardTransactions().then(data =>{
    var result = data.reduce((acc, it) => {
        acc[it.location] = acc[it.location] + 1 || 1;
        return acc;
        }, {});
    var result1 = JSON.parse(JSON.stringify(result))
    var sortable = [];
    for (var r in result1) {
        sortable.push([r, result[r]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    var result2 = sortable.slice(0, 5)

    var ccLeast = parent.append("div").attr('id', 'ccLeast')
    ccLeast.append("h4").text("Least cc records location");
    ccLeast.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result2)
    .enter()
    .append("li")
    .text((d) => {
        
        return d[0] + ", " +d[1] ;
    })
    .attr("class", "list-group-item")

    //console.log(sortable)
});


//top 10 most visited place == patterns

getCreditCardTransactions().then(data =>{
    var result = data.reduce((acc, it) => {
        acc[it.location] = acc[it.location] + 1 || 1;
        return acc;
        }, {});
    var result1 = JSON.parse(JSON.stringify(result))
    var sortable = [];
    for (var r in result1) {
        sortable.push([r, result[r]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    var result2 = sortable.slice(0, 10)

    var ccMost = parent.append("div").attr('id', 'ccMost')
    ccMost.append("h4").text("Most cc records location");
    ccMost.append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(result2)
    .enter()
    .append("li")
    .text((d) => {
        
        return d[0] + ", " +d[1] ;
    })
    .attr("class", "list-group-item")

    //console.log(sortable)
});