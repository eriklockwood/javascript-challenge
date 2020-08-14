// from data.js
var tableData = data;

// Select the table body
var tbody = d3.select("tbody");

// Select the filter form & button
var button = d3.select("#filter-btn");
var form = d3.select("#filter-form");

// Event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit",runEnter);

//generate full table on load
data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });
});

function runEnter() {

    var filterDate = ""

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputValue = d3.select("#datetime").property("value");

    // Print the value to the console
    console.log(inputValue);
    console.log(typeof inputValue)
    //set global var filterDate = filter form input
    filterDate = inputValue

    var selection = tableData.filter(sighting => sighting.datetime === filterDate)
    console.log(selection)

    //clear any old table data before generating new table
    tbody.selectAll("tr").remove();

    if (filterDate === "") {
        //load complete table if filter field is empty
        tableData.forEach((sighting) => {
            var row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
        });
    }
    else {
        //append selected sightings based on supplied filter date 
        selection.forEach((sighting) => {
            var row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
        });
    }
}