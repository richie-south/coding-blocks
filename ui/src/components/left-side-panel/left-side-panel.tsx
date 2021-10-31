import styled from 'styled-components'
import {Blocks} from '../../lib/code-builder/block-types'
import {BlockActions} from '../../lib/state'
import {ListBlocks} from '../list-blocks/list-blocks'

const LeftSidePanelContainer = styled.div`
  background-color: #ececec;
  grid-area: left-side-panel;
  padding: 16px;
`

type Props = {
  blocks: Blocks
  dispatch: React.Dispatch<BlockActions>
}

export const LeftSidePanel: React.FC<Props> = ({dispatch, blocks}) => {
  return (
    <LeftSidePanelContainer>
      <ListBlocks blocks={blocks} dispatch={dispatch} />
    </LeftSidePanelContainer>
  )
}
