(function () {
	'use strict';

	var animatelinexy = function (ctx, axis, xy, increment, end, finish, callback) {
		if ((increment < 0 && end <= finish) || (increment > 0 && end >= finish)) {
			window.setTimeout(callback, 0);
			return;
		}
		if (axis === 'x') {
			ctx.lineTo(end, xy);
		} else {
			ctx.lineTo(xy, end);
		}
		ctx.stroke();
		//recurse
		window.setTimeout(function () {animatelinexy(ctx, axis, xy, increment, end + increment, finish, callback)}, 0);
	};

	var create_path_animation = function (canvasid, panelid, width, height) {
		var canvas = document.createElement('canvas');
		var panel = document.querySelector('#' + panelid);
		canvas.id = canvasid;
		canvas.width = width;
		canvas.height = height;

		canvas.id = canvasid;
		panel.appendChild(canvas);
		
		var ctx = canvas.getContext('2d');

		ctx.strokeStyle = '#11c0d7';
		ctx.fillStyle = '#11c0d7';
		ctx.lineWidth = 4.5;

		ctx.arc(20,275,9,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(30,275);

		animatelinexy(ctx, 'x', 275, 5, 35, 865, function () {
			animatelinexy(ctx, 'y', 860, 5, 280, 500, function () {
				animatelinexy(ctx, 'x', 495, -5, 490, 15, function () {
					animatelinexy(ctx, 'y', 20, 5, 500, 725, function () {
						animatelinexy(ctx, 'x', 720, 5, 25, 790, function () {
							animatelinexy(ctx, 'y', 785, 5, 725, 780, function () {
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

		var figtitles = document.querySelectorAll('#navpanels a'); // a wraps figure wraps img and p
		var titles = {}; // closure dict keeps anchor title text after native hover display defeated

		var showtitle = function (e) {
			e.preventDefault(); // wishing native title hover effect was defeatable
			e.stopPropagation();
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
			var text = element.text;
			if (!!element.title) {
				titles[element.id] = element.title + ''; // by value only, not by ref
				element.title = ''; // defeat native hover display
			}
			var x = 0; // within panel
			var y = 0; // within panel
			var offsetx = 0; // panel parent offset
			var offsety = 0; // panel parent offset
			var height = 170; // y offset needed when hovering over figure img
			var pheight = 120; // additional y offset needed when hovering over figure caption
			var lineheight = 20; // additional y required by wrapped caption
			var pcharwidth = 28; // max number of characters on first line of figure caption
			offsetx = element.offsetParent.offsetParent.offsetLeft;
			offsety = element.offsetParent.offsetParent.offsetTop;
			x = element.firstElementChild.firstElementChild.x - offsetx;
			y = element.firstElementChild.firstElementChild.y - offsety + height + (text.length > pcharwidth ? lineheight : 0);
			var yplus = tagname === 'P' ? pheight : 0;
			if (e.clientY < y + height + yplus) {
				hoverbox.style.left = x + 'px';
				hoverbox.style.top = y + 'px';
				hoverbox.innerHTML = titles[element.id];
				hoverbox.style.visibility = 'visible';
			}
		};

		//figtitles.forEach(function (el) {
		var el;
		//console.log(figtitles);
		for (el in figtitles) { // because ie fails on figtitles.forEach
			if (figtitles.hasOwnProperty(el)) {
				//console.log(el);
				figtitles[el].addEventListener('mouseenter', showtitle, false);
				figtitles[el].addEventListener('mouseover', showtitle, false);
				figtitles[el].addEventListener('mouseout', function (e) {
					hoverbox.style.visibility = 'hidden';
				}, false);
			}
		}
	}; // end create_path_animation
	
	var init = function () {
		create_path_animation(
			'pathway',
			'rightpanel',
			'878',
			'810'
		);
	};
	init();
})();