import { FormEvent, useRef, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";

type VerticallyCenteredModalProps = {
    show: boolean
    onNevermind: () => void
    onDone: (e: FormEvent) => void
}

function VerticallyCenteredModal({ show, onDone, onNevermind }: VerticallyCenteredModalProps) {

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onDone(e)
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Super secure auth framework
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Provide your unique identification</h4>
                    <p>
                        Please bear in mind that we are not able to read or recover your id
                        once you set it. So please, please, please take good care of the information
                        you will provide here now, as it is <strong>UNRECOVERABLE</strong> for your own safety.
                    </p>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Your personal email" required />
                    </Form.Group>
                    <Form.Group controlId="formPasscode">
                        <Form.Label>Passcode</Form.Label>
                        <Form.Control type="password" placeholder="Your legit unique safe passcode" required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Sign my notes with this id</Button>
                    <Button variant="light" onClick={onNevermind}>Nevermind</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default function SmoothNoteNavigator() {
    const [modalShow, setModalShow] = useState(false)

    function handleNevermind() {
        setModalShow(false)
    }

    function onDone() {


        setModalShow(false)
    }

    return (
        <>
            <h2>Super secure auth framework</h2>
            <Stack direction="horizontal" gap={2}>
                Sync your notes by signing them with your unique identification.
                <Button variant="primary" onClick={() => setModalShow(true)}>Sign</Button>
            </Stack>
            <VerticallyCenteredModal onNevermind={handleNevermind} onDone={onDone} show={modalShow} />
        </>
    )
}