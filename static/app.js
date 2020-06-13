d3.json("data/bbdata.json").then((data) => {

   var allIDs= data.names;
   for (var i = 0; i < allIDs.length; i++) 
   {
     mySelection= d3.select("#selDataset");
     mySelection.append("option").text(allIDs[i]);
   }

   // initial
   plotData(0)
   // updates plot vlaues
   function plotData(index) 
   {
 
    // assign data to variables
    var samples = data.samples[index];
    var sample_values = samples.sample_values;
    var otu_ids = samples.otu_ids;
    var otu_labels = samples.otu_labels;
    var tenSliceOtuIDs = otu_ids.slice(0, 10).reverse();
    var tenSliceValues = sample_values.slice(0, 10).reverse();
    var tenSliceToolTips = otu_labels.slice(0, 10).reverse();
    var tenSliceabels = tenSliceOtuIDs.map((otu => "OTU " + otu)).reverse();
    //slice data into top 10 of each grp 
 
    // bar data
    var trace_bar={
       y:tenSliceLabels,
       x:tenSliceValues,
       text: tenSliceTips,
       type:"bar",
       orientation: 'h',
       // horizontal bar orange
       marker: 
       {
          color: 'rgb(225, 130, 35)'
        }
    }
    // bubble data
    var trace_bubble = {
       x: otu_ids,
       y: sample_values,
       mode: 'markers',
       text: otu_labels,
       marker: 
       {
         size: sample_values,
         color: otu_ids,
         opacity: [1, 0.8, 0.6, 0.4],
         // orange and green 
         colorscale: [[0, 'rgb(225, 130, 35)'], [1, 'rgb(0, 180, 0)']]
       }
     }; 
 
    // Set up for charting 
    var data_bar_chart=[trace_bar];
    var data_bubble_chart = [trace_bubble];
 
    // Set up layout
    // -Horizontal bar chart:
    var layout_bar_chart = {
         title: "Top 10 OTU",
         xaxis: {
             title: "Sample Vals"}
       };
    // -Bubble Chart:
    var layout_bubble_chart = {
       title: 'OTU Freq',
       showlegend: false,
       height: 640,
       width: 1280
       };
    
 
    // Plot
    // -Horizontal bar chart:
    Plotly.newPlot("bar", data_bar_chart, layout_bar_chart);
    // -Bubble Chart
    Plotly.newPlot('bubble', data_bubble_chart, layout_bubble_chart);
 
 
    // -------------------------------------------------
    // Gauge
    var washFreq = data.metadata[index].wfreq;
    var data_gauge_chart = [
       {
         type: "indicator",
         mode: "gauge+number",
         value: washFreq,
         title: { text: "Weekly Belly Button Washes"},
         gauge: {
           axis: { range: [null, 9], tickwidth: 1, tickcolor: "purple" },
           bar: { color: "#669999" },
           bgcolor: "white",
           borderwidth: 1,
           bordercolor: "black",
           steps: [
             { range: [0, 1], color: "#DFBF9F" },
             { range: [1, 2], color: "#B4814E" },
             { range: [2, 3], color: "#B4B44E" },
             { range: [3, 4], color: "#81B44E" },
             { range: [4, 5], color: "#4EB44E" },
             { range: [5, 6], color: "#4EB481" },
             { range: [6, 7], color: "#4EB4B4" },
             { range: [7, 8], color: "#5998E8" },
             { range: [8, 9], color: "#6259E8" }
           ],
         }
       }
     ];
     
     var layout_gauge_chart = {
       width: 500,
       height: 400,
       margin: { t: 25, r: 25, l: 25, b: 25 },
     };
     
     Plotly.newPlot('gauge', data_gauge_chart, layout_gauge_chart);

    // demographics
    var metaKeys = Object.keys(data.metadata[index]);
    var metaValues = Object.values(data.metadata[index])
    var sample_metadata = d3.select("#sample-metadata");
 
    // clear demographic data
   sample_meta_data.html(""); 
    for (var i = 0; i < metaKeys.length; i++) {
       sample_meta_data.append("p").text(`${metaKeys[i]}: ${metaValues[i]}`);
     };
 
   // refresh data on click
   d3.selectAll("#selDataset").on("change", refreshData);
   function refreshData() {
       //select ddm 
     var dropDownMenu = d3.select("#selDataset");
     var personalID = dropDownMenu.property("value");
     // make array for personal data
     for (var i = 0; i < data.names.length; i++) {
       if (personalID === data.names[i]) {
        plotData(i);
         return
       }}}}}
    );