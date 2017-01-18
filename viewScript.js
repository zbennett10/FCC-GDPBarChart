const gdpUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

window.onload = function() {
    getGDP();
}

function getGDP() {
    $.getJSON(gdpUrl, function(gdpData) {
        $.each(gdpData.data, function(key, value) {
            let listElement = document.createElement('li');
            listElement.innerText = value.join(' ');
            document.querySelector('#gdpList').appendChild(listElement);
        });
    });
}
