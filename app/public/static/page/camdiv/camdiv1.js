(function () {
  'use strict';

  var margin = {top: 20, right: 30, bottom: 40, left: 130};
  var width = 1060 - margin.left - margin.right;
  var height = 720 - margin.top - margin.bottom;
  var palette = ['#83b','#fa0','#4cd','#36b','#8c3','#bbb', '#fff'];

  var x = d3.scale.linear()
  .range([0, width]);

  var y = d3.scale.ordinal()
  .rangeRoundBands([0, height], 0.47);

  var type = function (d) {
    d.value = +d.value;
    return d;
  }

  var svg = d3.select("#chart0").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

  var gfac = svg
  .append("g")
  .attr("transform", "translate(" + (margin.left + 80) + "," + margin.top + ")");

  var gstu = svg
  .append("g")
  .attr("transform", "translate(" + (margin.left - 80) + "," + margin.top + ")");

  var build_students_chart = function () {
    d3.tsv("/data/camdiv/data1.tsv", type, function(error, data) {
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
  };

  var build_faculty_all_chart = function () {
    d3.tsv("/data/camdiv/data2.tsv", type, function(error, data) {
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
  };

  var place_labelled_icons = function (svg) {
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
  };


  var build_students_trend_chart = function () {
    Highcharts.chart('charta0', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'sans-serif'
          }
        },
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        visible: false,
        title: {
          text: 'Percent'
        }
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {radius: 0, symbol: "circle"}
        }
      },
      series: [{
        name: 'Other*',
        color: palette[5],
        data: [{name:2000, y:118}, {name:2005, y:131}, {name:2010, y:1154}, {name:2015, y:1356}]
      }, {
        name: 'Amer Indian/Alaska Native',
        color: palette[4],
        data: [{name:2000, y:13}, {name:2005, y:16}, {name:2010, y:122}, {name:2015, y:131}]
      }, {
        name: 'Black/Af Amer',
        color: palette[3],
        data: [{name:2000, y:118}, {name:2005, y:131}, {name:2010, y:174}, {name:2015, y:1156}]
      }, {
        name: 'Asian',
        color: palette[2],
        data: [{name:2000, y:193}, {name:2005, y:1153}, {name:2010, y:1276}, {name:2015, y:1408}]
      }, {
        name: 'White',
        color: palette[1],
        data: [{name:2000, y:1206}, {name:2005, y:1177}, {name:2010, y:1131}, {name:2015, y:1213}]
      }, {
        name: 'Hispanic/Latino',
        color: palette[0],
        data: [{name:2000, y:1002}, {name:2005, y:1805}, {name:2010, y:3809}, {name:2015, y:6047}]
      }]
    });
  };

  var build_faculty_all_trend_chart = function () {
    Highcharts.chart('chartb0', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
     xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'sans-serif'
          }
        },
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        visible: false,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {radius: 0, symbol: "circle"}
        }
      },
      series: [{
        name: 'Other*',
        color: palette[5],
        data: [{name:'2000', y:18}, {name:'2005', y:31}, {name:'2010', y:54}, {name:'2015', y:86}]
      }, {
        name: 'Amer Indian/Alaska Native',
        color: palette[4],
        data: [{name:'2000', y:2}, {name:'2005', y:2}, {name:'2010', y:2}, {name:'2015', y:3}]
      }, {
        name: 'Black/Af Amer',
        color: palette[3],
        data: [{name:'2000', y:8}, {name:'2005', y:11}, {name:'2010', y:24}, {name:'2015', y:11}]
      }, {
        name: 'Asian',
        color: palette[2],
        data: [{name:'2000', y:23}, {name:'2005', y:43}, {name:'2010', y:76}, {name:'2015', y:68}]
      }, {
        name: 'White',
        color: palette[1],
        data: [{name:'2000', y:146}, {name:'2005', y:257}, {name:'2010', y:191}, {name:'2015', y:163}]
      }, {
        name: 'Hispanic/Latino',
        color: palette[0],
        data: [{name:'2000', y:50}, {name:'2005', y:63}, {name:'2010', y:110}, {name:'2015', y:144}]
      }]
    });
  };
  var build_legend_trend_chart = function () {
    var legend_tpl = '<li><span style="background:{color}">&nbsp;</span>{label}</li>';
    var categories = ['Hispanic/Latino','White','Asian','Black/Af Amer','Amer Indian/Alaska Native','Other*'];
    var legend = [];
    categories.forEach(function (el, i) {
      legend.push(legend_tpl.replace('{label}', el).replace('{color}', palette[i]));
    });
    //console.log(JSON.stringify(legend));
    $('#chartpair0legend').html(legend.join('\n'));
  };

  var build_faculty_rank_chart = function () {
    Highcharts.chart('chartb0', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Hispanic/Latino','White','Asian','Black/Af Amer','Amer Indian/Alaska Native','Other*']
      },
      yAxis: {
        min: 0,
        max: 400,
        tickmarkPlacement: 'off',
        title: {
          text: ''
        },
        labels: {
          enabled: false
        }
      },
      legend: {
        enabled: false,
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'd',
        color: 'transparent',
        data: [80, 60, 20, 80, 60, 70]
      }, {
        name: 'Lecturer',
        data: [{color: palette[0], y:20}, {color: palette[1], y:40}, {color: palette[2], y:80}, {color: palette[3], y:20}, {color: palette[4], y:40}, {color: palette[5], y:30}]
      }, {
        name: 'c',
        color: 'transparent',
        data: [80, 60, 20, 80, 40, 30]
      }, {
        name: 'Assistant',
        data: [{color: palette[0], y:20}, {color: palette[1], y:40}, {color: palette[2], y:80}, {color: palette[3], y:20}, {color: palette[4], y:60}, {color: palette[5], y:70}]
      }, {
        name: 'b',
        color: 'transparent',
        data: [70, 60, 60, 80, 50, 50]
      }, {
        name: 'Associate',
        data: [{color: palette[0], y:30}, {color: palette[1], y:40}, {color: palette[2], y:40}, {color: palette[3], y:20}, {color: palette[4], y:50}, {color: palette[5], y:50}]
      }, {
        name: 'a',
        color: 'transparent',
        data: [49, 69, 59, 29, 79, 39]
      }, {
        name: 'Professor',
        data: [{color: palette[0], y:50}, {color: palette[1], y:30}, {color: palette[2], y:40}, {color: palette[3], y:70}, {color: palette[4], y:20}, {color: palette[5], y:60}]
      }]
    });
  };

  var init = function () {
    //build_students_chart();
    //build_faculty_all_chart();
    //place_labelled_icons(svg);
    
    build_students_trend_chart();
    //build_faculty_all_trend_chart();
    build_faculty_rank_chart();
    build_legend_trend_chart();
    console.log('test');
  };
  init();
}());