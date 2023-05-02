import { useOutletContext } from "react-router-dom"
import { Note } from "./Note"
import { v4 as uuidV4 } from "uuid"

function newNote(): Note {
    return { id: uuidV4(), title: "", text: "" }
}

export function useNote() {
    return useOutletContext<Note>() || newNote()
}