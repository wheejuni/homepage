//등록 URL 변경
//개별등록시 아래 주석 해제
/*
(function() {
	var urls = {
		masters_fe : "",
		masters_be : "",
		masters_ios: "/page/reg"
	}
	var el  = document.querySelector(".program_page");	
	if(el === null) return;
	var pageId = el.id.replace(/masters_/, '');
	var elRegURL = document.querySelector(".pay-desc .btn-common");
	if(!elRegURL) return;
	elRegURL.href = "/page/reg/" + pageId + ".html";
})();
*/


//gantt chart
(function() {
	if(typeof bb === "undefined") return;
	var chart = bb.generate({
		data: {
			x: "x",
			columns: [
				["x", "마스터즈 레벨1", "마스터즈 레벨2", "마스터즈 레벨3", "마스터즈 레벨4"],
				["duration", 100, 20, 20, 20]
			],
			type: "bar"
		},
		axis: {
			rotated: true,
			x: {
				type: "category",
				tick: {
					multiline: false
				}
			},
			y: {
				tick: {
					format: function (x) {
						var fun = function (d) {
							var month = ((d + 70) / 10);
							if(month === 13) month = 1;
							if(month === 14) month = 2;
							if(month === 15) month = 3;
							if(month === 16) month = 4;
							return month + "월";
						}
						return fun(x);
					}
				}
			},
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		tooltip : {
			show:false
		},
		bindto: "#RotatedAxis",
		onbeforeinit: function() {
		},
		onrendered: function() {
			document.querySelector(".RotatedAxis_preview").style.display = "none";
		}
	});

	chart.legend.hide();
	chart.axis.max({
		y: 90,
	 });

	 chart.data.colors({
		duration: "#833939"
	});

	//data parsing
	function setClonedPath(target, step) {
		var base = target.getAttribute("d");
		var xBase = +(base.replace(/\n/g, '').replace(/^M\s*(\d+\.?\d*).*$/, "$1"));
		var xWidth = +(base.replace(/\n/g, '').replace(/^[^L]*L\s+(\d+\.?\d*).*$/, "$1"));
		var xStart = (xWidth) * step;
		//var yStart = +(base.replace(/\n/g, '').replace(/^M[^,]*,(\d+\.*\d*).*$/, "$1"));
		var yStart = +(base.replace(/\n/g, '').replace(/^M\s+[\d.]+,?\s*(\d+\.*\d*).*$/, "$1"));
		var xTwo = xStart + (xWidth-xBase);
		//var yThree = +(base.replace(/\n/g, '').replace(/^[^L]*L[^L]*L[^,]*,(\d+\.?\d*).*$/, "$1"));
		var yThree = +(base.replace(/\n/g, '').replace(/^.+\L\s[\d.]+,?\s*(\d+\.?\d*).*$/, "$1"));

		target.setAttribute("d", "M " + xStart + "," + yStart + " L " + xTwo + "," + yStart + " L " + xTwo + "," + yThree + " L " + xStart + "," + yThree + " z");
	}

	var resizerunner = false;
	function resizeHanlder() {
		if (resizerunner) return;
		resizerunner = true;

		setTimeout(function () {
			var parent = document.querySelector(".bb-shapes");

			//level 2 addition
			var clonedTarget = document.querySelector("#RotatedAxis path:nth-child(2)").cloneNode(true);
			parent.appendChild(clonedTarget);
			setClonedPath(clonedTarget, 4);

			//level 2 move 
			var clonedTarget2 = document.querySelector("#RotatedAxis path:nth-child(2)");
			parent.appendChild(clonedTarget2);
			setClonedPath(clonedTarget2, 1);

			// //level 3 move 
			var clonedTarget3 = document.querySelector("#RotatedAxis path:nth-child(2)");
			parent.appendChild(clonedTarget3);
			setClonedPath(clonedTarget3, 2);

			//level 3 addition
			var clonedTarget44 = document.querySelector("#RotatedAxis path:nth-child(2)").cloneNode(true);
			parent.appendChild(clonedTarget44);
			setClonedPath(clonedTarget44, 3);

			// //level 4 move 
			// var clonedTarget4 = document.querySelector("#RotatedAxis path:nth-child(3)");
			// parent.appendChild(clonedTarget4);
			// setClonedPath(clonedTarget4, 2);

			resizerunner = false;
		}, 800);
	}

	window.addEventListener("resize", resizeHanlder);

	setTimeout(function () {
		var mySVG = document.querySelector("svg");
		//mySVG.setAttribute("height", 450);
		//window.dispatchEvent(new Event('resize'));
	}, 100);

  resizeHanlder();
})();