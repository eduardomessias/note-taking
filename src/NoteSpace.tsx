import NiceLookingEditor from "./NiceLookingEditor"
import SmoothNoteNavigator from "./SmoothNoteNavigator"
import { Col, Row, Stack } from "react-bootstrap"
import { Note } from "./Note"
import { useNote } from "./useNote"
import { v4 as uuidV4 } from "uuid"
import SuperSecureAuthFramework from "./SuperSecureAuthFramework"

type NoteSpaceProps = {
    onDelete: (note: Note) => void
    onSubmit: (note: Note) => void
    onImport: (json: string) => void
    notes: Note[]
}

export default function NoteSpace({ onDelete, onSubmit, onImport, notes }: NoteSpaceProps) {
    const currentNote = useNote()
    return (
        <Stack gap={4}>
            <Row>
                <Col md="8">
                    <NiceLookingEditor onDelete={onDelete} onSubmit={onSubmit} onImport={onImport} currentNote={currentNote} />
                </Col>
                <Col className="my-2">
                    <SmoothNoteNavigator notes={notes} currentNote={currentNote} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SuperSecureAuthFramework />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="mt-4"><strong>Simple note taking app</strong> © 2023 by Eduardo Messias</p>
                </Col>
            </Row>
        </ Stack>
    )
}
