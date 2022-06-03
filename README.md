# Test Devops

This is a basic project for Devops test of [Affluences](https://affluences.com/). It consists of a REST API for a TODO list app.

## Project goals

- Run the project
- Fix the tests in `/tests`
- Write a `Dockerfile` and `docker-compose.yml`
- Deploy a simple Prometheus + Grafana visualization stack
- Write a `.gitlab-ci.yml` to run the tests and build the Docker image

## Project folders

- `/src` : project source code
- `/tests` : test suite
- `/metrics` : files needed to setup the visualization stack

## Project routes

- `GET /tasks` : retrieve all tasks
- `GET /tasks/:id` : retrieve a single task
- `POST /tasks` : add a new task
- `PUT /tasks/:id` : edit an existing task
- `DELETE /tasks/:id` : delete an existing task

## Metrics

This app can expose Prometheus metrics when setting the following environment variables : `ENABLE_METRICS=true` and `PROM_TOKEN=<random string>`

The metrics will be available at `/metrics` when authenticated using the header `Authorization: Bearer <your token>`

## Project setup
### Installation

Use the package manager [npm](https://nodejs.org/en/download/), [yarn](https://yarnpkg.com/getting-started/install) or [pnpm](https://pnpm.io/fr/installation) to install dependencies.

```bash
[npm|yarn|pnpm] install
```

### Environment variables

There is a .env file at the root of the file, do not forget to edit the values

### Usage

```bash
# Run in watch mode
[npm|yarn|pnpm] run dev
# Build the project
[npm|yarn|pnpm] run build
# Run the built result
[npm|yarn|pnpm] run start
# Run the test suite
[npm|yarn|pnpm] run test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
