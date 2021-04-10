d3.json('samples.json').then(data => {
   console.log(data);
})

function optionChanged (newsample) {
    populatechart(newsample);
    //populatemetadata(newsample);
}

function init () {
    //alert("hello");
    var dataselect = d3.select("#selDataset");
    d3.json('samples.json').then(data => {
        console.log(data);
        var names = data.names;
        names.forEach ((sample) => {
            dataselect.append("option")
            .text(sample) 
            .property("value", sample);

        }); 
        var defaultsamp = names[0];
        populatechart(defaultsamp);
       // populatemetadata(defaultsamp);

     });

}

function populatechart (filldata) {
    d3.json('samples.json').then(data => {
        console.log(data);
        var samples = data.samples;
        //console.log(samples)
        var filterdata = samples.filter(sampobject => sampobject.id = filldata);
        var result = filterdata[0];
        //console.log(result)
        var otuid = result.otu_ids;
        var otulabel = result.out_labels;
        var samplevalue = result.sample_values;
        
        let bubbledata = [
            {
                x: otuid,
                y: samplevalue,
                txt: otulabel,
                mode: 'markers',
                marker: {
                    size: samplevalue,
                    color: otuid,
                    colorscale: "Earth"
                    
                }         
                
            }
        ];

        let bubblelayout = {
            title: "Sample Bacteria",
            margin: {t:0 },
            hovermode: "closest",
            xaxis: {title: "Otu ID"},
            margin: {t:30}
 
        };

        Plotly.newPlot("bubble", bubbledata, bubblelayout);
 
     });

}

init ();