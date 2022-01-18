const express = require('express')
const {InfluxDB} = require('@influxdata/influxdb-client')
const app = express()
const port = 3000
const token = 'super_secret_token'
const org = 'your_email'
const client = new InfluxDB({url: 'https://us-west-2-1.aws.cloud2.influxdata.com', token: token})
const queryApi = client.getQueryApi(org)


app.use(express.static('public'))
app.set('port', port);
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}.`);
  });

//more details can be found here https://github.com/influxdata/influxdb-client-js
app.get('/api/cpu_total_usage', (req, res) => {
    let csv = []
    const query = 
    `from(bucket: "plotlyGraph")
    |> range(start: -5m)
    |> filter(fn: (r) => r["_measurement"] == "cpu")
    |> filter(fn: (r) => r["_field"] == "usage_system")
    |> filter(fn: (r) => r["cpu"] == "cpu-total")
    |> yield(name: "mean")`

    queryApi.queryRows(query, {
        next(row, tableMeta) {
          o = tableMeta.toObject(row)
          csv.push(o)
          console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
        },
        error(error) {
          console.error(error)
          res.end()
        },
        complete() {
          res.json(csv)
        },
      })
})


app.get('/api/cpu_total_user', (req, res) => {
    let csv = []
    const query = 
    `from(bucket: "plotlyGraph")
    |> range(start: -5m)
    |> filter(fn: (r) => r["_measurement"] == "cpu")
    |> filter(fn: (r) => r["_field"] == "usage_user")
    |> filter(fn: (r) => r["cpu"] == "cpu-total")
    |> yield(name: "mean")`

    queryApi.queryRows(query, {
        next(row, tableMeta) {
          o = tableMeta.toObject(row)
          csv.push(o)
          console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
        },
        error(error) {
          console.error(error)
          res.end()
        },
        complete() {
          res.json(csv)
        },
      })
})
