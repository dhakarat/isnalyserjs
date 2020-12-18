// init reader (to load csv)
var transmissionsReader = new FileReader();  
var transmittersReader = new FileReader();
var stepSize = 15;

// init d3 graphviz object
var graphviz = d3.select("#graph").graphviz();


// init tooltip object and append to div 
var tooltip = d3.select("#graph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0); // init invisibly

// canvas size
var margin = 20;
var width = window.innerWidth - margin;
var height = window.innerHeight - margin;





// lookup table for edge types
var transmissionTypeLookup = {0:'solid', 1:'dashed', 2:'dotted', 3:'bold'};




function loadTransmissionsFile() { 
  /** Get loaded transmissions file and store in reader variable. */
  // load transmissions file 
  var transmissionsFile = document.querySelector('div.transmissions input[type=file]').files[0];
  var fileExtension = transmissionsFile.name.split('.').slice(-1)[0];
  // check if uploaded file is a csv
  if (fileExtension !== 'csv') {
        var error = "Ivalid file type : "+ fileExtension+"\n\n";
        error += "Please make sure to upload a csv file."
        alert(error);
  }
  // store in reader var
  if (transmissionsFile) {
    transmissionsReader.readAsText(transmissionsFile);
  }      

}


function loadTransmittersFile() {
  /** Get loaded transmitters file and store in reader variable. */
  // load transmitters file
  var transmittersFile = document.querySelector('div.transmitters input[type=file]').files[0];   
  var fileExtension = transmittersFile.name.split('.').slice(-1)[0];
  // check if uploaded file is a csv
  if (fileExtension !== 'csv') {
        var error = "Ivalid file type : "+ fileExtension+"\n\n";
        error += "Please make sure to upload a csv file."
        alert(error);
  }
  // store in reader var
  if (transmittersFile) {
    transmittersReader.readAsText(transmittersFile);
  }      
}

function getStepSize() {
  /** Get user specified step size and overwrite default value. */
  // get stepsize entered by user
  userStepSize = parseInt(document.getElementById('stepsize').value);   
  if (userStepSize) {
    stepSize = userStepSize;
  }      
}




function abbreviateName(name) {
  /** 
  If name is longer that 7 characters and consists
  of multiple names, return a ...-abbreviated version.
  */
  if (typeof name !== 'string') {
        alert('Make sure transmitter names are strings.');
  }
  if (name.length > 7 && name.split(' ').length > 1) {
    var lastName = name.split(' ').slice(-1).join(' '); // get last name (last slice)
    var shortName = name.substring(0,5) + '... ' + lastName; // concat names to form abbreviated version
    
    return shortName;
  }
  else{
    return name;
  }
}



function buildTimeline(stepsize) {
  /** Build a timeline subgraph based on stepsize and data. */
  // get data from transmitters table
  var dataTransmitters = d3.csvParse(transmittersReader.result);
  // get min and max of death dates
  var timelineMin = d3.min(dataTransmitters, function(d) { return +d.dAH; })
  var timelineMax = d3.max(dataTransmitters, function(d) { return +d.dAH; })
  // init timeline subgraph
  var timeline = [' subgraph {'];
  timeline.push( ' node [shape=none]');
  // init timeline as empty list
  var timelineList = [];
  // append new nodes to timeline according to stepsize
  for (var i = timelineMin; i < timelineMax;) {
      timeline.push(' ' + i.toString()  + '->' + (i+stepsize).toString() + ' [penwidth = 3, arrowhead = None tooltip=" "]');
      timelineList.push(i); // also have a list of timeline values
      i = i+stepsize;
  }
  // complete timeline subgraph
  timeline.push('}');

  return [timeline, timelineList];

}

function buildGraph(timeline, constraints) {
  /** Based one timeline, constraints and data, build graph as list of dot commands. */
  // get data from loaded files
  var dataTransmitters = d3.csvParse(transmittersReader.result);
  var dataTransmissions = d3.csvParse(transmissionsReader.result);

  // check if transmissions file contains necessary columns
  if (!(dataTransmissions.columns.includes('From') && dataTransmissions.columns.includes('To'))) {
    var error = "Invalid colums\n\n";
    error += "Please make sure to that your transmissions file has From and To columns."
    alert(error);
  }
  // check if transmitters file contains necessary columns
  if (!(dataTransmitters.columns.includes('Transmitters') && dataTransmitters.columns.includes('dAH'))) {
    var error = "Invalid colums\n\n";
    error += "Please make sure to that your transmitters file has Transmitters and dAH columns."
    alert(error);
  }

  // init dot source
  var dot = ['strict digraph  { node [style="filled" fillcolor = "white"  shape = "none" tooltip=" "]'];
  // add nodes
  dataTransmitters.forEach((item,i) =>
      dot.push(' ' + '"'+item.Transmitters+'"' + '[label=' + '"'+ abbreviateName(item.Transmitters) +'"' + ']') //+ '[fillcolor=' + "red" + ']')
      );
  // add timeline
  dot = dot.concat(timeline);
  // add constraints
  dot = dot.concat(constraints);
  // add connections
  dataTransmissions.forEach((item,i) =>
      dot.push(' ' +'"'+ item.From +'"'+ ' -> ' + '"'+ item.To +'"' + ' [labeltooltip=" " label=' +'"'+ getTextID(dataTransmissions, item.From, item.To)  +'"'+ ' style='+ transmissionTypeLookup[item.TransmissionType]  +' ]') // hyphens are necessary

      );
  // and complete it
  dot.push('}');

  return [dot];

}



function isWithinRange(dAH, transmitter, year, stepsize) {
  /** Return transmitter if its death date lies in the range given by year and stepsize.*/
  if (year <= dAH && dAH < (year+stepsize)) { // check if within range
    return '"' + transmitter + '"'; // and return formated transmitter string if so
  }
}



function matchToTimeline() {
  /** Get constraints to place transmitters in timeline according to their death data (dAH) */
  var timeline = buildTimeline(stepSize)[1]; // get timeline as list
  var dataTransmitters = d3.csvParse(transmittersReader.result); // get loaded transmitters file
  var constraints = []; // init the constraints we want to return as empty list
  // iterate over years of our timeline
  for (var i = 0; i < timeline.length; i++) {
    // list to place in the nodes that will correspond to the current timeline year
    let closestList = [];
    // init rank constraint string
    let constraintString = '{ rank=same ' + timeline[i];
    // iterate over all of our transmitters and get them if they match the current timeline year
    for (var j = 0; j < dataTransmitters.length; j++) {
      closest = isWithinRange(dataTransmitters[j].dAH, dataTransmitters[j].Transmitters, timeline[i], stepSize);
      if (closest){
        constraintString += ' '+closest;
      }
    }
    // complete the rank constraint
    constraintString += ' }'; 
    // and append to our list of constraints
    constraints.push(constraintString);
  }

  return constraints
}



function getDAH(data, key) {
  /** Get death date of a transmitter. */
  for (var i = 0; i < data.length; i++) {
    if (data[i]['Transmitters'] == key) {
      return data[i]['dAH'];
    }
  }
}



function getOrigin(data, key) {
  /** Get origin of a transmitter. */
  for (var i = 0; i < data.length; i++) {
    if (data[i]['Transmitters'] == key) {
      if (data[i]['Origin'] !== undefined){
        return data[i]['Origin'];
      }
      else{
        return " ";
      }
    }
  }
}

function getBio(data, key) {
  /** Get origin of a transmitter. */
  for (var i = 0; i < data.length; i++) {
    if (data[i]['Transmitters'] == key) {
      if (data[i]['Bio'] !== undefined){
        return data[i]['Bio'];
      }
      else{
        return " ";
      }
    }
  }
}



function getTextID(data, from, to) {
  /** Get list of text id's from transmissions data. */
  var ids = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i]['From']==from && data[i]['To']==to) {
      ids.push(data[i]['FileName']);
    } 
  }
  return ids;
}



function displayNodeTooltip() {
  /** When mouse hovers over a node, display a tooltip with additional information. */
  // select all d3 nodes in the canvas
  nodes = d3.selectAll('.node');
  // init clicked flag with false
  var clicked = false;
  // load transmitters data
  var dataTransmitters = d3.csvParse(transmittersReader.result);
  nodes
    .on("click", function (d) {
      if(clicked){
        tooltip.html(d)
          // hide if clicked again, or other node is clicked
          .style("opacity", 0); // 0.9 looks nice
        clicked=false;
        return;
      };

      if(!clicked){
        clicked=true;
        tooltip.html(d)
        // display summarizing data in tooltip
          .text(
            d.key + "\n"
            + "Year of death: " + getDAH(dataTransmitters, d.key) + "\n"
            + "City of origin: " + getOrigin(dataTransmitters, d.key) + "\n"
            + "Bio: " + getBio(dataTransmitters, d.key))
          // increase opacity of element
          .style("opacity", 0.99) // 0.9 looks nice
          // place element where the event happend
          .style("left", (d3.event.pageX + 15) + "px") 
          .style("top", (d3.event.pageY - 10) + "px");
        return;
        };

  });
}



function highlightEdgeByID(edgeID) {
  /** Select an edge, given its ID. */
  d3.select("g#" + edgeID).selectAll('path').attr("stroke", "#C10E1A");
}



function unHighlightChain() {
  /** Undo any highlighting by changing color back to default. */
    d3.selectAll('path').attr("stroke", "black");
}



function getLabelFromHtml(htmlString) {
  /** Retrueve edge label from HTML DOM string. */
  if (htmlString.includes('font-size="14.00">')){
    edgeLabel = htmlString.split('font-size="14.00">')[1].split("</")[0].split(",");
    return edgeLabel;
  }
}



function highlightChain() {
  /** Highlight a chain of transmission given the selected TextID's. */
  paths = d3.selectAll('path');
  edges = d3.selectAll('.edge');
  edges // if on edge
    .on("mouseover", function (d) {
        textIDs = getLabelFromHtml(this.innerHTML); // get the current edge's label
        if (textIDs){ // if it has a label
          for (var i = 0; i < textIDs.length; i++) { // iterate over them
            getEdgeByTextID(textIDs[i]); // and find edges with the same label
        }
      }
    });
  edges // if away from edge
    .on("mouseout", function() {
      unHighlightChain();
    });   
}


function highlightNode() {
  /** Highlight a node on mouseover. */
  nodes = d3.selectAll('.node');
  // change color on mouseover
  nodes
    .on("mouseover", function (d) {
        d3.select(this).attr("r", 10).style("fill", "#225096");
  });
  // change back to default on mouseout
  nodes
    .on("mouseout", function (d) {
        d3.select(this).attr("r", 10).style("fill", "black");
  });
}




function getEdgeByTextID(textID) {
  /** Select any edges that contain the given textID. */
  // Select all edges
  edges = d3.selectAll('.edge').nodes();
  // iterate over them
  for (var i = 0; i < edges.length; i++) {
    edgeStr = edges[i].innerHTML; // get their DOM information
    edgeStr = edgeStr.split("font-family")[1];
    if (edgeStr){ // check if it has a label
      if (edgeStr.includes(textID)){ // check if label contains given ID
        // and if so, color it
        highlightEdgeByID(edges[i].id);
      }
    }
  }
}



function postGraphLayout(){
  /** Helper function that executes that should remain active, once graph is rendered. */
  highlightChain();
  displayNodeTooltip();
  highlightNode();
}



function renderGraph() {
  /** Build a complete graph with timeline and constraints and render it. */

  // check if user uploaded files
  if (transmissionsReader.result == null) {
    alert('No transmissions file provided. Plase make sure to upload a valid csv file.');
  }
  if (transmittersReader.result == null) {
    alert('No transmitter file provided. Plase make sure to upload a valid csv file.');
  }
  // get timeline as list of strings
  var timeline = buildTimeline(stepSize)[0];
  // get constraints as list of strings
  var constraints = matchToTimeline()
  // get main graph as list of constraints
  var dot = buildGraph(timeline, constraints);
  // adaptive size
  graphviz.width(width);
  graphviz.height(height);
  // turn list of dot commands into string
  var dotLines = dot[0 % dot.length];
  var dotString = dotLines.join('');

  // debugging graphs
  // var dotString = 'graph { node [style="filled" tooltip=" "]"Long Name" [label="A"]  B  C[label=<<font color="red"><b>C</b></font>>]          "Long Name"--B[label="some text" style=dashed] "Long Name"--C[label="AAA"]}'
  // var dotString = 'graph { node [style="filled" tooltip=" "] A B C D E F          A--B[label="m1,m2,m3"]  A--C[label="m3"]  B--D[label="m1,m2"] C--E[label="m3"] D--E[label="m2"] D--F[label="m1"]}'

  // console.log(dotString);

  // render graph in canvas
  graphviz
      .dot(dotString)
      .render()
      .on("end", postGraphLayout)
     ;
}



function exportGraph() {
  /** Download the rendered graph as svg. */
  downloadSVG();
}



// Debugging
function renderTestGraph() {
  // test graph
  graphviz.width(width);
  graphviz.height(height);
  var dotString = 'graph {"Long Name" [label="A"]  B[tooltip="origin\ndAH\nbio"]  C[label=<<font color="red"><b>C</b></font>>]          "Long Name"--B[label="some text" style=dashed, color=grey]}'
  graphviz
      .dot(dotString)
      .render()
      // .on("end", postGraphLayout)
      ;
}


function test(){
  /** placeholder function for buttons... */
    // console.log('working...');
    // var shortName = abbreviateName('Ḥarmalah b. Yaḥyā al-Tugībī');
    // console.log(shortName);
    // console.log(![0,10,10].includes(10));
    // console.log(!(typeof "ljfds" == 'string'));
    var margin = 20;
    var width = window.innerWidth - margin;
    var height = window.innerHeight - margin;
    console.log(height);
}



function downloadSVG() {
/** Downloads SVGs on the webpage, based on svg-crowbar. */

  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  window.URL = (window.URL || window.webkitURL);

  var body = document.body;

  var prefix = {
    xmlns: "http://www.w3.org/2000/xmlns/",
    xlink: "http://www.w3.org/1999/xlink",
    svg: "http://www.w3.org/2000/svg"
  }

  initialize();

  function initialize() {
    var documents = [window.document],
        SVGSources = [];
        iframes = document.querySelectorAll("iframe"),
        objects = document.querySelectorAll("object");

    [].forEach.call(iframes, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err)
      }
    });

    [].forEach.call(objects, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err)
      }
    });

    documents.forEach(function(doc) {
      var styles = getStyles(doc);
      var newSources = getSources(doc, styles);
      // because of prototype on NYT pages
      for (var i = 0; i < newSources.length; i++) {
        SVGSources.push(newSources[i]);
      };
    })
    if (SVGSources.length > 1) {
      createPopover(SVGSources);
    } else if (SVGSources.length > 0) {
      download(SVGSources[0]);
    } else {
      alert("The Crowbar couldnâ€™t find any SVG nodes.");
    }
  }

  function createPopover(sources) {
    cleanup();

    sources.forEach(function(s1) {
      sources.forEach(function(s2) {
        if (s1 !== s2) {
          if ((Math.abs(s1.top - s2.top) < 38) && (Math.abs(s1.left - s2.left) < 38)) {
            s2.top += 38;
            s2.left += 38;
          }
        }
      })
    });

    var buttonsContainer = document.createElement("div");
    body.appendChild(buttonsContainer);

    buttonsContainer.setAttribute("class", "svg-crowbar");
    buttonsContainer.style["z-index"] = 1e7;
    buttonsContainer.style["position"] = "absolute";
    buttonsContainer.style["top"] = 0;
    buttonsContainer.style["left"] = 0;



    var background = document.createElement("div");
    body.appendChild(background);

    background.setAttribute("class", "svg-crowbar");
    background.style["background"] = "rgba(255, 255, 255, 0.7)";
    background.style["position"] = "fixed";
    background.style["left"] = 0;
    background.style["top"] = 0;
    background.style["width"] = "100%";
    background.style["height"] = "100%";

    sources.forEach(function(d, i) {
      var buttonWrapper = document.createElement("div");
      buttonsContainer.appendChild(buttonWrapper);
      buttonWrapper.setAttribute("class", "svg-crowbar");
      buttonWrapper.style["position"] = "absolute";
      buttonWrapper.style["top"] = (d.top + document.body.scrollTop) + "px";
      buttonWrapper.style["left"] = (document.body.scrollLeft + d.left) + "px";
      buttonWrapper.style["padding"] = "4px";
      buttonWrapper.style["border-radius"] = "3px";
      buttonWrapper.style["color"] = "white";
      buttonWrapper.style["text-align"] = "center";
      buttonWrapper.style["font-family"] = "'Helvetica Neue'";
      buttonWrapper.style["background"] = "rgba(0, 0, 0, 0.8)";
      buttonWrapper.style["box-shadow"] = "0px 4px 18px rgba(0, 0, 0, 0.4)";
      buttonWrapper.style["cursor"] = "move";
      buttonWrapper.textContent =  "SVG #" + i + ": " + (d.id ? "#" + d.id : "") + (d.class ? "." + d.class : "");

      var button = document.createElement("button");
      buttonWrapper.appendChild(button);
      button.setAttribute("data-source-id", i)
      button.style["width"] = "150px";
      button.style["font-size"] = "12px";
      button.style["line-height"] = "1.4em";
      button.style["margin"] = "5px 0 0 0";
      button.textContent = "Download";

      button.onclick = function(el) {
        download(d);
      };

    });

  }

  function cleanup() {
    var crowbarElements = document.querySelectorAll(".svg-crowbar");

    [].forEach.call(crowbarElements, function(el) {
      el.parentNode.removeChild(el);
    });
  }


  function getSources(doc, styles) {
    var svgInfo = [],
        svgs = doc.querySelectorAll("svg");

    styles = (styles === undefined) ? "" : styles;

    [].forEach.call(svgs, function (svg) {

      svg.setAttribute("version", "1.1");

      var defsEl = document.createElement("defs");
      svg.insertBefore(defsEl, svg.firstChild); //TODO   .insert("defs", ":first-child")
      // defsEl.setAttribute("class", "svg-crowbar");

      var styleEl = document.createElement("style")
      defsEl.appendChild(styleEl);
      styleEl.setAttribute("type", "text/css");


      // removing attributes so they aren't doubled up
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xlink");

      // These are needed for the svg
      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
      }

      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
      }

      var source = (new XMLSerializer()).serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
      var rect = svg.getBoundingClientRect();
      svgInfo.push({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        class: svg.getAttribute("class"),
        id: svg.getAttribute("id"),
        childElementCount: svg.childElementCount,
        source: [doctype + source]
      });
    });
    return svgInfo;
  }

  function download(source) {
    var filename = "isnalyser_graph";

    if (source.id) {
      filename = source.id;
    } else if (source.class) {
      filename = source.class;
    } else if (window.document.title) {
      filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }

    var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

    var a = document.createElement("a");
    body.appendChild(a);
    a.setAttribute("class", "svg-crowbar");
    a.setAttribute("download", filename + ".svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();

    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 10);
  }

  function getStyles(doc) {
    var styles = "",
        styleSheets = doc.styleSheets;

    return styles;
  }
}