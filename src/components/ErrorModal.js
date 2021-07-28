import React from 'react';
import { Button, Modal } from 'react-bootstrap'



class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <>
        <Modal show={this.props.modalVis}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Oh No! Error! We recieved a <span><strong>{this.props.errStatus}</strong></span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><span><strong>Message: </strong>{this.props.errMessage}</span></p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.modalHandler}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default ErrorModal;