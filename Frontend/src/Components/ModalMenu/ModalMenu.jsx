import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ModalMenu = ({

  currentCategory,
  onInputChangeCategory,
  handleOnSubmit,
  show,
  setShow
}) => {

  let navigate = useNavigate()


  const handleClose = () => {
    setShow(false)
    navigate('/addCategory')

  }


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digit category name ..."
                autoFocus
                name='currentCategory'
                defaultValue={currentCategory.nome}
                onChange={(e) => onInputChangeCategory(e)}
              />
            </Form.Group>
                  <Button
                    type='submit'
                    variant="primary m-1 py-2"
                     >
                    Submit
                  </Button>
                  <Button
                    variant="secondary m-2 py-2"
                    onClick={handleClose}>
                    Close
                  </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>

      </Modal>
    </>
  );
}


export default ModalMenu