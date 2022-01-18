const loadData = () => {
    let firstTrace;
    let secondTrace;
    
    
    const plotly = (firstTrace, secondTrace) =>{
        const layout = {
          title: 'Local CPU Usage',
        };
        return Plotly.newPlot('graphs-container', [firstTrace, secondTrace], layout);
    }

    const fetchData = () =>{
    firstTrace = fetch('/api/cpu_total_usage')
    .then(response => response.json())
    .then(data => {
        const unpackData = (arr, key) => {
          return arr.map(obj => obj[key])
        }
        const traceData = {
          type: 'scatter',
          mode: 'lines',
          name: 'CPU total Usage',
          x: unpackData(data, '_time'),
          y: unpackData(data, '_value'),
          line: {color: '#17BECF'}
        }   
        return traceData      
    }).catch((error) => {
        console.error('Error:', error);
    });

    secondTrace = fetch('/api/cpu_total_user')
    .then(response => response.json())
    .then(data => {
        const unpackData = (arr, key) => {
          return arr.map(obj => obj[key])
        }
        const traceData = {
          type: 'scatter',
          mode: 'lines',
          name: 'CPU total Usage for User',
          x: unpackData(data, '_time'),
          y: unpackData(data, '_value'),
          line: {color: '#17BECF'}
        } 
        return traceData        
    }).catch((error) => {
        console.error('Error:', error);
    });
    return [firstTrace, secondTrace]
    }

    [firstTrace, secondTrace] = fetchData()
    
    //this promise is to wait for all the data to be returned
    Promise.all([firstTrace, secondTrace]).then((values) => {
        plotly(values[0], values[1])
      });   
}

  $(window).on('load', loadData);