# ram-chunker

Rapid Asymmetric Maximum (RAM) is a high throughput, hash-less, byte shift-resistant content-defined chunking algorithm for data deduplication.

This package is a JavaScript implementation of RAM as described in the paper "[A new content-defined chunking algorithm for data deduplication in cloud storage](https://www.sciencedirect.com/science/article/abs/pii/S0167739X16305829)".

## Installation

```
npm install ram-chunker
```

## Usage

### Get chunk indices

```js
const { getCutPoints } = require("ram-chunker");

const data = "This is a test sentence.";
const windowSize = 4;
const cutPoints = getCutPoints(data, windowSize);

console.log(cutPoints); // [ 0, 7, 14, 19 ]
```

### Get chunks from indices

```js
const result = [];

for (let i = 0; i < cutPoints.length; i++) {
  const cutPoint = cutPoints[i];
  const nextcutPoint = cutPoints[i + 1];

  result[result.length] = data.slice(cutPoint, nextcutPoint);
}

console.log(result); // [ 'This is', ' a test', ' sent', 'ence.' ]
```
