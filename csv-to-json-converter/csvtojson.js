"use strict";

function convertCSVtoJSON() {
    let fileInput = document.getElementById('csvFile');
    let file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    let fileType = file.type;
    if (fileType !== 'text/csv') {
        alert('Invalid file type. Please select a CSV file');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let csvData = e.target.result;
        let jsonData = convertCSVtoJson(csvData);
        let jsonFileName = file.name.replace('.csv', '.json');
        downloadJSON(jsonData, jsonFileName);
        displayData(jsonData);
    };
    reader.readAsText(file);
}

function convertCSVtoJson(csvData) {
    let lines = csvData.split('\n');
    let result = [];
    let headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}

function downloadJSON(jsonData, fileName) {
    let blob = new Blob([jsonData], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
}

function displayData(jsonData) {
    let data = JSON.parse(jsonData);
    let tableBody = document.querySelector('#dataTable tbody');

    tableBody.innerHTML = '';

    let headerRow = document.createElement('tr');
    for (let header in data[0]) {
        if (data[0].hasOwnProperty(header)) {
            let headerCell = document.createElement('th');
            headerCell.textContent = header;
            headerRow.appendChild(headerCell);
        }
    }
    tableBody.appendChild(headerRow);

    data.forEach(function (row) {
        let tableRow = document.createElement('tr');
        for (let property in row) {
            if (row.hasOwnProperty(property)) {
                let tableData = document.createElement('td');
                tableData.textContent = row[property];
                tableRow.appendChild(tableData);
            }
        }
        tableBody.appendChild(tableRow);
    });
}