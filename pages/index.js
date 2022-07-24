import Link from 'next/link'

export default function Home () {
  return (
    <main>
      <h1>Just a simple note taking application</h1>
      <h2>Authenticate</h2>
      <Link href="/register"><a>If you are not registered, feel free to do so by clicking here.</a></Link>
      <form style={{ width: "400px", display: "grid", gap: 8, marginTop: 16 }} action="/api/login" method="post">
        <label>E-mail address</label>        
        <input type="email" name="email" placeholder="Inform your registered e-mail" style={{ height: 32 }}></input>
        <label>Password</label>
        <input type="password" name="password" placeholder="Provide your unbreakable password" style={{ height: 32 }}></input>
        <input type="submit" value="Submit" style={{ height: 32 }}></input>
      </form>      
    </main>
  )
}