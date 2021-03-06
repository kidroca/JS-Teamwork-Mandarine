var pieChart = (function() {
    var r = Raphael('svg-holder'),
        chart,
        title,
        chartIsDrawn = false;


    function createChart() {
        //by creation orders values from max to min, %%.%% calculates each value as part from 100%
        //512, 300 -coordinates, r=200
        var statisticProperty = "Action Factor",
            movieTitles = movieDatabase.getTitles(),
            values = movieDatabase.getGivenPropertyValues(statisticProperty),
            legend = createLegend(movieTitles);

        chart = r.piechart(512, 300, 200, values, {
            legend: legend
        });

        //title of chart
        title = r.text(320, 100, statisticProperty).attr({
            font: "20px sans-serif"
        });

        //hover functions
        chart.hover(function() {
            this.sector.stop();
            this.sector.scale(1.1, 1.1, this.cx, this.cy);

            if (this.label) {
                this.label[0].stop();
                this.label[0].attr({
                    r: 7.5
                });
                this.label[1].attr({
                    "font-weight": 800
                });
            }
        }, function() {
            this.sector.animate({
                transform: 's1 1 ' + this.cx + ' ' + this.cy
            }, 500, "bounce");

            if (this.label) {
                this.label[0].animate({
                    r: 5
                }, 500, "bounce");
                this.label[1].attr({
                    "font-weight": 400
                });
            }
        });
    }

    function createLegend(collection) {
        var i,
            len,
            legend = [];

        for (i = 0, len = collection.length; i < len; i += 1) {
            legend.push("%%.%% - " + collection[i]);
        }

        return legend;
    }


    pieChart = {
        draw: function() {
            if (chart) {
                chart.remove();
                title.remove();
            }
            createChart();
            chartIsDrawn = true;
        },

        remove: function() {
            chart.remove();
            title.remove();
            chartIsDrawn = false;
        },

         isDrawn: function() {
            return chartIsDrawn;
        }
    };

    return pieChart;

}());