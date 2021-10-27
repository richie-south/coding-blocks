import React from 'react'
import {Blocks} from './lib/code-builder/block-types'
import {codeBuilder} from './lib/code-builder/code-builder'

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

codeBuilder(blocks)
export function App() {
  return <div>Hej</div>
}
