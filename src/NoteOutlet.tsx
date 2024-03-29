import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "./Note"

type NoteOutletProps = {
    notes: Note[]
}

export default function NoteOutlet({ notes }: NoteOutletProps) {
    const { id } = useParams()
    const note = notes.find(note => note.id === id)

    if (note == null) {
        return <Navigate to="/" replace />
    }

    return <Outlet context={note} />
}