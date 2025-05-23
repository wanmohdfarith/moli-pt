## How to run

- `docker-compose up -d`
- `k6 run --out influxdb=http://localhost:8086/k6db test.js -u 1000 -i 10000 --rps=150`

## Grafana

- url: `http://127.0.0.1:3000/`
- login: `admin`
- pass: `tetstts`

- add DataSource:
  - Name: `InfluxDB`
  - URL: `http://influxdb:8086`
  - Database: `k6db`
- import dashboard by the following id: `11837`
