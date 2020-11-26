// init reader (to load csv)
var transmissionsReader = new FileReader();  
var transmittersReader = new FileReader();

// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


function loadTransmissionsFile() { 
  // load transmissions file   
  var transmissionsFile = document.querySelector('div.transmissions input[type=file]').files[0];   
  // call buildGraph on load
  transmissionsReader.addEventListener("load", buildGraph, false);
  if (transmissionsFile) {
    transmissionsReader.readAsText(transmissionsFile);
  }      
}


function loadTransmittersFile() {
  // load transmitters file
  var transmittersFile = document.querySelector('div.transmitters input[type=file]').files[0];   
  // call buildTimeline on load
  transmittersReader.addEventListener("load", buildTimeline, false);
  if (transmittersFile) {
    transmittersReader.readAsText(transmittersFile);
  }      
}


function buildTimeline(stepsize) {
  // get data from transmitters table
  var dataTransmitters = d3.csvParse(transmittersReader.result);
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


function buildTimelineNew(stepsize) {
  // get data from transmitters table
  var dataTransmitters = d3.csvParse(transmittersReader.result);
  // get min and max of death dates
  var timelineMin = d3.min(dataTransmitters, function(d) { return +d.dAH; })
  var timelineMax = d3.max(dataTransmitters, function(d) { return +d.dAH; })
  // init timeline subgraph
  var timeline = [' subgraph {'];
  timeline.push( ' node [shape=none]');

  var timelineList = [];
  // append new nodes to timeline according to stepsize
  for (var i = timelineMin; i < timelineMax;) {
      timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 3, arrowhead = None]');
      timelineList.push(i); // also have a list of timeline values
      i = i+stepsize;
  }
  timelineList.push(85);
  // ranking constraints
  // timeline.push(' rank="same"  85 G');

  // complete timeline subgraph
  timeline.push('}');

  return [timeline, timelineList];

}

function buildGraphNew(timeline, constraints) {
  // get data from loaded files
  var dataTransmitters = d3.csvParse(transmittersReader.result);
  var dataTransmissions = d3.csvParse(transmissionsReader.result);
  // init dot source
  var dot = ['digraph  {'];
  // add nodes
  dataTransmitters.forEach((item,i) =>
      dot.push(' ' + item.Transmitters)
      );
  // add timeline
  dot = dot.concat(timeline);
  // add constraints
  dot = dot.concat(constraints);
  // add connections
  dataTransmissions.forEach((item,i) =>
      dot.push(' ' + item.From + ' -> ' + item.To)
      );
  // and thats it
  dot.push('}');

  console.log(dot);

  return [dot];

}



function findClosestDAH(dAH, transmitter, year, stepsize) {
  // var dataTransmitters = d3.csvParse(transmittersReader.result);
  // console.log(year);
  // upper = year+stepsize;
  // console.log(upper);
  // if (dAH > year && dAH < (year+stepsize)) {
  if (year <= dAH && dAH < (year+stepsize)) {
    console.log(dAH);
    return transmitter;
  }
}



function matchToTimeline() {
  var stepsize = 25;
  var timeline = buildTimelineNew(25)[1];
  var dataTransmitters = d3.csvParse(transmittersReader.result);


  
  for (var i = 0; i < timeline.length; i++) {
    // findClosestDAH(timeline[i], stepsize);
    console.log('year:');
    console.log(timeline[i]);
    console.log('_______');
    var closestList = [];
    for (var j = 0; j < dataTransmitters.length; j++) {
      closest = findClosestDAH(dataTransmitters[j].dAH, dataTransmitters[j].Transmitters, timeline[i],stepsize);
      if (closest){

        closestList.push(closest);
      }
    }
    console.log(closestList);


    // dataTransmitters.forEach((item,i) =>
    //   // console.log(item.dAH)
    //   findClosestDAH(item.dAH, timeline[i], stepsize)
    //   );

  }

  console.log(dataTransmitters);
}






function buildConstraints() {
  var constraints = [];
  constraints.push(' {rank=same  10 A}');
  constraints.push(' {rank=same  35 B C}');
  constraints.push(' {rank=same  60 D}');
  constraints.push(' {rank=same  85 F G E H}');

  // constraints.push(' ');

  return constraints;
}


function renderGraphNew() {
  var timeline = buildTimelineNew(25)[0];
  var constraints = buildConstraints();
  var dot = buildGraphNew(timeline, constraints);

  graphviz.width(500);
  graphviz.height(1100);
  // turn list of dot commands into string
  var dotLines = dot[0 % dot.length];
  var dotString = dotLines.join('');
  // render graph in canvas

  // console.log(dotString);

  graphviz
      .dot(dotString)
      .render();
}



function buildGraph(timeline) {
  // get data
  var dataTransmissions = d3.csvParse(transmissionsReader.result);
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



function ttest() {
  var dot = ['digraph  {'];
  // edges
  dot.push(' A [ label="A" shape="circle" ]');
  dot.push(' B [ label="B" shape="circle" ]');
  dot.push(' C [ label="C" shape="circle" ]');
  dot.push(' D [ label="D" shape="circle" ]');
  dot.push(' A -> B');
  dot.push(' A -> C');
  dot.push(' C -> D');

  dot.push(' subgraph subs {');
  dot.push('1');
  dot.push('2');
  dot.push('3');

  dot.push(' 1->2->3');
  // dot.push(' 2->3');
  dot.push(' {')
  dot.push('rank=same 1 A');
  dot.push('}');
  dot.push(' {')
  dot.push('rank=same 2 C');
  dot.push('}');
  dot.push(' {')
  dot.push('rank=same 3 B D');
  dot.push('}');
  

  // nodes

  dot.push('}');
  dot.push('}');


  // dot.push(' rank="min" 1');
  // dot.push(' rank="same" 1 A');
  // dot.push(' rank="same" 2 C');
  // dot.push(' rank="same" 3 B D');
  // dot.push(' rank="max" 3');
  // dot.push(' rankdir="TB"');




  graphviz.width(500);
  graphviz.height(1100);
  dotString = '';
  dot = [dot];
  // turn list of dot commands into string
  var dotLines = dot[0 % dot.length];
  var dotString = dotLines.join(' ');
  // console.log(dot);

  // render graph in canvas
  graphviz
      .dot(dotString)
      .render();
}










// placeholder function for buttons
function test(){
    console.log('working...');
}
