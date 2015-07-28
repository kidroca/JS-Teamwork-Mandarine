/**
 * Created on 26.7.2015.
 */

var bubbleChart = (function() {

		var chart,
			svgHolder,
			bubbleHolder,
			options;

		bubbleHolder = document.getElementById("bubble-holder");
	    svgHolder = document.getElementById("svg-holder");

		options = {
			zoomEnabled:      true,
			animationEnabled: true,
			backgroundColor: null,
			title:            {
				text: "Fertility Rate Vs Life Expectancy in different countries - 2009"
			},
			axisX:            {
				title:   "Life Expectancy",
				maximum: 85,
				gridColor: "gray"
			},
			axisY:            {
				title: "Fertility Rate",
				gridColor: "gray"

			},

			legend: {
				verticalAlign:   "bottom",
				horizontalAlign: "left"

			},
			data:   [
				{
					type:              "bubble",
					legendText:        "Size of Bubble Represents Population",
					showInLegend:      true,
					legendMarkerType:  "circle",
					legendMarkerColor: "grey",
					toolTipContent:    "<span style='\"'color: {color};'\"'><strong>{name}</strong></span>" +
									   "<br/><strong>Life Exp</strong> {x} yrs" +
									   "<br/> <strong>Fertility Rate</strong> {y}" +
									   "<br/> <strong>Population</strong> {z}mn",

					dataPoints: [
						//{ x: 64.8, y: 2.66, z:12074.4 , name: "India"},
						//  { x: 73.1, y: 1.61, z:13313.8, name: "China"},
						{x: 78.1, y: 2.00, z: 306.77, name: "US"},
						{x: 68.5, y: 2.15, z: 237.414, name: "Indonesia"},
						{x: 72.5, y: 1.86, z: 193.24, name: "Brazil"},
						{x: 76.5, y: 2.36, z: 112.24, name: "Mexico"},
						{x: 50.9, y: 5.56, z: 154.48, name: "Nigeria"},
						{x: 68.6, y: 1.54, z: 141.91, name: "Russia"},

						{x: 82.9, y: 1.37, z: 127.55, name: "Japan"},
						{x: 79.8, y: 1.36, z: 81.90, name: "Australia"},
						{x: 72.7, y: 2.78, z: 79.71, name: "Egypt"},
						{x: 80.1, y: 1.94, z: 61.81, name: "UK"},
						{x: 55.8, y: 4.76, z: 39.24, name: "Kenya"},
						{x: 81.5, y: 1.93, z: 21.95, name: "Australia"},
						{x: 68.1, y: 4.77, z: 31.09, name: "Iraq"},
						{x: 47.9, y: 6.42, z: 33.42, name: "Afganistan"},
						{x: 50.3, y: 5.58, z: 18.55, name: "Angola"}


					]
				}
			]
		};


		function createChart() {

			chart = new CanvasJS.Chart(bubbleHolder, options);
			chart.render();
		}

		bubbleChart = {
			draw: function() {
				if (chart) {
					bubbleHolder.innerHTML = '';
					svgHolder.style.display = "none";
					bubbleHolder.style.display = "none";
				}

				bubbleHolder.style.display = "block";
				createChart();
			},

			remove: function() {
				bubbleHolder.innerHTML = "";//'<svg height="342" version="1.1" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;">';
				bubbleHolder.style.display = "none";
				svgHolder.style.display = "none";
			}
		};

		return bubbleChart;
}());