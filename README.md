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

## Example

### In

```js
const sum = [1, 1, 1].reduce(_ + _);
```

### Out

```js
const sum = [1, 1, 1].reduce((a, b) => {
    return a + b;
});
```
