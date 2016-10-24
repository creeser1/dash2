(function () {
	'use strict';
	var create_chart = function (config, data) {
		$('#chart1').empty();
		$('#chart1').highcharts({
			chart: {
				type: 'bubble',
				plotBorderWidth: 1,
				zoomType: 'xy'
			},
			credits: {
				enabled: false
			},
			legend: {
				enabled: true
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				gridLineWidth: 1,
				title: {
					text: '% Non-Passing Grades (D,F, W)'
				},
				labels: {
					format: '{value}%'
				}
			},
			yAxis: {
				startOnTick: false,
				endOnTick: false,
				title: {
					text: 'Enrollment'
				},
				labels: {
					format: '{value}'
				},
				maxPadding: 0.2,
					zIndex: 3
			},
			tooltip: {
				useHTML: true,
				headerFormat: '<table>',
				pointFormat: '<tr><th colspan="2"><h3>{point.course}</h3></th></tr>' +
					'<tr><th>Enrollment:</th><td>{point.y}</td></tr>' +
					'<tr><th>DFW Rate:</th><td>{point.x}%</td></tr>' +
					'<tr><th>Impact:</th><td>{point.z}</td></tr>',
				footerFormat: '</table>',
				followPointer: true
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},
			series: data
		});
	};

	var expand_data = function (obj) {
		var out = [];
		var data = obj.data;
		var key1 = obj.key1;
		var key2 = obj.key2;
		var key3 = obj.key3;
		var key4 = obj.key4;
		Object.keys(data).forEach(function (ts) {
			var termset = data[ts];
			var ord = key1[ts][0];
			var term = key1[ts][1];
			Object.keys(termset).forEach(function (ct) {
				var typeset = termset[ct];
				var type = key2[ct][0];
				Object.keys(typeset).forEach(function (cc) {
					var coursecode = typeset[cc];
					var code = key3[cc][0];
					var title2 = key3[cc][1];
					var title = code + ' : ' + title2;
					var xz = key4[coursecode];
					var x = xz[0];
					var z = xz[1];
					var big = {
						"Year_Term": term,
						"Course_Code": code,
						"CourseTitle": title,
						"CourseTitle2": title2,
						"Course_Type": type,
						"x": x,
						"y": z/x,
						"z": z,
						"date_order": ord
					};
					out.push(big);
				});
			});
		});
		return out;
	};

	var select_data = function (data, term) {
		var series = [];
		var types = [];
		var top3 = [];
		var card = [];
		var getord = function (code) {
			if (card.hasOwnProperty(code)) {
				return '#' + card[code];
			} else {
				return '';
			}
		};
		data.key2.forEach(function (el) {
			types.push(el[0]);
		});
		types.forEach(function (type, i) { 
			var output = [];
			var selected = data.data[term][i];
			Object.keys(selected).forEach(function (key) {
				var val = selected[key];
				var xz = data.key4[val];
				var z = xz[1];
				var code = data.key3[key][0];
				top3.push([z, code])
			});
			Object.keys(selected).forEach(function (key) {
				var val = selected[key];
				var xz = data.key4[val];
				var z = xz[1];
				var y = xz[0];
				var code = data.key3[key][0];
				var title2 = data.key3[key][1];
				output.push({"z": z, "x": Math.round(1000.0 *  z / y) / 10, "y": y, "name": "", "course": title2, "code": code});
			});
			series.push({name: type, data: output});
		});
		console.log(JSON.stringify(top3));
		top3.sort(function (a, b) {return b[0] - a[0];});
		top3 = top3.filter(function (el, i, a) {return i < 1 || el[1] !== a[i - 1][1]});
		top3 = top3.slice(0, 3);
		console.log(JSON.stringify(top3));
		top3.forEach(function (item, i) {
			card[item[1]] = i + 1;
		});
		series.forEach(function (s) {
			s.data.forEach(function (d) {
				d.name = getord(d.code);
			});
		});
		return series;
	};

	var construct_data_url = function (config) {
		var pattern = / /g;
		var path_tpl = '/data/botnek/{campus}/{major}_min.json';
		var path = path_tpl.replace('{campus}', config.campus)
			.replace('{major}', config.major)
			.replace(pattern, '_');

		return path;
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
	
	var populate_filter4 = function (items) {
		var output = [];
		items.forEach(function (el, i) {
			var item = el[1];
			var option_tpl = '<option value="{val}">{text}</option>';
			if (i === 0) {
				option_tpl = '<option value="{val}" selected>{text}</option>';
			}
			output.push(option_tpl.replace('{val}', item).replace('{text}', item));
		});
		return output.join('');
	};

	var init = function () {
		// default configuration
		var config = {
			'data_url': '', 
			'campus': 'Long Beach', 
			'college': 'College of Business Administration', 
			'major': 'Management and Human Resources', 
			'period': 'All Academic Years'};
		config.data_url = construct_data_url(config);

		// change event listener for major control
		$('#dataset_filter3').on('change', function (e) {
			config.major = e.target.value;
			config.data_url = construct_data_url(config);
			load_data(config, function (data, config) {
				$('#dataset_filter4').html(populate_filter4(data.key1));
				create_chart(config, select_data(data, '0', '0'));
			});
		});

		// change event listener for period control
		$('#dataset_filter4').on('change', function (e) {
			config.period = e.target.value;
			load_data(config, function (data, config) {
				var term;// = data.key1.indexOf(config.period);
				data.key1.forEach(function (el, i) { // replace with indexed search
					if (el[1] === config.period) {
						term = i;
					}
				});
				if (term !== -1) {
					create_chart(config, select_data(data, term, '0'));
				}
			});
		});

		// use default state as page loads initially
		load_data(config, function (data, config) {
			$('#dataset_filter4').html(populate_filter4(data.key1));
			create_chart(config, select_data(data, '0', '0'));
		});
	};
	$(init());
}());