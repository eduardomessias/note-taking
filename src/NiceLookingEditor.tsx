import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { FormEvent, useRef } from "react"
import { Note } from "./Note"
import UsefulMenu from "./UsefulMenu"
import { useNavigate } from "react-router-dom"

type NiceLookingEditorProps = {
    onDelete: (note: Note) => void
    onSubmit: (metadata: Note) => void
    onImport: (json: string) => void
    currentNote: Note
}

export default function NiceLookingEditor({ onDelete, onSubmit, onImport, currentNote }: NiceLookingEditorProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const textRef = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()

    function cleanUp() {
        titleRef.current!.value = ""
        textRef.current!.value = ""
    }

    function handleDelete() {
        onDelete(currentNote)
        cleanUp()
        navigate("/")
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        currentNote.title = titleRef.current!.value
        currentNote.text = textRef.current!.value
        onSubmit(currentNote)
        cleanUp()
        navigate("/")
    }

    return (
        <Form onSubmit={handleSubmit} className="">
            <UsefulMenu onImport={onImport} />
            <Stack gap={2}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} defaultValue={currentNote.title} required type="text" placeholder="Awesome note tentative no. 37" className="fs-3" autoFocus />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Text editor</Form.Label>
                    <Form.Control ref={textRef} defaultValue={currentNote.text} required as="textarea" rows={16} placeholder="Once upon a time..." />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button variant="primary" type="submit">Submit</Button>
                    <Button variant="secondary" type="reset">Reset</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Stack>
            </Stack>
        </Form>
    )
}