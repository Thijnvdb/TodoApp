import {createContext, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Button} from "reactstrap";

const ReactModal = ({children, modalOpen, handleModalOpen, title, submitFormName}) => {
    return (
        <>
            <Modal show={modalOpen} onHide={handleModalOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {submitFormName &&
                        <Button color="primary" type="submit" form={submitFormName}>
                            Confirm
                        </Button>
                    }
                    <Button color="danger" onClick={handleModalOpen}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReactModal;