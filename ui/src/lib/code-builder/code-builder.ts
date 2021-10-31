import {
  CodeBlockWriter,
  Project,
  SourceFile,
  VariableDeclarationKind
} from 'ts-morph'
import {
  Blocks,
  FunctionBlock,
  IfBlock,
  LogBlock,
  OperatorBlocks,
  VariableBlock
} from './block-types'

function createIf(
  file: SourceFile,
  writer: CodeBlockWriter,
  blocks: Blocks,
  key: string,
  block: IfBlock
) {
  const operatorBlock = blocks[block.operatorKey] as OperatorBlocks
  if (!operatorBlock) {
    return
  }

  writer
    .writeLine(
      `if (${file
        .getVariableDeclaration(operatorBlock.valueOneRef)
        ?.getName()} > ${file
        .getVariableDeclaration(operatorBlock.valueTwoRef)
        ?.getName()})`
    )
    .block(() => {
      block.children.map((key: string) => createNext(file, writer, blocks, key))
    })
}

function createLog(
  file: SourceFile,
  writer: CodeBlockWriter,
  blocks: Blocks,
  key: string,
  block: LogBlock
) {
  writer.writeLine(`console.log(${block.value})`)
}

function createNext(
  file: SourceFile,
  writer: CodeBlockWriter,
  blocks: Blocks,
  nextKey: string
) {
  writer.blankLine()
  const block = blocks[nextKey]

  switch (block?.type) {
    case 'function':
      createFunction(file, blocks, nextKey, block)
      break
    case 'if':
      createIf(file, writer, blocks, nextKey, block as IfBlock)
      break
    case 'larger-than':
      break
    case 'log':
      createLog(file, writer, blocks, nextKey, block as LogBlock)
      break
    case 'variable':
      break
  }

  if (block?.next) {
    createNext(file, writer, blocks, block.next)
  }
}

function createFunction(
  file: SourceFile,
  blocks: Blocks,
  key: string,
  block: FunctionBlock
) {
  const _function = file.addFunction({
    name: key,
    isExported: false,
    isAsync: false
  })

  _function.setBodyText((writer) => {
    createNext(file, writer, blocks, block.next)
  })
}

export async function codeBuilder(blocks: Blocks) {
  const blocksArray = Object.entries(blocks)

  /*   if (blocksArray.length === 0) {
    return
  } */

  const fileName = 'file.ts'
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: 3
    }
  })
  const fs = project.getFileSystem()
  const file = project.createSourceFile(fileName, '')

  const allVariables = blocksArray.filter(
    ([_, value]) => value.type === 'variable'
  ) as Array<[string, VariableBlock]>

  if (allVariables.length > 0) {
    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Let,
      declarations: allVariables.map(([key, data]) => ({
        name: key,
        type: data.variableType,
        initializer: data.value
      }))
    })
  }

  const allFunctions = blocksArray.filter(
    ([_, value]) => value.type === 'function'
  ) as Array<[string, FunctionBlock]>

  allFunctions.forEach(([key, block]) =>
    createFunction(file, blocks, key, block)
  )

  allFunctions.forEach(([key, block]) => {
    if (block.root) {
      file.addStatements(`${key}();`)
    }
  })

  await file.save()
  const content = await fs.readFile(fileName)
  console.log(content)

  const result = project.emitToMemory()
  for (const file of result.getFiles()) {
    console.log(file.text)
    eval(file.text)
  }
}
