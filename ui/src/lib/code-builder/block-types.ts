export type Block = {
  previous: string
  next: string
}

export type FunctionBlock = {
  type: 'function'
  root: boolean
} & Block

export type IfBlock = {
  type: 'if'
  operatorKey: string
  children: string[]
} & Block

export type LargerThanBlock = {
  type: 'larger-than'
  valueOneRef: string
  valueTwoRef: string
} & Block

export type VariableBlock = {
  type: 'variable'
  userCreated: boolean
  variableType: 'number' | 'string'
  value: string
} & Block

export type LogBlock = {
  type: 'log'
  value: string | number
} & Block

export type OperatorBlocks = LargerThanBlock

export type Blocks = {
  [key: string]:
    | FunctionBlock
    | IfBlock
    | LargerThanBlock
    | VariableBlock
    | LogBlock
}
