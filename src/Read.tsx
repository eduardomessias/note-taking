import React from "react"
import NiceLookingEditor from "./NiceLookingEditor"
import SmoothNoteNavigator from "./SmoothNoteNavigator"
import { NoteMetadata } from "./NoteMetadata"
import { Col, Nav, Row, Stack } from "react-bootstrap"

type WriteProps = {
    onSubmit: (note: NoteMetadata) => void
}

export default function Read({ onSubmit }: WriteProps) {
    return (
        <Row>
            <Col md="8">
                <NiceLookingEditor onSubmit={onSubmit} readonly />
            </Col>
            <Col className="my-2">
                <SmoothNoteNavigator notes={[
                    {
                        id: '1',
                        title: "Awesome note tentative no. 36",
                        text: "Once upon a time a good person trying to organize their thoughts..."
                    },
                    {
                        id: '2',
                        title: "Awesome note tentative no. 35",
                        text: "Once upon a time a good person trying to organize their thoughts..."
                    },
                ]} />
            </Col>
        </Row>
    )
}