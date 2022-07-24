import Link from 'next/link'

export default function Register () {
    return (
        <main>
            <h1>Just a simple note taking application</h1>
            <h2>Register</h2>
            <form style={{ width: "400px", display: "grid", gap: 8, marginTop: 16 }} action="/api/register" method="post">
                <label>E-mail address</label>        
                <input type="email" name="email" placeholder="Inform your registered e-mail" style={{ height: 32 }} required></input>
                <label>Password</label>
                <input type="password" name="password" placeholder="Provide your unbreakable password" style={{ height: 32 }} required></input>            
                <input type="submit" value="Submit" style={{ height: 32 }}></input>
            </form>
            <Link href="/"><a>Back to home</a></Link>
        </main>
    )
}