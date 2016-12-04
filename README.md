# Transform Scala lambda

> Enable Scala lambda style

## Motivations

* Allow a more consice syntax for simple things.
* Scala is a great language (you should take a look at [Scala.js](http://www.scala-js.org))

## Installation

```sh
npm install --save-dev babel-plugin-transform-scala-lambda
```

## Usage

Add the following line to your .babelrc file:

```json
{
    "plugins": ["transform-scala-lambda"]
}
```

## Examples

### Sum a list of numbers

#### Using lambda style

```js
const sum = [1, 1, 1].reduce(_ + _);
```

#### Without it

```js
const sum = [1, 1, 1].reduce((a, b) => {
    return a + b;
});
```

### Get property from object

#### Using lambda style

```js
const users = [{ name: "Sven" }, { name: "James" }];

const userNames = users.map(_.name);
```

#### Without it

```js
const users = [{ name: "Sven" }, { name: "James" }];

const userNames = users.map(u => {
    return u.name;
});
```
