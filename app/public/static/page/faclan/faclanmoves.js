(function () {
	'use strict';
	var canvas = document.createElement('canvas');
	var panel = document.querySelector('#rightpanel');
	canvas.id = 'pathway';
	canvas.width="878";
	canvas.height="810";
	canvas.style="position:absolute;left:0;top:0;z-index:1;"
	panel.appendChild(canvas);

	var ctx = canvas.getContext('2d');

	var animatelineh = function (ctx, y, increment, end, finish, callback) {
		if (increment < 0 && end <= finish) {
			window.setTimeout(callback, 0);
			return;
		}
		if (increment > 0 && end >= finish) {
			window.setTimeout(callback, 0);
			return;
		}
		ctx.lineTo(end,y);
		ctx.stroke();
		//recurse
		window.setTimeout(function () {animatelineh(ctx, y, increment, end + increment, finish, callback)}, 0);
	};
	
	var animatelinev = function (ctx, x, increment, end, finish, callback) {
		if (increment < 0 && end <= finish) {
			window.setTimeout(callback, 0);
			return;
		}
		if (increment > 0 && end >= finish) {
			window.setTimeout(callback, 0);
			return;
		}
		ctx.lineTo(x, end);
		ctx.stroke();
		//recurse
		window.setTimeout(function () {animatelinev(ctx, x, increment, end + increment, finish, callback)}, 0);
	};
	
	ctx.beginPath();
	ctx.fillStyle = '#11c0d7';
	ctx.arc(20,275,10,0,2*Math.PI);
	ctx.fill();
	//ctx.closePath();

	ctx.moveTo(30,275);
	ctx.strokeStyle = '#11c0d7';
	ctx.lineWidth = 4.5;
	animatelineh(ctx, 275, 5, 35, 865, function () {
		animatelinev(ctx, 860, 5, 280, 500, function () {
			animatelineh(ctx, 495, -5, 490, 15, function () {
				animatelinev(ctx, 20, 5, 500, 725, function () {
					animatelineh(ctx, 720, 5, 25, 790, function () {
						animatelinev(ctx, 785, 5, 725, 780, function () {
							ctx.beginPath();
							ctx.moveTo(645,720);
							ctx.lineTo(714,680);
							ctx.lineTo(784,720);
							ctx.lineTo(714,760);
							ctx.closePath();
							ctx.fill();
							ctx.stroke();

						});
					});
				});
			});
		});
	});
	//ctx.lineTo(860,275);
	/*
	ctx.lineTo(860,495);
	ctx.lineTo(20,495);
	ctx.lineTo(20,720);
	ctx.lineTo(785,720);
	ctx.lineTo(785,778);
	ctx.stroke();
	*/


	

//*
	var figtitles = document.querySelectorAll('#navpanels a');
	var titles = {};
	var showtitle = function (e) {
		e.preventDefault();
		e.stopPropagation();
		var title = '';
		var element;
		var text = '';
		var tagname = e.target.tagName;
		if (tagname === 'A') {
			element = e.target;
		} else if (tagname === 'FIGURE') {
			element = e.target.parentNode;
		} else if (tagname === 'P' || tagname === 'IMG') {
			element = e.target.parentNode.parentNode;
		} else {
			return;
		}
		text = element.text;
		//text = element.innerText();
		if (!!element.title) {
			titles[element.id] = element.title + '';
			element.title = '';
		}
		var x = 0;
		var y = 0;
		var offsetx = 0;
		var offsety = 0;
		//console.log(JSON.stringify(['pushing', tagname, titles, element.title]))
		offsetx = element.offsetParent.offsetParent.offsetLeft;
		offsety = element.offsetParent.offsetParent.offsetTop;
		x = element.firstElementChild.firstElementChild.x - offsetx;
		y = element.firstElementChild.firstElementChild.y - offsety + 170 + (text.length > 28 ? 20 : 0);
		//console.log(e);
		//console.log(JSON.stringify([y, e.clientY, titles[element.id], text, text.length, tagname]))
		var yplus = tagname === 'P' ? 120 : 0;
		if (e.clientY < y + 170 + yplus) {
			hoverbox.style.left = x + 'px';
			hoverbox.style.top = y + 'px';
			hoverbox.innerHTML = titles[element.id];
			hoverbox.style.visibility = 'visible';
		}
	};
	figtitles.forEach(function (el) {
		el.addEventListener('mouseenter', showtitle, false);
		el.addEventListener('mouseover', showtitle, false);
		el.addEventListener('mouseout', function (e) {
			var id;
			var element;
			var tagname = e.target.tagName;
			if (tagname === 'A') {
				element = e.target;
			} else if (tagname === 'FIGURE') {
				element = e.target.parentNode;
			} else if (tagname === 'P' || tagname === 'IMG') {
				element = e.target.parentNode.parentNode;
			} else {
				return;
			}
			hoverbox.style.visibility = 'hidden';
		}, false);
	});
//*/
})();