# babel-plugin-scalifier

> Some Scala syntactic sugar for your js

## Installation

```sh
npm install --save-dev babel-plugin-scalifier
```

## Usage

Add the following line to your .babelrc file:

```json
{
  "plugins": ["scalifier"]
}
```

## Examples

### Sum a list of numbers

#### Using Scalifier

```js
const sum = [1, 1, 1].reduce(_ + _);
```

#### Without Scalifier

```js
const sum = [1, 1, 1].reduce((a, b) => {
  return a + b;
});
```

### Get property from object

#### Using Scalifier

```js
const users = [{ name: "Sven" }, { name: "James" }];

const userNames = users.map(_.name);
```

#### Without Scalifier

```js
const users = [{ name: "Sven" }, { name: "James" }];

const userNames = users.map(u => {
  return u.name;
});
```
