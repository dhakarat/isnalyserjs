// init reader (to load csv)
var reader = new FileReader();  


// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


// load file (on button click)
function loadFile() {    
  var file = document.querySelector('input[type=file]').files[0];   

  timeline = createTimeline(0,50, 25);


  reader.addEventListener("load", drawGraph, false);
  if (file) {
    reader.readAsText(file);
  }      
}



// function loadTransmissionsFile() {

// }

// function loadTransmittersFile() {

// }

// function drawGraph() {

// }

// function renderGraph() {

// }




function createTimeline(min, max, stepsize) {
    // console.log('drawing timeline');

    var timeline = [' subgraph {'];
    timeline.push( ' node [shape=none]');
    // var timeline = [];
    for (var i = 0; i < max;) {
        timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 5, arrowhead = None]');
        i = i+stepsize
    }
    timeline.push('}');
    // console.log(timeline);
    return timeline;

}





// draw graph based on selected file
function drawGraph(){
    var dotIndex = 0;
    var timelineIndex = 0;

    // TODO make adjust automatically
    graphviz.width(500);
    graphviz.height(1100);
    
    var dot = ['digraph  {'];
    var data = d3.csvParse(reader.result);
    
    // var timelineMin = d3.min(data, function(d) { return +d.dAH; })
    // var timelineMax = d3.max(data, function(d) { return +d.dAH; })
    
    // console.log(timelineMin);
    // console.log(timelineMax);




    data.forEach((item,i) =>
        dot.push(' ' + item.From + ' -> ' + item.To)
        );


    dot = dot.concat(timeline);

    dot.push('}');

    dot = [dot];

    // turn list of dot commands into string
    var dotLines = dot[dotIndex % dot.length];
    var dotString = dotLines.join('');

    graphviz
        .dot(dotString)
        // .dot(timelineString)
        .render()
        .on('end', function () {
            if (dotIndex != dotString.length) {
                drawGraph();
            }
        });
    dotIndex += 1;
    timelineIndex += 1;
    
}

// placeholder function for buttons
function test(){
    console.log('working...');
}
