d3.json('samples.json').then(data => {
   console.log(data);
})

function optionChanged (newsample) {
    populatechart(newsample);
    //populatemetadata(newsample);
}

function init () {
    //alert("hello");
    const dataselect = d3.select("#selDataset");
    d3.json('samples.json').then(data => {
        console.log(data);
        let names = data.names;
        names.forEach ((sample) => {
            dataselect.append("option")
            .text(sample) 
            .property("value", sample);

        }); 
        const defaultsamp = names[0];
        populatechart(defaultsamp);
       // populatemetadata(defaultsamp);

     });

}

function populatechart (filldata) {
    d3.json('samples.json').then(data => {
        console.log(data);
        const samples = data.samples;   //data.metadata for the metadata function
        //console.log(samples)
        let filterdata = samples.filter(sampobject => sampobject.id = filldata);
        let result = filterdata[0];
        //console.log(result)
        let otuid = result.otu_ids;
        let otulabel = result.out_labels;
        let samplevalue = result.sample_values;
        
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

        //create bar chart
 
     });

}

//create metadata function to populate the metadata

function findMetadata (filldata) {
    d3.json('samples.json').then(data => {
        
    }

}

init ();