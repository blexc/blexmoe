// Alex Chapman
// Falling objects on page
// Original: http://www.blog-switch.com/widget/84964

"use strict";

var bsw_base = "images/";
var bsw_images = new Array('strawberry.gif', 'black_cat.gif', 'music_note.gif', 'music_note2.gif')
var bsw_amount = 2;
var bsw_speed = 0;
var bsw_amplitude = 0;
var bsw_design = 12;
var bsw_off = 1;
var bsw_deleted = 0;
var bsw_dx, bsw_xp, bsw_yp, bsw_am, bsw_stx, bsw_sty;
var bsw_window_width, bsw_window_height, bsw_scroll_height;

var bsw_flakes = new Array();
var bsw_dy = new Array();
var bsw_dx = new Array();
var bsw_xp = new Array();
var bsw_yp = new Array();
var bsw_am = new Array();
var bsw_stx = new Array();
var bsw_sty = new Array();

if (bsw_speed == 0) bsw_speed = 1;
else bsw_speed = bsw_speed + bsw_speed;
bsw_amplitude = bsw_amplitude * 10;

var bsw_no = bsw_amount * 5;
var bsw_started = 0;

function bsw_switch_on() {
	document.getElementById('bsw_switch_off').style.display = "none";
	document.getElementById('bsw_switch_on').style.display = "block";
}

function bsw_switch_off() {
	document.getElementById('bsw_switch_on').style.display = "none";
	document.getElementById('bsw_switch_off').style.display = "block";
}

function bsw_add_onload_event(fnc) {
	if (typeof window.addEventListener != "undefined")
		window.addEventListener("load", fnc, false);
	else if (typeof window.attachEvent != "undefined") {
		window.attachEvent("onload", fnc);
	}
	else {
		if (window.onload != null) {
			var oldOnload = window.onload;
			window.onload = function (e) {
				oldOnload(e);
				window[fnc]();
			};
		}
		else
			window.onload = fnc;
	}
}

function bsw_start(sw) {
	if (bsw_deleted == 1) return;

	var myWidth = 0, myHeight = 0;
	if (typeof (window.innerWidth) == 'number') {
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	}
	else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	}
	else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}

	bsw_window_width = myWidth;
	bsw_window_height = myHeight;

	var i = 0;

	if (bsw_started == 1) {
		if (sw == 1) bsw_switch_off();
		bsw_started = 0;

		for (i = 0; i < bsw_no; ++i)
			document.body.removeChild(bsw_flakes[i]);

		return;
	}

	bsw_started = 1;
	if (sw == 1) bsw_switch_on();

	var h = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

	bsw_scroll_height = h ? h : 0;

	var img_max = bsw_images.length;
	var img = 0;

	for (i = 0; i < bsw_no; ++i) {
		bsw_dx[i] = 0;
		bsw_xp[i] = Math.random() * (bsw_window_width - 100);
		bsw_yp[i] = bsw_scroll_height + Math.random() * bsw_window_height;
		bsw_am[i] = Math.random() * bsw_amplitude;
		bsw_stx[i] = 0.02 + Math.random() / 10;
		bsw_sty[i] = 0.5 * bsw_speed + Math.random();

		var flake = document.createElement('img');

		flake.setAttribute('id', "bsw_flake" + i);
		flake.setAttribute('src', bsw_base + bsw_images[img]);

		document.body.appendChild(flake);

		flake.style.position = "absolute";
		flake.style.zIndex = 100 + i;
		flake.style.visibility = "visible";
		flake.style.width = "32px"
		flake.style.visibility = "visible";

		bsw_flakes[i] = flake;

		if (img == img_max - 1)
			img = 0;
		else
			img++;
	}

	bsw_animate();
}

function bsw_animate() {
	if (bsw_started == 0) return;

	for (var i = 0; i < bsw_no; ++i) {
		bsw_yp[i] -= bsw_sty[i];

		if (bsw_yp[i] < bsw_scroll_height + 10) {
			bsw_xp[i] = Math.random() * (bsw_window_width - bsw_am[i] - 100);
			bsw_yp[i] = bsw_scroll_height + bsw_window_height - 70;
			bsw_stx[i] = 0.02 + Math.random() / 10;
			bsw_sty[i] = 0.5 * bsw_speed + Math.random();
		}

		bsw_dx[i] += bsw_stx[i];

		bsw_flakes[i].style.top = bsw_yp[i] + "px";
		bsw_flakes[i].style.left = bsw_xp[i] + bsw_am[i] * Math.sin(bsw_dx[i]) + "px";
	}

	setTimeout("bsw_animate()", 20);
}

if (bsw_off == 0) {
	bsw_add_onload_event(
		function () {
			if(bsw_started == 0) {
				if(bsw_design == 0) {
					bsw_start(0);
				}
				else {
					bsw_start(1);
				}
			}
		}
	);
}