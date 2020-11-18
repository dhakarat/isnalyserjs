// init reader (to load csv)
var reader = new FileReader();  


// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


// load file (on button click)
function loadFile() {      
  var file = document.querySelector('input[type=file]').files[0];   
  reader.addEventListener("load", drawGraph, false);
  if (file) {
    reader.readAsText(file);
  }      
}


// draw graph based on selected file
function drawGraph(){
    var dotIndex = 0;

    // TODO make adjust automatically
    graphviz.width(500);
    graphviz.height(1100);
    
    var dot = ['digraph  {']
    var data = d3.csvParse(reader.result);
    data.forEach((item,i) =>
        dot.push(' ' + item.From + ' -> ' + item.To)
        );
    dot.push('}');
    dot = [dot];

    var dotLines = dot[dotIndex % dot.length];
    var dotsLines = dots[dotIndex % dots.length];

    var doti = dotLines.join('');
    var dotsi = dotsLines.join('');


    graphviz
        .dot(doti)
        .render()
        .on('end', function () {
            if (dotIndex != doti.length) {
                drawGraph();
            }
        });
    dotIndex += 1;
    
}

// placeholder function for buttons
function test(){
    console.log('working...');
}
