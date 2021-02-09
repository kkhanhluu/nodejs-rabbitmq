# RabbitMQ with Nodejs + Typescript

- Typescript
- Node
- PostgreSQL

## How to run

Make sure the latest version of
[Docker](https://docs.docker.com/engine/install/)
and
[Docker Compose](https://docs.docker.com/compose/install/)
are present.

Run `docker-compose up` to start rabbitMQ.

## How it works

- A **producer** is a user application that sends message to an `exchange`
- An `exchange` sends messages to a `queue` with **exchange types** (binding):

1. direct (default)
2. topic
3. headers
4. fanout

- A `queue` sends message to `consumer`, which is an user application that receives messgages.

### fanout
