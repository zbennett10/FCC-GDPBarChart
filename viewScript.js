const gdpUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let gdpDataArray = []; //hold gdp data

const margin  = {
    top: 25,
    right: 10,
    bottom: 10,
    left: 40
}

const graphHeight = 675 - margin.top - margin.bottom;
const graphWidth = 980 - margin.left - margin.right;

window.onload = function() {
    fetchGDP();
    setTimeout(drawGDP, 300);
}

//fetch gross domestic product data
function fetchGDP() {
    $.getJSON(gdpUrl, function(gdpData) {
        $.each(gdpData.data, function(key, value) {
            gdpDataArray.push(value);
        });
    });
}

//draw graph
function drawGDP() {
    const barWidth = Math.round(graphWidth / gdpDataArray.length);
    const axesConfig = configureAxes();

    var chart = d3.select('#chart')
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${graphHeight})`)
        .call(axesConfig.x);

    chart.append("g")
        .attr("class", "y-axis")
        .call(axesConfig.y);

    chart.selectAll('.bar')
        .data(gdpDataArray)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return axesConfig.xscale(new Date(d[0]));
        })
        .attr('y', function(d) {
            return axesConfig.yscale(d[1]);
        })
        .attr('height', function(d) {
            return graphHeight - axesConfig.yscale(d[1]);
        })
        .attr('width', barWidth);
        configureBarStyle(chart);
}

//configure the scale for the x and y axes
function configureAxes() {
    const minDate = new Date(gdpDataArray[0][0]);
    const maxDate = new Date(gdpDataArray[gdpDataArray.length - 1][0]);

    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, d3.max(gdpDataArray, function(d) {
            return d[1];
        })]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(10);

    const yAxis = d3.axisLeft(yScale);

    return {
        x: xAxis,
        y: yAxis,
        xscale: xScale,
        yscale: yScale
    };
}

//add event listeners that configure style for bars on chart
function configureBarStyle(chart) {
    console.log(gdpDataArray[0][1]);
    const chartGroup = chart._groups[0][0].children;
    const bars = $.makeArray(chartGroup).slice(2);
    const gdpConstant = 28.226093;
    bars.forEach(bar => {
        bar.onmouseover = function() {
            this.classList.add('barHover');
            var gdp = (this['height'].baseVal.value * gdpConstant).toFixed(1);
            $(`<span>$${gdp} Billion</span>`).css('text-align', 'center').appendTo("#display");
        }
        bar.onmouseout = function() {
            this.classList.remove('barHover');
            $(`#display`).empty();
        }
    });
}
  


