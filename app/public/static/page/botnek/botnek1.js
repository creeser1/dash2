$(function () {
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
				enabled: false
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
				pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
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
			series: [{
				data: data
			}]

		});
	};

	var load_data = function () {
		var data =  [
					{ x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
					{ x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
					{ x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
					{ x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
					{ x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
					{ x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
					{ x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
					{ x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
					{ x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
					{ x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
					{ x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
					{ x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
					{ x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
					{ x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
					{ x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
				];
		return data;
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

	var select_data = function (data, term, type) {
		var selected = data.data[term][type];
		var termname = data.key1[term][1];
		var typename = data.key2[type][0];
		var output = [];
		var top3 = [];
		Object.keys(selected).forEach(function (key) {
			var val = selected[key];
			var xz = data.key4[val];
			var z = xz[1];
			var code = data.key3[key][0];
			top3.push([z, code])
		});
		top3.sort(function (a, b) {return b[0] - a[0];});
		top3 = top3.slice(0, 3);
		//console.log(JSON.stringify(top3));
		var card = [];
		top3.forEach(function (item, i) {
			card[item[1]] = i + 1;
		});
		var getord = function (code) {
			if (card.hasOwnProperty(code)) {
				return '#' + card[code];
			} else {
				return '';
			}
		};
		Object.keys(selected).forEach(function (key) {
			var val = selected[key];
			var xz = data.key4[val];
			var z = xz[1];
			var y = xz[0];
			var code = data.key3[key][0];
			var title2 = data.key3[key][1];
			output.push({"z":z, "x":Math.round(1000.0* z/y)/10, "y":y, "name": getord(code), "country":title2 });
		});
		return output;
	};

	var load_data2 = function () {
		var obj ={"key1":[[20240,"All Academic Years"],[20209,"2014 - Academic Year"],[20120,"2015 - Spring"],[19936,"2014 - Fall"],[19844,"2013 - Academic Year"],[19755,"2014 - Spring"],[19571,"2013 - Fall"],[19479,"2012 - Academic Year"],[19390,"2013 - Spring"],[19206,"2012 - Fall"],[19114,"2011 - Academic Year"],[19024,"2012 - Spring"],[18840,"2011 - Fall"]],"key2":[["All"],["Upper Division"],["General Education (GE)"],["Upper Division GE"]],"key3":[["HRM360","Organizational Behavior"],["MGMT300","Princip of Mgmt and Operations"],["MGMT425","Business Strategy and Policy"],["HRM361","The Human Resource Function"],["MGMT300","Principles of Management"],["MGMT454","Organization Theory"],["SCM411","Operations Planning and Contrl"],["MGMT421","Entrepship New Ventre Creation"],["MGMT413","Managing Quality Productivity"],["SCM414","Supply Chain Management"],["MGMT406","International Business Policy"],["HRM462","Labor Management Relations"],["MGMT455","Managerl Decsn Making Process"],["MGMT426","Mgmt and Information Systems"],["HRM446","Leadership and Motivation"],["SCM410","Logistics Management"],["HRM465","Staffing and Performance Mgmt"],["MGMT326","Management and Society"],["MGMT430","Project Management"],["MGMT456","Service Management"],["HRM458","Managing Culture and Diversity"],["HRM463","Org Training and Development"],["HRM460","Curr Issues in Hum Res Mgmt"],["HRM445","Compensation Administration"],["HRM458","Managing Culture"],["MGMT412","Production Control"],["MGMT405","International Comparative Mgmt"],["HRM465","Personnl Selection and Appraisal"],["HRM440","Collective Bargaining"],["HRM465","Selection and Appraisal"]],"key4":[[5739,721],[5803,597],[4303,147],[1364,128],[3237,99],[618,52],[1033,34],[631,31],[584,19],[521,16],[599,15],[258,12],[246,11],[366,11],[167,10],[612,10],[598,9],[255,7],[327,6],[385,6],[84,5],[248,5],[265,5],[183,4],[225,4],[201,3],[107,2],[187,2],[304,2],[41,1],[17,0],[50,0],[1224,147],[1296,133],[318,31],[888,30],[108,5],[108,4],[111,4],[106,4],[62,3],[64,2],[44,2],[159,2],[43,2],[196,2],[62,1],[84,1],[91,1],[49,1],[55,1],[68,0],[41,0],[86,0],[618,80],[570,71],[172,15],[495,15],[59,3],[55,3],[60,3],[31,2],[34,1],[20,1],[33,1],[72,1],[103,1],[29,0],[37,0],[39,0],[57,0],[64,0],[19,0],[35,0],[654,76],[678,53],[146,16],[393,15],[71,5],[56,3],[29,2],[25,2],[95,2],[31,1],[30,1],[35,1],[47,1],[48,1],[93,1],[45,1],[45,0],[16,0],[1166,140],[1207,109],[783,25],[296,22],[252,4],[125,4],[126,4],[109,4],[116,3],[75,3],[62,2],[57,2],[133,2],[61,2],[44,1],[54,1],[71,0],[69,0],[33,0],[127,0],[546,68],[577,60],[144,12],[435,10],[129,4],[27,2],[36,2],[63,1],[40,1],[59,1],[59,0],[36,0],[49,0],[65,0],[28,0],[24,0],[620,72],[630,49],[348,15],[152,10],[60,4],[62,4],[35,2],[70,1],[25,0],[22,0],[20,0],[123,0],[32,0],[979,137],[1131,106],[222,25],[806,18],[259,18],[113,7],[135,4],[48,3],[158,3],[45,3],[69,2],[74,2],[73,2],[109,1],[37,1],[73,0],[67,0],[118,0],[569,80],[624,65],[110,15],[140,14],[441,8],[38,2],[26,1],[17,1],[38,1],[65,1],[69,1],[54,0],[38,0],[34,0],[23,0],[410,57],[507,41],[112,10],[365,10],[75,7],[119,4],[29,3],[66,3],[37,2],[65,2],[44,0],[14,0],[1008,161],[575,58],[760,26],[183,24],[148,12],[118,8],[119,7],[125,7],[119,6],[104,5],[47,2],[53,1],[21,1],[61,1],[108,0],[40,0],[60,0],[463,82],[100,11],[397,8],[80,6],[51,5],[83,4],[52,3],[60,2],[42,2],[24,2],[36,1],[13,0],[545,79],[363,18],[83,13],[65,8],[65,5],[67,4],[77,4],[27,1],[18,1],[21,0],[11,0],[53,0]],"data":{"0":{"0":{"0":0,"1":1,"2":2,"3":3,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24,"24":25,"25":27,"26":28,"27":29,"28":30,"29":31},"1":{"0":0,"1":1,"2":2,"3":3,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24,"24":25,"25":27,"26":28,"27":29,"28":30,"29":31},"2":{"2":4,"20":26,"24":25},"3":{"2":4,"20":26,"24":25}},"1":{"0":{"0":32,"1":33,"2":35,"3":34,"5":45,"6":37,"7":38,"8":47,"9":39,"10":44,"11":41,"12":36,"14":43,"15":53,"16":48,"17":50,"18":46,"19":20,"20":26,"21":40,"22":52,"23":42,"25":49,"26":51},"1":{"0":32,"1":33,"2":35,"3":34,"5":45,"6":37,"7":38,"8":47,"9":39,"10":44,"11":41,"12":36,"14":43,"15":53,"16":48,"17":50,"18":46,"19":20,"20":26,"21":40,"22":52,"23":42,"25":49,"26":51},"2":{"2":35,"20":26},"3":{"2":35,"20":26}},"2":{"0":{"0":55,"1":54,"2":57,"3":56,"5":66,"6":60,"7":50,"8":69,"9":58,"10":44,"11":62,"12":68,"14":71,"15":52,"16":70,"17":63,"18":67,"19":59,"20":65,"21":61,"22":73,"23":72,"25":64},"1":{"0":55,"1":54,"2":57,"3":56,"5":66,"6":60,"7":50,"8":69,"9":58,"10":44,"11":62,"12":68,"14":71,"15":52,"16":70,"17":63,"18":67,"19":59,"20":65,"21":61,"22":73,"23":72,"25":64},"2":{"2":57,"20":65},"3":{"2":57,"20":65}},"3":{"0":{"0":74,"1":75,"2":77,"3":76,"5":88,"6":87,"7":79,"8":89,"9":86,"11":84,"12":78,"14":82,"15":90,"16":62,"17":73,"18":64,"19":80,"20":85,"21":83,"23":81,"25":91,"26":51},"1":{"0":74,"1":75,"2":77,"3":76,"5":88,"6":87,"7":79,"8":89,"9":86,"11":84,"12":78,"14":82,"15":90,"16":62,"17":73,"18":64,"19":80,"20":85,"21":83,"23":81,"25":91,"26":51},"2":{"2":77,"20":85},"3":{"2":77,"20":85}},"4":{"0":{"0":92,"1":93,"2":94,"3":95,"5":96,"6":98,"7":97,"8":99,"9":100,"10":103,"11":107,"12":101,"14":104,"15":111,"16":105,"17":102,"18":51,"21":106,"22":85,"23":31,"24":108,"25":110,"26":109},"1":{"0":92,"1":93,"2":94,"3":95,"5":96,"6":98,"7":97,"8":99,"9":100,"10":103,"11":107,"12":101,"14":104,"15":111,"16":105,"17":102,"18":51,"21":106,"22":85,"23":31,"24":108,"25":110,"26":109},"2":{"2":94,"24":108},"3":{"2":94,"24":108}},"5":{"0":{"0":112,"1":113,"2":115,"3":114,"5":116,"6":71,"7":125,"8":124,"9":121,"10":103,"11":62,"12":120,"14":119,"15":122,"16":118,"17":117,"18":123,"21":127,"22":85,"23":126,"24":73,"25":110},"1":{"0":112,"1":113,"2":115,"3":114,"5":116,"6":71,"7":125,"8":124,"9":121,"10":103,"11":62,"12":120,"14":119,"15":122,"16":118,"17":117,"18":123,"21":127,"22":85,"23":126,"24":73,"25":110},"2":{"2":115,"24":73},"3":{"2":115,"24":73}},"6":{"0":{"0":128,"1":129,"2":130,"3":131,"5":139,"6":133,"7":132,"8":132,"9":103,"11":138,"12":134,"14":135,"15":51,"16":136,"17":73,"18":140,"21":63,"23":137,"24":123,"26":109},"1":{"0":128,"1":129,"2":130,"3":131,"5":139,"6":133,"7":132,"8":132,"9":103,"11":138,"12":134,"14":135,"15":51,"16":136,"17":73,"18":140,"21":63,"23":137,"24":123,"26":109},"2":{"2":130,"24":123},"3":{"2":130,"24":123}},"7":{"0":{"0":141,"1":142,"2":144,"3":143,"5":145,"6":146,"7":154,"8":147,"9":149,"10":150,"11":68,"12":153,"13":148,"14":152,"15":158,"17":46,"18":157,"21":49,"22":138,"23":155,"24":151,"25":110,"26":156,"29":31},"1":{"0":141,"1":142,"2":144,"3":143,"5":145,"6":146,"7":154,"8":147,"9":149,"10":150,"11":68,"12":153,"13":148,"14":152,"15":158,"17":46,"18":157,"21":49,"22":138,"23":155,"24":151,"25":110,"26":156,"29":31},"2":{"2":144,"24":151},"3":{"2":144,"24":151}},"8":{"0":{"0":159,"1":160,"2":163,"3":161,"5":162,"6":171,"7":168,"8":169,"9":88,"10":150,"11":173,"12":167,"13":72,"14":164,"15":170,"17":165,"18":172,"21":84,"22":138,"23":166,"24":140,"25":110,"29":126},"1":{"0":159,"1":160,"2":163,"3":161,"5":162,"6":171,"7":168,"8":169,"9":88,"10":150,"11":173,"12":167,"13":72,"14":164,"15":170,"17":165,"18":172,"21":84,"22":138,"23":166,"24":140,"25":110,"29":126},"2":{"2":163,"24":140},"3":{"2":163,"24":140}},"9":{"0":{"0":174,"1":175,"2":177,"3":176,"5":179,"6":178,"7":184,"8":181,"9":183,"11":185,"12":85,"13":180,"14":123,"15":71,"17":123,"18":110,"21":72,"23":138,"24":182,"26":156,"29":137},"1":{"0":174,"1":175,"2":177,"3":176,"5":179,"6":178,"7":184,"8":181,"9":183,"11":185,"12":85,"13":180,"14":123,"15":71,"17":123,"18":110,"21":72,"23":138,"24":182,"26":156,"29":137},"2":{"2":177,"24":182},"3":{"2":177,"24":182}},"10":{"0":{"0":186,"1":187,"2":188,"3":189,"4":5,"5":191,"6":190,"7":195,"8":194,"9":152,"10":197,"11":136,"12":155,"13":192,"14":196,"15":193,"17":65,"18":200,"21":201,"22":198,"23":127,"24":199,"25":62,"26":202,"27":29,"28":30},"1":{"0":186,"1":187,"2":188,"3":189,"4":5,"5":191,"6":190,"7":195,"8":194,"9":152,"10":197,"11":136,"12":155,"13":192,"14":196,"15":193,"17":65,"18":200,"21":201,"22":198,"23":127,"24":199,"25":62,"26":202,"27":29,"28":30},"2":{"2":188,"24":199},"3":{"2":188,"24":199}},"11":{"0":{"0":203,"1":187,"2":205,"3":204,"5":206,"6":208,"7":207,"8":211,"9":86,"10":197,"12":155,"13":209,"14":212,"15":210,"17":213,"18":108,"21":72,"22":198,"23":214,"24":73,"25":62,"27":173,"28":30},"1":{"0":203,"1":187,"2":205,"3":204,"5":206,"6":208,"7":207,"8":211,"9":86,"10":197,"12":155,"13":209,"14":212,"15":210,"17":213,"18":108,"21":72,"22":198,"23":214,"24":73,"25":62,"27":173,"28":30},"2":{"2":205,"24":73},"3":{"2":205,"24":73}},"12":{"0":{"0":215,"2":216,"3":217,"4":5,"5":164,"6":218,"7":226,"8":221,"9":222,"11":136,"13":220,"14":173,"15":219,"17":123,"18":68,"21":224,"23":225,"24":165,"26":202,"27":223},"1":{"0":215,"2":216,"3":217,"4":5,"5":164,"6":218,"7":226,"8":221,"9":222,"11":136,"13":220,"14":173,"15":219,"17":123,"18":68,"21":224,"23":225,"24":165,"26":202,"27":223},"2":{"2":216,"24":165},"3":{"2":216,"24":165}}}};
		//var data = expand_data(obj);
		var data = select_data(obj, '0', '0');
		//console.log(JSON.stringify(data));
		return data;
	};

	var init = function () {
		create_chart({}, load_data2());
	};
	init();
});