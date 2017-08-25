(function(doc) {
	//change background of card, when resize viewport.

	const deteatWidth = {
		mobile : 606,
		pc : 2280
	}

	const rule = {
		gray : {
			rgb : '#778899',
			colorSet : {
				one : [1,3,5],
				two : [1,4,5],
				three : [1,3,5]
			}
		},
		comachen : {
			rgb : '#997790',
			colorSet : {
				one : [2,4,6],
				two : [2,3,6],
				three : [2,4,6]
			}
		}
	}

	function detechMediaChangeTiming() {
		const mobileMedia = window.matchMedia('(max-width: '+ deteatWidth.mobile +'px)');
		const pcMedia = window.matchMedia('(max-width: '+ deteatWidth.pc +'px)');
		const ulSelector = "#masters-level .level-section-wrap > section > ul > li:nth-child"

		function changeBackgroundColor(ruleNumber) {
			Object.keys(rule).forEach((color) => {
				rule[color].colorSet[ruleNumber].forEach((v) => {
					doc.querySelector(ulSelector + '(' + v +')').style.backgroundColor = rule[color].rgb;
				})
			});
		}

		mobileMedia.addListener(function(evt) {
			//mobile smaller
			if(evt.matches) changeBackgroundColor('one');
			//mobile larger
			else changeBackgroundColor('two');
		});

		pcMedia.addListener(function(evt) {
			//pc smaller
			if(evt.matches) changeBackgroundColor('two');
			//pc larger
			else changeBackgroundColor('three');
		});
	}

	//RUN
	detechMediaChangeTiming();

})(document);