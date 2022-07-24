import connect from '../../lib/mongodb'
import user from '../../model/schema'

connect()

export default async function handler (req, res) {
    try {
        const { email, password } = req.body
        const found = user.findOne({ email, password })

        if (found) {
            res.authenticated = true
            res.redirect("/")
        } else {
            res.json({code: "User not found"})
        }
    } catch (error) {
        res.status(400).json({status: "Failed to find user"})
    }
}