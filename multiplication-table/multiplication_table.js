function drawTable() {
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    var table = document.getElementById("table");

    table.innerHTML = "";
    
    for (var i = 1; i <= rows; i++) {
        var row = document.createElement("tr");
        for (var j = 1; j <= cols; j++) {
            var cell = document.createElement("td");
            cell.appendChild(document.createTextNode(i * j));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

window.onload = function(){
    document.getElementById("rows").value = 10;
    document.getElementById("cols").value = 10;
    drawTable();
}