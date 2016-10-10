(function () {
	'use strict';

	var cs = { // chart_state
	};
	var create_chart = function (config, data) {
		var fmt1 = function () {
			return this.series.name + ': ' + this.y + '%\<br />Year: ' + this.point.name;
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
			series: [
				{"name": "2 Year Grad Rate", "color": "#37a", "data": [{"name": "2000", "y": 22.0}, {"name": "2001", "y": 22.0}, {"name": "2002", "y":  22.3}, {"name": "2003", "y":   23.4}, {"name": "2004", "y":  25.0}, {"name": "2005", "y":  24.1}, {"name": "2006", "y":  24.1}, {"name": "2007", "y":  23.1}, {"name": "2008", "y":  23.7}, {"name": "2009", "y":  24.8}, {"name": "2010", "y":  27.8}, {"name": "2011", "y":  26.8}, {"name": "2012", "y":  28.4}]},
				{"name": "2.5 Year Grad Rate", "color": "#7a3", "data": [{"name": "2000", "y": 33.0}, {"name": "2001", "y": 32.7}, {"name": "2002", "y":  33.6}, {"name": "2003", "y":  34.9}, {"name": "2004", "y":  36.0}, {"name": "2005", "y":  35.7}, {"name": "2006", "y":  35.5}, {"name": "2007", "y":  34.2}, {"name": "2008", "y":  35.6}, {"name": "2009", "y":  37.0}, {"name": "2010", "y":  41.0}, {"name": "2011", "y":  40.3}, {"name": "2012", "y":  41.9}]},
			]
		});
	};

	var init = function () {
		console.log('hi');
		create_chart();
	};
	init();
}());