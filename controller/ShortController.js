const db = require('../database')
const shortlink = require('shortlink')

module.exports = {
    autoShort: async (req, res, next) => {
        const link = req.body.link
        try {
            const generateLink = await shortlink.generate(5)
            if (!generateLink.length) {
                const error = new Error('Shortlink fail to generate the link')
                next(error)
            } else {
                const newLink = `localhost:69/${generateLink}`
                await db.query('INSERT INTO `data`(original_link, short_link) VALUES(? , ?)', [link, generateLink])
                res.status(200).json({
                    "success": true,
                    "shortlink": newLink
                })
            }
        } catch {
            const error = new Error('Internal server error')
            error.statusCode = 500
            next(error)
        }
    },

    customizeShort: async (req, res, next) => {
        const link = req.body.link
        const customeLink = req.body.custome
        try {
            const [check] = await db.query('SELECT * FROM `data` WHERE `short_link` = ? LIMIT 1', [customeLink])
            if (check.length) {
                const error = new Error('Already taken')
                next(error)
            } else {
                const newLink = `localhost:69/${customeLink}`
                await db.query('INSERT INTO `data`(`original_link`, `short_link`) VALUES(? , ?)', [link, customeLink])
                res.status(200).json({
                    "success": true,
                    "shortlink": newLink
                })
            }
        } catch {
            const error = new Error('Insternal server error')
            error.statusCode = 500
            next(error)
        }
    }
}