d3.json('samples.json').then(data => {
   //console.log(data);
})



function init () {
    //alert("hello");
    const dataselect = d3.select("#selDataset");
    d3.json('samples.json').then(data => {
        //console.log(data);
        let names = data.names;
        names.forEach ((sample) => {
            dataselect.append("option")
            .text(sample) 
            .property("value", sample);

        }); 
        const defaultsamp = names[0];
        populatechart(defaultsamp);
        findMetadata(defaultsamp);

     });

     

}

function optionChanged (newsample) {
    populatechart(newsample);
    findMetadata(newsample);
}


function populatechart (filldata) {
    d3.json('samples.json').then(data => {
        //console.log(data);
        const samples = data.samples;   //data.metadata for the metadata function
        //console.log(samples)
        let filterdata = samples.filter(sampObject => sampObject.id === filldata);
        let result = filterdata[0];
        //console.log(result)
        let otuid = result.otu_ids.slice(0,10);
        let otulabel = result.otu_labels.slice(0,10);
        let samplevalue = result.sample_values.slice(0,10);
       

        //finding top 10 data elements 

        //let sortvalue = samplevalue.slice(0,10);
        //let sortlabel = otulabel.slice(0,10);
        //let sortid = otuid.slice(0,10);
        
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
        let barchart = [
            {
                x: samplevalue,
                y: otulabel,
                type: "bar",
                orientation: "h"

            }
        ];

        let  barlayout = {
            title : "Top 10 OTU",
            xaxis : {title: "Sample Amount"}
        };

        Plotly.newPlot("bar", barchart, barlayout)

 
     });



}

//create metadata function to populate the metadata

function findMetadata (filldata) {
    d3.json('samples.json').then(data => {
        const metasamples = data.metadata;
        let filtermdata = metasamples.filter(meta => meta.id.toString() === filldata);
        let result = filtermdata[0];
        let metaselect = d3.select("#sample-metadata");
        metaselect.html("");
        Object.entries(result).forEach(([key, value]) => {
            metaselect.append("h6").text(`${key.toUpperCase()}: ${value}`)
        }

        )


       

      
        //let filterdata = samples.filter(sampobject => sampobject.id = filldata);
    })

}

init ();