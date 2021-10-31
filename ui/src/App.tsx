import {useEffect, useReducer} from 'react'
import {LeftSidePanel} from './components/left-side-panel/left-side-panel'
import styled from 'styled-components'
import {codeBuilder} from './lib/code-builder/code-builder'
import {blocksReducer, blocksInitialState} from './lib/state'

const AppContainer = styled.div`
  display: grid;
  grid-template-areas: 'left-side-panel board';
  grid-template-columns: 300px 1fr;
  grid-gap: 0px;
  height: 100vh;
`

export function App() {
  const [state, dispatch] = useReducer(blocksReducer, blocksInitialState)

  useEffect(() => {
    codeBuilder(state)
  }, [state])

  return (
    <AppContainer>
      <LeftSidePanel blocks={state} dispatch={dispatch} />
      <div>board</div>
    </AppContainer>
  )
}
