const db = require('../database')

module.exports = {
    getAccess: async (req, res, next) => {
        const link = req.params.link
        try {
            const [checkLink] = await db.query('SELECT * FROM `data` WHERE `short_link` = ? LIMIT 1', [link])
            if (!checkLink.length) {
                const error = new Error('Link not found')
                next(error)
            } else {
                const url = checkLink[0]
                res.redirect(url.original_link)
            }
        } catch {
            const error = new Error('Internal server error')
            error.statusCode = 500
            next(error)
        }
    }
}