// init reader (to load csv)
var reader1 = new FileReader();  
var reader2 = new FileReader();

// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


function loadTransmissionsFile() { 
  // load transmissions file   
  var transmissionsFile = document.querySelector('div.transmissions input[type=file]').files[0];   
  // call buildGraph on load
  reader1.addEventListener("load", buildGraph, false);
  if (transmissionsFile) {
    reader1.readAsText(transmissionsFile);
  }      
}


function loadTransmittersFile() {
  // load transmitters file
  var transmittersFile = document.querySelector('div.transmitters input[type=file]').files[0];   
  // call buildTimeline on load
  reader2.addEventListener("load", buildTimeline, false);
  if (transmittersFile) {
    reader2.readAsText(transmittersFile);
  }      
}


function buildTimeline(stepsize) {
  // get data from transmitters table
  var dataTransmitters = d3.csvParse(reader2.result);
  // get min and max of death dates
  var timelineMin = d3.min(dataTransmitters, function(d) { return +d.dAH; })
  var timelineMax = d3.max(dataTransmitters, function(d) { return +d.dAH; })
  // init timeline subgraph
  var timeline = [' subgraph {'];
  timeline.push( ' node [shape=none]');
  // append new nodes to timeline according to stepsize
  for (var i = timelineMin; i < timelineMax;) {
      timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 5, arrowhead = None]');
      i = i+stepsize
  }
  // complete timeline subgraph
  timeline.push('}');

  return timeline;

}


function buildGraph(timeline) {
  // get data
  var dataTransmissions = d3.csvParse(reader1.result);
  // init graph
  var dot = ['digraph  {'];
  // append nodes and edges to graph based on links specified in data
  dataTransmissions.forEach((item,i) =>
      dot.push(' ' + item.From + ' -> ' + item.To)
      );
  // append timeline to graph
  dot = dot.concat(timeline);
  // and complete it
  dot.push('}');

  return [dot];
}


function renderGraph() {
  // create a graph to draw
  var timeline = buildTimeline(25);
  var graph = buildGraph(timeline);
  // set dimensions
  graphviz.width(500);
  graphviz.height(1100);
  // turn list of dot commands into string
  var dotLines = graph[0 % graph.length];
  var dotString = dotLines.join('');
  // render graph in canvas
  graphviz
      .dot(dotString)
      .render();
}


// placeholder function for buttons
function test(){
    console.log('working...');
}
