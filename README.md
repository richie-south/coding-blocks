# coding-blocks

Takes a JSON structure like this

```typescript
const blocks: Blocks = {
  start: {
    type: 'function',
    root: true,
    next: 'uniq',
    previous: ''
  },

  uniq: {
    type: 'if',
    operatorKey: 'uniqOperatorKey',

    children: ['uniqLogBlock'],
    previous: 'start',
    next: ''
  },

  uniqOperatorKey: {
    type: 'larger-than',
    valueOneRef: 'uniqVariable2',
    valueTwoRef: 'uniqVariable',
    previous: '',
    next: ''
  },

  uniqVariable: {
    type: 'variable',
    userCreated: true,
    variableType: 'number',
    value: '10',
    previous: '',
    next: ''
  },

  uniqVariable2: {
    type: 'variable',
    userCreated: false,
    variableType: 'number',
    value: '20',
    previous: '',
    next: ''
  },

  uniqLogBlock: {
    type: 'log',
    value: "'Hello World!'",
    previous: '',
    next: ''
  }
}
```

And outputs Typescipt / Javascript

Typescript

```typescript
let uniqVariable: number = 10,
  uniqVariable2: number = 20

function start() {
  if (uniqVariable2 > uniqVariable) {
    console.log('Hello World!')
  }
}
start()
```

or javascript

```javascript
let uniqVariable = 10,
  uniqVariable2 = 20
function start() {
  if (uniqVariable2 > uniqVariable) {
    console.log('Hello World!')
  }
}
start()
```

Intended to be a crappy version of [Blocky](https://developers.google.com/blockly) but it is missing ui elements and lots of other stuff at the moment
