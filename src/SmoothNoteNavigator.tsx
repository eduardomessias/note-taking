import { useMemo, useState } from "react"
import { Form, Nav, Stack } from "react-bootstrap"
import { Note } from "./Note"
import styles from "./SmoothNoteNavigator.module.css"

type SmoothNoteNavigatorProps = {
    notes: Note[]
    currentNote: Note
}

export default function SmoothNoteNavigator({ notes, currentNote }: SmoothNoteNavigatorProps) {
    const [excerpt, setExcerpt] = useState("")

    const relatedNotes = useMemo(() => {
        return notes.filter(note => currentNote != note && currentNote.text.toLowerCase().includes(note.title.toLowerCase()))
    }, [notes, excerpt, currentNote])

    const filteredNotes = useMemo(() => {
        if (excerpt === null) return notes
        return notes.filter(note => {
            return !relatedNotes.includes(note) && (note.title.toLowerCase().includes(excerpt.toLowerCase())
                || note.text.toLowerCase().includes(excerpt.toLowerCase()))
        })
    }, [notes, excerpt])

    return (
        <Stack gap={2}>
            <h2>Smooth note navigator</h2>
            <Form>
                <Form.Group controlId="title">
                    <Form.Control type="text" placeholder="Search" className="w-100" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
                </Form.Group>
            </Form>
            <Nav className="navbar-nav-scroll hv-100">
                {relatedNotes.map(note => (
                    <Nav.Item key={note.id} className={`border border-info shadow-sm my-2 w-100 ${styles.item}`}>
                        <Nav.Link href={`/${note.id}`}>
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                            <span className="badge bg-info">Related</span>
                        </Nav.Link>
                    </Nav.Item>
                ))}

                {filteredNotes.map(note => (
                    <Nav.Item key={note.id} className={`border border-light shadow-sm my-2 w-100 ${styles.item}`}>
                        <Nav.Link href={`/${note.id}`}>
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </Stack>
    )
}