# PlotlyJavascript
An example of using influxdb's javascript client to graph in Plotly.
Blog can be found  (blog to be linked)

# Getting Started
You will need to replace these lines of code with your token, org email, and influx cloud url:
```
const token = 'super_secret_token'
const org = 'your_email'
const client = new InfluxDB({url: 'https://us-west-2-1.aws.cloud2.influxdata.com', token: token})
```

You will want to edit the queries to your own bucket and filters:
```
   `from(bucket: "plotlyGraph")
    |> range(start: -5m)
    |> filter(fn: (r) => r["_measurement"] == "cpu")
    |> filter(fn: (r) => r["_field"] == "usage_system")
    |> filter(fn: (r) => r["cpu"] == "cpu-total")
    |> yield(name: "mean")`
```


To install the node modules:
```
npm install
```

To run the app:
```
node app.js
```

Go to this localhost port to see the app in action:
http://localhost:3000/
