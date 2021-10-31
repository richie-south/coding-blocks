import {useState} from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import {Blocks} from '../../lib/code-builder/block-types'
import {ADD_VARIABLE, BlockActions} from '../../lib/state'

type Props = {
  blocks: Blocks
  dispatch: React.Dispatch<BlockActions>
}

export const CreateVariable: React.FC<Props> = ({blocks, dispatch}) => {
  const [show, setShow] = useState(false)
  const [variableName, setVariableName] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCreate = () => {
    if (!isValidName(variableName)) {
      return
    }

    dispatch({
      type: ADD_VARIABLE,
      payload: {
        name: variableName,
        userCreated: true,
        variableType: 'string',
        value: ''
      }
    })

    setVariableName('')
    handleClose()
  }

  const handleCariableNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariableName(event.target.value)
  }

  const isValidName = (value: string) => {
    const regExp = new RegExp(/^([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*/gs)
    return regExp.test(value) && blocks[value] === undefined
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Create variable
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create variable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Variable</Form.Label>
              <Form.Control
                value={variableName}
                onChange={handleCariableNameChange}
                required
                isValid={isValidName(variableName)}
                isInvalid={!isValidName(variableName)}
                type="text"
                placeholder="Variable name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={!isValidName(variableName)}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
