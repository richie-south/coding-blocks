import styled from 'styled-components'
import {Blocks, VariableBlock} from '../../lib/code-builder/block-types'
import {BlockActions} from '../../lib/state'
import {CreateVariable} from '../create-variable/create-variable'

const ListBlocksContainer = styled.div`
  margin-top: 16px;
  display: grid;

  grid-gap: 8px;
`

const VariableBlockItem = styled.div`
  height: 26px;
  font-size: 14px;
  background-color: orange;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
  padding-right: 6px;
  justify-self: flex-start;
`

type Props = {
  blocks: Blocks
  dispatch: React.Dispatch<BlockActions>
}

export const ListBlocks: React.FC<Props> = ({dispatch, blocks}) => {
  const blocksArray = Object.entries(blocks).filter(
    ([k, v]) => v.type === 'variable'
  ) as Array<[string, VariableBlock]>

  return (
    <ListBlocksContainer>
      <h4>Variables</h4>

      {blocksArray.map(([key, value]) => (
        <VariableBlockItem key={key}>{key}</VariableBlockItem>
      ))}
      <CreateVariable blocks={blocks} dispatch={dispatch} />
    </ListBlocksContainer>
  )
}
