$(document).ready(function () {

    graph1();
    graph2();

    


})

var graph1 = function () {
    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 728 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.close); });

    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("moisture_data_2.csv", function (error, data) {

        data.forEach(function (d, i) {

            d.date = parseDate(d.date);
            if (d.close == null || d.close == "") {
                var lookUpMin = 1;
                while (data[i - lookUpMin].close == null || data[i - lookUpMin].close == "")
                    lookUpMin++;

                var lookUpMax = 1;
                while ((data[i + lookUpMax].close == null || data[i + lookUpMax].close == "") && i + lookUpMax < data.length)
                    lookUpMax++;

                d.val = (parseInt(data[i - lookUpMin].close) + parseInt(data[i + lookUpMax].close)) / 2;
                d.close = d.val;
            }
            else
                d.val = d.close;

        });


        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, 600]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
}

var graph2 = function () {

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 728 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5).innerTickSize(-height)
    .outerTickSize(0);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(10).innerTickSize(-width)
    .outerTickSize(0);

    // Define the line
    var valueline = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.close); });

    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("moisture_data_2.csv", function (error, data) {

        data = data.splice(data.length - 721, 720);
        for (var i = 0; i < data.length  ; i++) {

            data[i].date = parseDate(data[i].date);
            if (data[i].close == null || data[i].close == "") {
                var lookUpMin = 1;
                while (data[i - lookUpMin].close == null || data[i - lookUpMin].close == "")
                    lookUpMin++;

                var lookUpMax = 1;
                while ((data[i + lookUpMax].close == null || data[i + lookUpMax].close == "") && i + lookUpMax < data.length)
                    lookUpMax++;

                data[i].val = (parseInt(data[i - lookUpMin].close) + parseInt(data[i + lookUpMax].close)) / 2;
                data[i].close = data[i].val;
            }
            else
                data[i].val = data[i].close;
        }

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, 600]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });

}
