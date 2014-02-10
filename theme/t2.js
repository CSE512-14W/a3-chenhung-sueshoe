var m = [65, 60, 10, 10],
    w = 800 - m[1] - m[3],
    h = 300 - m[0] - m[2];

var x = d3.scale.ordinal().rangePoints([0, w], 1),
    y = {},
    dragging = {};

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

d3.csv("./data/crime.csv", function(crime) {

  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(crime[0]).filter(function(d) {
    return d != "District" && (y[d] = d3.scale.linear()
        .domain([0, d3.max(crime, function(p) { return +p[d]; })])
        .range([h, 0]));
  }));
    for(var i = 0; i < crime.length; ++i){
        //console.log(crime[i]);
    }
  crime.sort(function(a, b){return d3.ascending(a["Grand Total"], b["Grand Total"]);});

  // Add blue foreground lines for focus.
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
    var ra = [[r[13][0], h], [r[0][0], h]];
    r.push(ra[0]);
    r.push(ra[1]);
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

