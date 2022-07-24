import connect from '../../lib/mongodb'
import user from '../../model/schema'

connect()

export default async function handler (req, res) {
    try {
        const registered = await user.create(req.body)
        res.redirect("/")

        if (!registered) {
            res.json({code: "User not registered"})
        }
    } catch (error) {
        res.status(400).json({status: "Failed to register user"})
    }
}