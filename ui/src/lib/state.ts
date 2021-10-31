import {Blocks} from './code-builder/block-types'

export const ADD_VARIABLE = 'ADD_VARIABLE'

type AddVariableAction = {
  type: typeof ADD_VARIABLE
  payload: {
    name: string
    userCreated: boolean
    variableType: 'number' | 'string'
    value: string
  }
}

export type BlockActions = AddVariableAction

export const blocksInitialState: Blocks = {}
export function blocksReducer(state: Blocks, action: BlockActions): Blocks {
  switch (action.type) {
    case ADD_VARIABLE:
      return {
        ...state,
        [action.payload.name]: {
          type: 'variable',
          userCreated: action.payload.userCreated,
          variableType: action.payload.variableType,
          value: action.payload.value,
          previous: '',
          next: ''
        }
      }

    default:
      return state
  }
}

/* const blocks: Blocks = {
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
 */
