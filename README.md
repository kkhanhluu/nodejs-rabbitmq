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

Exchanges broadcasts all the messages it receives to all the queues it knows.

### direct exchange (default)

A message with `routing key` R will go to the queues whose `binding key` K = R.

### Topic exchange

The logic behind is similar to `direct change`, however there are 2 important sepcial cases for binding keys:

- `*` (star) can substitute for exactly one word.
- `#` (hash) can substitute for zero or more words.
  Example:
  Q1 is bound with `*.orange.*` and Q2 is bound with `*.*.rabbit` and `lazy.#`
- `quick.orange.rabbit`, `lazy.orange.elephant` go to 2 queues
- `quick.orange.fox` go to Q1
- `lazy.brow.fox` go to Q2
- `lazy.orange.male.rabbit` does not go to any queues.

Look at sender.ts and receiver.ts to see more details
