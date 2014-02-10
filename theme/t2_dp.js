var m = [65, 60, 10, 10],
    w = 800 - m[1] - m[3],
    h = 300 - m[0] - m[2];

var mb = [0, 20, 20, 20],
    wb = 675 - mb[1] - mb[3],
    hb = 120 - mb[0] - mb[2];

var x = d3.scale.ordinal().rangePoints([0, w], 1),
    y = {},
    dragging = {};

//var xb = d3.scale.linear().rangeRound([0, wb]);
var xb = {};
var yb = d3.scale.ordinal().rangeRoundBands([0, hb], .1);

var xaxisb = d3.svg.axis().scale(xb).orient("bottom");

var lowestpoint = h;

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

var svg = d3.select("#leftcolumn").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .attr("id", "paralellchart")
    .attr("class", "maindisplay")
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var colorb = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var svgb = d3.select("#controlpanel").append("svg")
                .attr("width", wb + mb[3] + mb[1])
                .attr("height", hb + mb[2] + mb[0])
            .append("g")
                .attr("transform", "translate(" + mb[3] + "," + mb[0] + ")");

var total = [],
    totalmax = 0,
    totalmin = 0;

d3.csv("./data/crime.csv", function(crime) {

    crimeclone = crime;

//line chart
  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(crime[0]).filter(function(d) {
    return d != "District" && (y[d] = d3.scale.linear()
        .domain([0, d3.max(crime, function(p) { return +p[d]; })])
        .range([h, 0]));
  }));
    for(var i = 0; i < crime.length; ++i){
        var d = crime[i]["District"]
        if(d != "Median"){
            var c = +crime[i]["Grand Total"];
//            console.log(c);
            total.push([d, c]);
        }
    }
    total.sort(function(a, b){return b[1]-a[1];});
    totalmax = total[0][1];
    totalmin = total[15][1];
    //console.log(total);
//  crime.sort(function(a, b){return d3.ascending(a["Grand Total"], b["Grand Total"]);});

  // Add foreground lines for focus.
  foreground = svg.append("svg:g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(crime)
    .enter().append("svg:path")
      .attr("d", path)
      .attr("class", classname)
      .attr("district", districtcode);
//      .attr("class", "path");

   // console.log(dimensions);

  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("svg:g")
        .attr("class", dimensionclass)
        .attr("category", function(d){return d;})
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

  // Add an axis and title.
  g.append("svg:g")
      .attr("class", "axis")
      .each(function(d) { var tem = d3.select(this).call(axis.scale(y[d])); /*console.log(tem);*/ })
    .append("svg:text")
      .attr("class", "label")
      .attr("text-anchor", "left")
      .attr("y", -10)
      .attr("transform", "rotate(-30)")
      .text(String);
    
    //calculate map color
    totalmax = totalmax - totalmin;
    for(var i = 0; i < (crime.length-1); ++i){
        var areaname = '.' + total[i][0];
        var lum = ((total[i][1] - totalmin) / totalmax) - 1;
        //console.log(lum);
        $("#seattlemap").find(areaname).css("fill", ColorLuminance("FF6347", lum));
    }
  

//bar chart

    colorb.domain(d3.keys(crime[0]).filter(function(key) { return key !== "District"; }));
    crime.forEach(function(d){
        var x0 = 0;
        d.crimes = colorb.domain().map(function(name) { return {name: name, x0: x0, x1: x0 += +d[name], District: d.District}; });
        d.crimes.pop();
        d.total = d.crimes[d.crimes.length - 1].x1;
        xb[d.District] = wb/d.total;
        //console.log(d);
    });
    //console.log(xb);
//    xb.domain([0, d3.max(crime, function(d){return d.total;})]);
//    yb.domain(crime.map(function(d){return d["District"];}));
/* 
    var state = svgb.selectAll(".state")
        .data(crime)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate( 0, " + yb(d["District"]) + ")"; });
*/
    var state = svgb.selectAll(".state")
        .data(crime)
        .enter().append("g")
        .attr("class", "g");

    state.selectAll("rect")
        .data(function(d) { return d.crimes; })
        .enter().append("rect")
        .attr("height", hb)
        .attr("x", function(d) { return d.x0*xb[d.District]; })
        .attr("width", function(d) { return (d.x1 - d.x0)*xb[d.District]; })
        .style("fill", function(d) { return colorb(d.name); })
        .attr("class", function(d) { return "bars " + d.District; });

        /*
        .append("svg:text")
        .attr("x", function(d) { return d.x0*xb[d.District]; })
        .style("fill", "black")
        .attr("class", "label")
        .attr("text-anchor", "left")
        .attr("transform", "rotate(-30)")
        .attr("font", "12px")
        .text(String);
        */
/*
  // Add an and title.
  g.append("svg:g")
      .attr("class", "axis")
      .each(dimensions)
    .append("svg:text")
      .attr("class", "label")
      .attr("text-anchor", "left")
      .attr("y", -50)
      .attr("transform", "rotate(-30)")
      .text(String);
      */
/*
    state.selectAll("rect")
        .data(function(d) { return d.crimes; })
        .enter().append("rect")
        .attr("height", yb.rangeBand())
        .attr("x", function(d) { return d.x0*xb[d.District]; })
        .attr("width", function(d) { return (d.x1 - d.x0)*xb[d.District]; })
        .style("fill", function(d) { return colorb(d.name); })
        .attr("class", function(d) { return "area bars " + d.District; });
*/

//console.log(crimeclone);
});


function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
    var r = dimensions.map(function(p) {return [position(p), y[p](d[p])]});
/*    r.push({(r[13][0]), 0});
    r.push({(r[0][0]), 0});*/
    if(d["District"] != "Median"){
        var ra = [[r[13][0], h], [r[0][0], h]];
        r.push(ra[0]);
        r.push(ra[1]);
    }
    //console.log(r);
    return line(r);
//  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}

//Returns the classname for each path.
function classname(d) {
    return "area path " + d.District;
}

function dimensionclass(d) {
    //console.log(d);
    return "dimension " + d;
}

//Returns the district
function districtcode(d) {
    return d.District;
}
function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}
