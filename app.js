// init reader (to load csv)
var reader1 = new FileReader();  
var reader2 = new FileReader();

// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


// load file (on button click)
function loadFile() {    
  var transmissionsFile = document.querySelector('div.transmissions input[type=file]').files[0];   
  // timeline = createTimeline(0, 50, 25);


  reader1.addEventListener("load", drawGraph, false);
  if (transmissionsFile) {
    reader1.readAsText(transmissionsFile);
  }      
}



function loadTransmissionsFile() {    
  var transmissionsFile = document.querySelector('div.transmissions input[type=file]').files[0];   
  // timeline = createTimeline(0, 50, 25);


  reader1.addEventListener("load", buildGraph, false);
  if (transmissionsFile) {
    reader1.readAsText(transmissionsFile);
  }      
}





function loadTransmittersFile() {
  var transmittersFile = document.querySelector('div.transmitters input[type=file]').files[0];   

  // timeline = createTimeline(0, 50, 25);


  reader2.addEventListener("load", createTimeline, false);
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

  // init timeline list
  var timeline = [' subgraph {'];
  timeline.push( ' node [shape=none]');
  // append new nodes to timeline according to stepsize
  for (var i = timelineMin; i < timelineMax;) {
      timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 5, arrowhead = None]');
      i = i+stepsize
  }
  timeline.push('}');

  return timeline;

}




function buildGraph(timeline) {
  var dataTransmissions = d3.csvParse(reader1.result);
  var dot = ['digraph  {'];


  dataTransmissions.forEach((item,i) =>
      dot.push(' ' + item.From + ' -> ' + item.To)
      );


  dot = dot.concat(timeline);

  dot.push('}');

  return [dot];
}




function renderGraph() {
  // create a graph to draw
  var timeline = buildTimeline(25);
  var graph = buildGraph(timeline);
  console.log(graph);

  var dotIndex = 0;


  graphviz.width(500);
  graphviz.height(1100);

    // turn list of dot commands into string
  var dotLines = graph[dotIndex % graph.length];
  var dotString = dotLines.join('');

  graphviz
      .dot(dotString)
      // .dot(timelineString)
      .render()
      // .on('end', function () {
      //     if (dotIndex != dotString.length) {
      //         renderGraph();
      //     }
      // })
      ;
  dotIndex += 1;

}




function createTimeline(min, max, stepsize) {
    var dataTransmitters = d3.csvParse(reader2.result);

    // return dataTransmitters;
    // console.log(dataTransmitters);

    // var timeline = [' subgraph {'];
    // timeline.push( ' node [shape=none]');
    // // var timeline = [];
    // for (var i = 0; i < max;) {
    //     timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 5, arrowhead = None]');
    //     i = i+stepsize
    // }
    // timeline.push('}');
    // // console.log(timeline);
    // return timeline;

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

    console.log(data);
    // console.log(dataTransmitters);    



    // data.forEach((item,i) =>
    //     dot.push(' ' + item.From + ' -> ' + item.To)
    //     );


    // dot = dot.concat(timeline);

    // dot.push('}');

    // dot = [dot];

    // // turn list of dot commands into string
    // var dotLines = dot[dotIndex % dot.length];
    // var dotString = dotLines.join('');

    // graphviz
    //     .dot(dotString)
    //     // .dot(timelineString)
    //     .render()
    //     .on('end', function () {
    //         if (dotIndex != dotString.length) {
    //             drawGraph();
    //         }
    //     });
    // dotIndex += 1;
    // timelineIndex += 1;
    
}

// placeholder function for buttons
function test(){
    console.log('working...');
}
