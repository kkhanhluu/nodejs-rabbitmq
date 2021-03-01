There are 4 basic types of exchange:

- Direct exchange
- Fanout exchange
- Topic exchange
- Headers exchange

# Direct exchange

The direct exchange is useful when you’re going to deliver a message with a specific target, or a set of targets.
A message with `routing key` R will go to the queues whose `binding key` K = R.

# fanout

Exchanges broadcasts all the messages it receives to all the queues it knows

# Topic exchange

The logic behind is similar to `direct change`, however there are 2 important sepcial cases for binding keys:

- `*` (star) can substitute for exactly one word.
- `#` (hash) can substitute for zero or more words.
  Example:
  Q1 is bound with `*.orange.*` and Q2 is bound with `*.*.rabbit` and `lazy.#`
- `quick.orange.rabbit`, `lazy.orange.elephant` go to 2 queues
- `quick.orange.fox` go only to Q1
- `lazy.brow.fox` go only to Q2
- `quick.orange.male.rabbit` does not go to any queues.
- `lazy.orange.male.rabbit` goes only to Q2 because of `lazy.#` key.

# Headers:

Headers exchanges use the message header attributes for routing.
