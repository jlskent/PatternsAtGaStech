import dataAgent from './loadData.js';
const { getCreditCardTransactions,getCarTrackingData, getLoyaltyCardTransactions, getListOfPlaces, getListOfPeople } = dataAgent;

var parent = d3.select("#resultab");


//records from 1 to 4 AM
const p1 = getCreditCardTransactions().then(data =>{
    var result = data.filter(d => {
        return  5>ts(d.timestamp).getHours()>0});
    var TimeTable = parent.append("div").attr('id', 'TimeTable').attr('class', 'col-xl-4 col-sm-6 col-12')
                            .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "People go out in the midnight is weird");
    TimeTable.append("h4")
            .text("Unusual activity between 1AM to 4AM");
    
    const table = TimeTable.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Empolyee');
    tableHead.append('th').text('Timestamp');
    tableHead.append('th').text('Location');

    table.append('tbody').selectAll("tr")
        .data(result)
        .enter()
        .append("tr")
        .html((d) => `<td>${d.FirstName} ${d.LastName}</td><td>${d.timestamp}</td><td>${d.location}</td>`);

});


const p2 = getCarTrackingData().then(data =>{
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

    var CarTimeTable = parent.append("div").attr('id', 'CarTimeTable').attr('class', 'col-xl-4 col-sm-6 col-12')
                                .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "count gps record showing in the midnight");
    CarTimeTable.append("h4").text("Unusual car activity between 1AM to 4AM");
    

    const table = CarTimeTable.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Car Id');
    tableHead.append('th').text('Activity Count');


    table.append('tbody').selectAll("tr")
        .data(result2)
        .enter()
        .append("tr")
        .html((d) => `<td>${d.id}</td><td>${d.count}</td>`);
});

function ts(x){
    var t = new Date(x)
    return t
}

//top 10 highest transaction
const p3 = getCreditCardTransactions().then(data =>{
    data.sort(function (a, b) {
        return b.price - a.price;
      });
    var result = data.slice(0, 5)

    var ccHigh = parent.append("div").attr('id', 'ccHigh').attr('class', 'col-xl-4 col-sm-6 col-12')
                        .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "check large amount of transaction");
    ccHigh.append("h4").text("Highest credit card transactions");

    const table = ccHigh.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Empolyee Name');
    tableHead.append('th').text('Timestamp');
    tableHead.append('th').text('Location');
    tableHead.append('th').text('Amount');


    table.append('tbody').selectAll("tr")
        .data(result)
        .enter()
        .append("tr")
        .html((d) => `<td>${d.FirstName} ${d.LastName}</td><td>${d.timestamp}</td><td>${d.location}</td><td>${d.price}</td>`);
});

const p4 = getLoyaltyCardTransactions().then(data =>{
    data.sort(function (a, b) {
        return b.price - a.price;
      });
    var result = data.slice(0, 5)

    var lcHigh = parent.append("div").attr('id', 'lcHigh').attr('class', 'col-xl-4 col-sm-6 col-12')
                            .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "check large amount of transaction");
    lcHigh.append("h4").text("Highest loyalty card transactions");
    
    

    const table = lcHigh.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Empolyee Name');
    tableHead.append('th').text('Date');
    tableHead.append('th').text('Location');
    tableHead.append('th').text('Amount');


    table.append('tbody').selectAll("tr")
        .data(result)
        .enter()
        .append("tr")
        .html((d) => `<td>${d.FirstName} ${d.LastName}</td><td>${d.timestamp}</td><td>${d.location}</td><td>${d.price}</td>`);
});


//top 5 least visited place
const p5 = getCreditCardTransactions().then(data =>{
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

    var ccLeast = parent.append("div").attr('id', 'ccLeast').attr('class', 'col-xl-4 col-sm-6 col-12')
                            .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "check small amount of transaction");
    ccLeast.append("h4").text("Least credit card records location");
    

    const table = ccLeast.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Place Name');
    tableHead.append('th').text('Transaction Count');


    table.append('tbody').selectAll("tr")
        .data(result2)
        .enter()
        .append("tr")
        .html((d) => `<td>${d[0]}</td><td>${d[1]}</td>`);

    //console.log(sortable)
});


//top 10 most visited place == patterns

const p6 = getCreditCardTransactions().then(data =>{
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

    var ccMost = parent.append("div").attr('id', 'ccMost').attr('class', 'col-xl-4 col-sm-6 col-12')
                        .attr('data-toggle', 'tooltip').attr('data-placement', "top").attr("title", "check where people do most transactions");
    ccMost.append("h4").text("Most credit card records location");
    
    const table = ccMost.append("table")
    .attr("class", "table table-hover");
    const tableHead = table.append('thead').append('tr');

    tableHead.append('th').text('Place Name');
    tableHead.append('th').text('Transaction Count');


    table.append('tbody').selectAll("tr")
        .data(result2)
        .enter()
        .append("tr")
        .html((d) => `<td>${d[0]}</td><td>${d[1]}</td>`);

    //console.log(sortable)
});

Promise.all([p1, p2, p3, p4, p5, p6]).then(function () {
    // document.querySelectorAll('[data-toggle="tooltip"]').forEach(el => );
    $('[data-toggle="tooltip"]').tooltip()
})