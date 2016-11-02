(function () {
  'use strict';

  var margin = {top: 20, right: 30, bottom: 40, left: 130},
      width = 1060 - margin.left - margin.right,
      height = 720 - margin.top - margin.bottom;

  var x = d3.scale.linear()
  .range([0, width]);

  var y = d3.scale.ordinal()
  .rangeRoundBands([0, height], 0.47);

  var svg = d3.select("#chart0").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

  var gfac = svg
  .append("g")
  .attr("transform", "translate(" + (margin.left + 80) + "," + margin.top + ")");

  var palette = ['#83b','#fa0','#4cd','#36b','#8c3','#bbb', '#fff'];
  var gstu = svg
  .append("g")
  .attr("transform", "translate(" + (margin.left - 80) + "," + margin.top + ")");

  d3.tsv("data1.tsv", type, function(error, data) {
    x.domain(d3.extent(data, function(d) { return d.value; })).nice();
    y.domain(data.map(function(d) { return d.name; }));

    gfac.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value === 0 ? "none" : "positive"); })
      .style("fill", function (d,i) {var c = palette[i]; return c})
      .attr("x", function(d) { return x(Math.min(0, Math.abs(d.value))); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand());

  });


  d3.tsv("data2.tsv", type, function(error, data) {
    x.domain(d3.extent(data, function(d) { return d.value; })).nice();
    y.domain(data.map(function(d) { return d.name; }));

    gstu.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value !== 0 ? "negative" : "none"); })
      .style("fill", function (d,i) {var c = palette[i]; return c})
      .attr("x", function(d) { return x(Math.min(0, -1 * Math.abs(d.value))); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand());

  });

  var line1Data = [{x:10.47088623046875,y:18.82151667652235}, {x:11.47088623046875,y:9.547064678235984}, {x:18.288565788479787,y:2.034758559624038}, {x:23.47088623046875,y:2.034758559624038}, {x:31.653206672457713,y:2.034758559624038}, {x:37.47088623046875,y:9.547064678235984}, {x:38.47088623046875,y:18.82151667652235}, {x:37.47088623046875,y:28.095968674808717}, {x:31.653206672457713,y:35.60827479342066}, {x:24.47088623046875,y:39.60827479342066}, {x:17.288565788479787,y:35.60827479342066}, {x:11.47088623046875,y:28.095968674808717}, {x:10.47088623046875,y:18.82151667652235}];

  var line2Data = [{x:2.2804107666015625,y:46.36611837210006}, {x:2.2804107666015625,y:38.77793037350213}, {x:14.006930103618174,y:32.631498094637806}, {x:24.780410766601562,y:32.631498094637806}, {x:35.55389142958501,y:32.631498094637806}, {x:47.28041076660156,y:38.77793037350213}, {x:47.28041076660156,y:46.36611837210006}, {x:47.28041076660156,y:45.954306370697964}, {x:2.2804107666015625,y:45.954306370697964}, {x:2.2804107666015625,y:46.36611837210006}];

  var lineFn = d3.svg.line()
  .x(function (d) {return d.x;})
  .y(function (d) {return d.y;})
  .interpolate('basis-closed');

  var labels = ['Hispanic/Latino','White','Asian','Black/Af Amer','Amer Indian','Other*'];
  var offsetx = [-25,3,5,-20,-15,3];
  var offsety = [0,83,166,249,332,415];
  
  var drawMan = function (s, i) {
    s.append('g')
    .attr("transform", "translate(" + (margin.left + 425) + "," + (margin.top + 30 + offsety[i]*1.067) + ")")
    .append('path')
    .attr('d', lineFn(line1Data))
    .attr('fill', palette[i]);
    svg.append('g')
    .attr("transform", "translate(" + (margin.left + 425) + "," + (margin.top + 30 + offsety[i]*1.067) + ")")
    .append('path')
    .attr('d', lineFn(line2Data))
    .attr('fill', palette[i]);
    svg.append('g')
    .attr("transform", "translate(" + (margin.left + 425 + offsetx[i]) + "," + (margin.top + 94 + offsety[i]*1.067) + ")")
    .append('text')
    .style('stroke', palette[i])
    .text(labels[i]);
  };

  drawMan(svg, 0);
  drawMan(svg, 1);
  drawMan(svg, 2);
  drawMan(svg, 3);
  drawMan(svg, 4);
  drawMan(svg, 5);

  function type(d) {
    d.value = +d.value;
    return d;
  }


  var init = function () {
    console.log('test');
  };
  init();
}());