import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FileArrowDown, FileArrowUp, FileEarmark } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { decryptObject } from "./useEncryption";

type UsefulMenuProps = {
    onImport: (json: string) => void
}

export default function UsefulMenu({ onImport }: UsefulMenuProps) {
    const navigate = useNavigate()
    const { id } = useParams()

    function downloadLocalStorage() {
        if (localStorage.getItem('SIMPLE-NOTE-TAKING-APP') === null) return
        const data = decryptObject(localStorage.getItem('SIMPLE-NOTE-TAKING-APP'))
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
        const downloadAnchorNode = document.createElement("a")
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", "simple-note-taking-app.json")
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    function onFileReadLoad(e: ProgressEvent<FileReader>) {
        const result = e.target?.result
        if (typeof result === "string") {
            onImport(result)
            navigate("/")
        }
    }

    function onImportFileChange(e: Event) {
        if (e === null || e.target === null) return
        if (!(e.target instanceof HTMLInputElement)) return
        if (e.target.files === null) return
        if (e.target.files.length === 0) return
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = onFileReadLoad
        reader.readAsText(file)
    }

    function handleImport() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "application/json"
        input.onchange = onImportFileChange
        input.click()
    }

    return <Navbar expand="lg" className="mb-3">
        <Container fluid>
            <Navbar.Brand href="/">
                <h2>Nice looking editor</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        <h2>
                            Useful menu
                        </h2>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1">
                        <Nav.Item className="m-1">
                            <Button className="w-100" onClick={() => navigate("/")} disabled={id === undefined}><FileEarmark /> New note</Button>
                        </Nav.Item>
                        <Nav.Item className="m-1">
                            <Button variant="secondary" className="w-100" onClick={handleImport}><FileArrowUp /> Import notes</Button>
                        </Nav.Item>
                        <Nav.Item className="m-1">
                            <Button className="w-100" onClick={downloadLocalStorage} disabled={localStorage.length == 0}><FileArrowDown /> Export notes</Button>
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
}