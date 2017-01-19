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
    setTimeout(drawGDP, 200);
}

//fetch gross domestic product data
function fetchGDP() {
    $.getJSON(gdpUrl, function(gdpData) {
        $.each(gdpData.data, function(key, value) {
            gdpDataArray.push(value);
            let listElement = document.createElement('li');
            listElement.innerText = value.join(' ');
            listElement.classList.add('list-group-item');
            document.querySelector('.container').appendChild(listElement);  
            
        });
    });
}

//draw graph
function drawGDP() {
    const axes = configureAxes();

    var chart = d3.select('#chart')
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${graphHeight})`)
        .call(axes[0]);

    chart.append("g")
        .attr("class", "y-axis")
        .call(axes[1]);

    console.log(chart);
    console.log(minDate, maxDate);
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

    return [xAxis, yAxis];
}

  


