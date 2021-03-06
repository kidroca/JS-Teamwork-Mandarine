/*
 Module for creating a bubble type chart via SVG.
 
 The module consists of the following:
	1. Variable declarations. Main categories of variables are:
		- for the chart,
		- for the div container,
		- for the movie properties
	2. In the Hidden functions section there are two functions.
		2.1	 giveChartData returns the data needed for the chart creation
			In it a call to createData is made.
		2.2  giveOptions returns the options (they point to the data generated by giveChartData).
			It is a static result. It is called just before the chart creation in createChart.
	    2.3  createHolder is a function that creates a div to act as a container for the chart.
			It also sets a style to it, namely .display, .width, .height
		2.4 createData uses the database methods to get information for the movies.
	3. Create the chart section contains:
		3.1 the function createChart, which calls the helper function createHolder, gives values to
			chartData and options via the functions giveChartData and giveOptions, then
			creates a new object instance with the help of the library CanvasJS and stores
			it in the variable chart. The last thing is the rendering itself.
	
	The module returns an object that has two properties:
		- draw - makes a call to createChart
		- remove - the whole div container is removed from index.html		
 */

var bubbleChart = (function(database) {

		var chart,
			container,
			children,
			bubbleHolder,
			options,
			titles,
			chartData,
			ratings,
			genres,
			durations, 
			ticketPrices, 
			actionFactors,
			comedyFactors,
			dramaFactors,
			j,
			chartIsDrawn = false;
	
			
// *******************************************************************************
// hidden functions

		//** serves as a wrapper for the chartData array */
		function giveChartData() { 
			var chartData = [
				{
					type:              "bubble",
					legendText:        "Size of Bubble Represents Action Factor",
					showInLegend:      true,
					legendMarkerType:  "circle",
					legendMarkerColor: "grey",
					toolTipContent:    "<span style='\"'color:{color};'\"'><strong>{name}</strong></span>" +
									   "<br/> <strong>Rating</strong> {y}" +
									   "<br/> <strong>Action Factor</strong> {z}" +
									   "<br/> <strong>Comedy Factor</strong> {comedyFactor}" +
									   "<br/> <strong>Drama Factor</strong> {dramaFactor}" +
									   "<br/> <strong>Genre</strong> {genre}" +								   
									   "<br/> <strong>Ticket Price</strong> {ticketPrice}" +								   
									   "<br/> <strong>Duration</strong> {duration}",
									   			
					dataPoints: createData()
				}
			];

			return chartData;
		}
		
		//** serves as a wrapper for the options; */
		function giveOptions() {
			var options = {
				zoomEnabled:      true,
				animationEnabled: true,
				backgroundColor: null,
				title:            
				{
					text: "Movies by Rating" // TODO: Connect with the db
				},
				axisX:  {
					title:   "Number of movies",
					gridColor: "gray",
					interval : 1
				},
				axisY: {
					title: "Rating",
					gridColor: "gray"
				},
	
				legend: {
					verticalAlign:   "bottom",
					horizontalAlign: "left"
	
				},
				data:   chartData
			};

			return options;
		}						
		
		//** Creates the div and hides everything else in the parent div */
		function createHolder() {
			// create the bubble-holder div
			bubbleHolder = document.createElement("div");
			bubbleHolder.setAttribute("id", "bubble-holder");
			bubbleHolder.style.display = "block";
			bubbleHolder.style.width = "1024px";
			bubbleHolder.style.height = "600px";
				
			// get the parent element, a.k.a. <div id="content">...
			container = document.getElementById("content");
			
			// get all the elements in the parent and hide them;
			children = container.children;
			for (var i = 0; i < children.length; i += 1) {
				children[i].style.display = "none";
			}
			
			// hook it to <div id="content">
			container.appendChild(bubbleHolder);
		}
		
		
		//** Creates sets of data via connecting to the database. */
		function createData() {
			var dataObjects,
			    deltaObject;
				
						
			// Get data from the database about all the movies
			titles = database.getTitles();
			
			ratings = database.getGivenPropertyValues('Rating');
			genres =  database.getGivenPropertyValues('Genre');
			durations = database.getGivenPropertyValues('Duration');
			ticketPrices = database.getGivenPropertyValues('Ticket Price');
			actionFactors = database.getGivenPropertyValues('Action Factor');
			comedyFactors = database.getGivenPropertyValues('Comedy Factor');
			dramaFactors = database.getGivenPropertyValues('Drama Factor');
						
			dataObjects = [];
			
			for(j = 0; j < titles.length; j += 1) {
				deltaObject = {
					x: j + 1,
					y: ratings[j],
					z: actionFactors[j],
					name: titles[j],
					genre: genres[j],
					ticketPrice: ticketPrices[j],
					duration: durations[j],
					comedyFactor: comedyFactors[j],
					dramaFactor: dramaFactors[j]
					
				};				
				dataObjects.push(deltaObject);
			} // end of for loop
			
			return dataObjects;
		}
				
// *******************************************************************************	
// Create the chart

        //** Creates the div that contains the chart  and then the chart itself. */
		function createChart() {
			createHolder();
			chartData = giveChartData();
			options = giveOptions();
			chart = new CanvasJS.Chart("bubble-holder", options);
			chart.render();
		}

		bubbleChart = {
			draw: function() {
				if (chart) {
					bubbleHolder.remove();
					
				}
				
				createChart();
				chartIsDrawn = true;
			},

			remove: function() {
				bubbleHolder.innerHTML = '';
				bubbleHolder.style.display = 'none';
				chartIsDrawn = false;
			},

			isDrawn: function() {
				return chartIsDrawn;
			}
		};

		return bubbleChart;
}(movieDatabase));