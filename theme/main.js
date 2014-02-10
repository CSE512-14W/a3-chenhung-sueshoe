var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
        .range([height, 0]);

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(20);

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("crime.csv", type, function(error, data){
        x.domain(data.map(function(d) {return d.District;}));
        y.domain([0, d3.max(data, function(d) {return d.FRAUD})]);
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

console.log(data);

        svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar FRAUD")
        .attr("x", function(d) { return x(d.District); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.FRAUD); })
        .attr("height", function(d) { return height - y(d.FRAUD); });

    }
);

function type(d) {
    d.FRAUD = +d.FRAUD;
    d.BURGLARY = +d.BURGLARY;
    d["BIKE THEFT"] = +d["BIKE THEFT"];
    d["CAR PROWL"] = +d["CAR PROWL"];
    return d;
}
