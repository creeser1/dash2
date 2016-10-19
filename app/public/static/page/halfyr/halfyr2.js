(function () {
	'use strict';

	var cs = { // chart_state
	};
	var create_chart = function (config, data) {
		var fmt1 = function (y,x) {
			//return this.series.name + ': ' + this.y + '%\<br />Year: ' + this.point.name;
			//console.log(this);
			var yearnum = config.period.slice(0,1);
			return 'Year: ' + this.points[0].point.name + '<br />' + this.points[0].point.dif + ' more students could have graduated<br />in ' + yearnum + ' years rather than a semester later';
		};
		var txt1 = 'Grad Rate %';
		$('#chart1').highcharts({
			credits: {
				enabled: false
			},
			chart: {
				type: 'line',
				width: 1050,
				height: 550
			},
			title: {
				text: 'The 2.5-year graduation rate is consistently 11 to 14  percentage points higher than the 2-year rate.'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				type: 'category',
				labels: {
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				title: {
					text: txt1
				}
			},
			tooltip: {
				crosshairs: true,
				split: false,
				shared: true,
				formatter: fmt1
			},
			legend: {
				title: {style: {'color': '#777'}, text: ''},
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom',
				itemWidth: 200,
				labelFormatter: function () {
					var name = this.name;
					if (name === 'all') { // hide gray LinkedTo all item legend element
						return;
					}
					return name;
				}
			},
			plotOptions: {
				"series": {
				lineWidth: 3,
				marker: {radius: 10, symbol: "circle"},
				dataLabels: {enabled: true, padding: 15, format: '{y:.0f}%'}}
			},
			series: data /*[
				{"name": "2 Year Grad Rate", "color": "#37a", "data": [{"name": "2000", "y": 22.0}, {"name": "2001", "y": 22.0}, {"name": "2002", "y":  22.3}, {"name": "2003", "y":   23.4}, {"name": "2004", "y":  25.0}, {"name": "2005", "y":  24.1}, {"name": "2006", "y":  24.1}, {"name": "2007", "y":  23.1}, {"name": "2008", "y":  23.7}, {"name": "2009", "y":  24.8}, {"name": "2010", "y":  27.8}, {"name": "2011", "y":  26.8}, {"name": "2012", "y":  28.4}]},
				{"name": "2.5 Year Grad Rate", "color": "#7a3", "data": [{"name": "2000", "y": 33.0}, {"name": "2001", "y": 32.7}, {"name": "2002", "y":  33.6}, {"name": "2003", "y":  34.9}, {"name": "2004", "y":  36.0}, {"name": "2005", "y":  35.7}, {"name": "2006", "y":  35.5}, {"name": "2007", "y":  34.2}, {"name": "2008", "y":  35.6}, {"name": "2009", "y":  37.0}, {"name": "2010", "y":  41.0}, {"name": "2011", "y":  40.3}, {"name": "2012", "y":  41.9}]},
			]*/
		});
	};

	var load_data = (function () {
		var datacache = {}; // in closure
		return function (config, callback) {
			if (datacache.hasOwnProperty(config.data_url)) {
				callback(datacache[config.data_url], config);
			} else {
				$.ajax({
					url: config.data_url,
					datatype: "json",
					success: function (result) {
						var json_object = (typeof result === 'string')
							? JSON.parse(result)
							: result;
						datacache[config.data_url] = json_object;
						callback(json_object, config);
					}
				});
			}
		};
	}());

	var transform_data = function (config, data) {
		var output = [];
		var years = Object.keys(data);
		var yr2 = [];
		var yr25 = [];
		var yr3 = [];
		var yr35 = [];
		var yr4 = [];
		var yr45 = [];
		var yr5 = [];
		var yr55 = [];
		var yr6 = [];
		var yr65 = [];
		var ultimate_year = years.slice(-1)[0];
		var penultimate_year = years.slice(-2,-1)[0];
		//console.log(JSON.stringify([ultimate_year, penultimate_year]));
		years.forEach(function (yr) {
			var row = data[yr];
			//console.log(JSON.stringify(row));
			if (config.type === 'tr') {
				yr2.push({"name": yr, "y": row[0][3], "dif": row[0][0]});
				yr25.push({"name": yr, "y": row[0][4], "dif": row[0][0]});
				yr3.push({"name": yr, "y": row[1][3], "dif": row[1][0]});
				yr35.push({"name": yr, "y": (yr === ultimate_year ? null :row[1][4]), "dif": row[1][0]});
				yr4.push({"name": yr, "y": (yr === ultimate_year ? null : row[2][3]), "dif": row[2][0]});
				yr45.push({"name": yr, "y": (yr === ultimate_year || yr === penultimate_year ? null : row[2][4]), "dif": row[2][0]});
			} else {
				yr4.push({"name": yr, "y": row[2][3], "dif": row[2][0]});
				yr45.push({"name": yr, "y": row[2][4], "dif": row[2][0]});
				yr5.push({"name": yr, "y": row[3][3], "dif": row[3][0]});
				yr55.push({"name": yr, "y": (yr === ultimate_year ? null : row[3][4]), "dif": row[3][0]});
				yr6.push({"name": yr, "y": (yr === ultimate_year ? null : row[4][3]), "dif": row[4][0]});
				yr65.push({"name": yr, "y":  (yr === ultimate_year || yr === penultimate_year ? null :row[4][4])});
			}
		});
		switch (config.period) {
			case '2yr':
				output.push({"name": "2 Year Grad Rate", "color": "#37a", "data": yr2});
				output.push({"name": "2.5 Year Grad Rate", "color": "#7a3", "data": yr25});
				break;
			case '3yr':
				output.push({"name": "3 Year Grad Rate", "color": "#a37", "data": yr3});
				output.push({"name": "3.5 Year Grad Rate", "color": "#3a7", "data": yr35});
				break;
			case '4yr':
				output.push({"name": "4 Year Grad Rate", "color": "#73a", "data": yr4});
				output.push({"name": "4.5 Year Grad Rate", "color": "#a73", "data": yr45});
				break;
			case '5yr':
				output.push({"name": "5 Year Grad Rate", "color": "#53c", "data": yr5});
				output.push({"name": "5.5 Year Grad Rate", "color": "#c53", "data": yr55});
				break;
			case '6yr':
				output.push({"name": "6 Year Grad Rate", "color": "#c35", "data": yr6});
				output.push({"name": "6.5 Year Grad Rate", "color": "#5c3", "data": yr65});
				break;
			default:
				output.push({"name": "2 Year Grad Rate", "color": "#35c", "data": yr2});
				output.push({"name": "2.5 Year Grad Rate", "color": "#3c5", "data": yr25});
				break;
		}
		//console.log(JSON.stringify(years));
		//console.log(JSON.stringify(output));
		return output;
	};
	
	var get_campus_data = function (config, callback) {
		//console.log(JSON.stringify(config));
		load_data(config, function (result) {
			var selection = result[config.campus][config.type];
			//console.log(JSON.stringify(selection));
			var output = transform_data(config, selection);
			//var test_output = [
			//	{"name": "2 Year Grad Rate", "color": "#37a", "data": [{"name": "2000", "y": 22.0}, {"name": "2001", "y": 22.0}, {"name": "2002", "y":  22.3}, {"name": "2003", "y":   23.4}, {"name": "2004", "y":  25.0}, {"name": "2005", "y":  24.1}, {"name": "2006", "y":  24.1}, {"name": "2007", "y":  23.1}, {"name": "2008", "y":  23.7}, {"name": "2009", "y":  24.8}, {"name": "2010", "y":  27.8}, {"name": "2011", "y":  26.8}, {"name": "2012", "y":  28.4}]},
			//	{"name": "2.5 Year Grad Rate", "color": "#7a3", "data": [{"name": "2000", "y": 33.0}, {"name": "2001", "y": 32.7}, {"name": "2002", "y":  33.6}, {"name": "2003", "y":  34.9}, {"name": "2004", "y":  36.0}, {"name": "2005", "y":  35.7}, {"name": "2006", "y":  35.5}, {"name": "2007", "y":  34.2}, {"name": "2008", "y":  35.6}, {"name": "2009", "y":  37.0}, {"name": "2010", "y":  41.0}, {"name": "2011", "y":  40.3}, {"name": "2012", "y":  41.9}]},
			//];
			callback(config, output);
		});
	};

	var populate_filter3 = function (config, data) {
		//console.log(JSON.stringify(config));
		var selection = data[config.campus][config.type];
		//console.log(JSON.stringify(selection));
		var years = Object.keys(selection);
		var ok = {};
		years.forEach(function (yr) {
			//console.log(JSON.stringify([yr, selection[yr]]));
			if (selection[yr][0][3] !== null) {
				ok['2yr'] = true;
			}
			if (selection[yr][1][3] !== null) {
				ok['3yr'] = true;
			}
			if (selection[yr][2][3] !== null) {
				ok['4yr'] = true;
			}
			if (selection[yr][3][3] !== null) {
				ok['5yr'] = true;
			}
			if (selection[yr][4][3] !== null) {
				ok['6yr'] = true;
			}
		});
		//console.log(JSON.stringify(ok));
		var options = [];
		var selectedval;
		var opts = {'2yr': '2-Year and 2.5-Year Grad Rates', '3yr': '3-Year and 3.5-Year Grad Rates', '4yr': '4-Year and 4.5-Year Grad Rates', '5yr': '5-Year and 5.5-Year Grad Rates', '6yr': '6-Year and 6.5-Year Grad Rates'};
		['2yr','3yr','4yr','5yr','6yr'].forEach(function (yr) {
			if (!!ok[yr]) {
				options.push('<option value="' + yr + '">' + opts[yr] + '</option>\n');
				if (!selectedval) {
					selectedval = yr;
				}
			}
		});
		//console.log(JSON.stringify(options));
		config.period = selectedval;
		$('#dataset_filter3').html(options.join(''));
	};
	
	var init = function () {
		var config = {'data_url': '/data/nearhalf_gradrates.json', 'campus': '*CSU System', 'type': 'tr', 'period': '2yr'};
		$('#dataset_filter1').on('change', function (e) {
			config.campus = e.target.value;
			load_data(config, function (result) {
				populate_filter3(config, result);
			});
			get_campus_data(config, function (config, data) {
				create_chart(config, data);
			});
		});
		$('#dataset_filter2').on('change', function (e) {
			config.type = e.target.value;
			load_data(config, function (result) {
				populate_filter3(config, result);
			});
			get_campus_data(config, function (config, data) {
				create_chart(config, data);
			});
		});
		$('#dataset_filter3').on('change', function (e) {
			config.period = e.target.value;
			get_campus_data(config, function (config, data) {
				create_chart(config, data);
			});
		});
		load_data(config, function (result) {
			populate_filter3(config, result);
			get_campus_data(config, function (config, data) {
				create_chart(config, data);
			});
		});

	};
	init();
}());