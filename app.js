// function for change on dropdown menu
function optionChanged(selectedID){

    // check if value is selected in dropdown
    console.log(selectedID);
 
    // read json file
    d3.json("data/samples.json").then((data) => {
 
    // Clear the dropdown
    d3.select("#selDataset").html("");   
    
    // select the metadata array and assing in the dropdown
    data.metadata.forEach(item =>
         {
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // make sure value goes through
    d3.select("#selDataset").node().value = selectedID;
    
    // metadata filtered out
    const idMetadata = data.metadata.filter(item=> (item.id == selectedID));

    // Check the metadata & ID
    console.log(idMetadata);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });

//bar chart 
    // filter array data for selected ID
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // top 10 sample values
    var sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue= sampleValue.reverse();
    var otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
 
    // y axis for bar
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       // console.log(yAxis);
    
    // define layout and set up colors
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // bubble chart
 
 // outID
 var sampleValue1 =idSample[0].sample_values;
 var otuID1= idSample[0].otu_ids;
 
 // trace object and set up colors
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 // plot using Plotly
 Plotly.newPlot('bubble', [trace1], layout1);
 
 // gauge chart

 // washing frequency gauge chart 
 const guageDisplay = d3.select("#gauge");
 guageDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const guageData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
      type: "indicator",
      mode: "gauge+number",     
       gauge: {
       axis: { range: [0,9] },
       bar: { color: "#f2e9e4" },
       steps: [
          { range: [0, 1], color: "#e5d5d0" },
          { range: [1, 2], color: "#dbc7c2" },
          { range: [2, 3], color: "#d2b9b4" },
          { range: [3, 4], color: "#c9ada7" },
          { range: [4, 5], color: "#ac9899" },
          { range: [5, 6], color: "#8a7e88" },
          { range: [6, 7], color: "#7d7482" },
          { range: [7, 8], color: "#706a7b" },
          { range: [8, 9], color: "#4a4e69" }
                
        ],
       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
 // plot using Plotly
  Plotly.newPlot('gauge', guageData, gaugeLayout); 
 
 });
 }
 
 // test starts at ID 940
 optionChanged(940);
 
 // event on change takes the value and calls the function during dropdown selection
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 
 });