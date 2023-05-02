import "./bootstrap.lumen.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { Note } from "./Note"
import NoteOutlet from "./NoteOutlet"
import NoteSpace from "./NoteSpace"

function App() {
  const [storedNotes, storeNotes] = useLocalStorage<Note[]>([])

  const notes = useMemo(() => {
    return storedNotes.map(note => {
      return { ...note }
    })
  }, [storedNotes])

  function writeNote({ ...note }: Note) {
    storeNotes(previous => {
      const index = previous.findIndex(n => n.id === note.id)
      if (index !== -1) {
        previous[index] = note
        return [...previous]
      }
      return [...previous, note]
    })
  }

  function deleteNote({ ...note }: Note) {
    storeNotes(previous => {
      const index = previous.findIndex(n => n.id === note.id)
      if (index !== -1) {
        previous.splice(index, 1)
        return [...previous]
      }
      return [...previous]
    })
  }

  function onImport(json: string) {
    const importedNotes = JSON.parse(json) as Note[]
    for (const note of importedNotes) {
      writeNote(note)
    }
  }

  return (
    <Container fluid className="my-4">
      <Routes>
        <Route path="/" element={<NoteSpace onDelete={deleteNote} onSubmit={writeNote} onImport={onImport} notes={notes} />} />
        <Route path="/:id" element={<NoteOutlet notes={notes} />}>
          <Route index element={<NoteSpace onDelete={deleteNote} onSubmit={writeNote} onImport={onImport} notes={notes} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
