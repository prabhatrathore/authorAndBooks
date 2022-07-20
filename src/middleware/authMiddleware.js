const jwt = require("jsonwebtoken")

const middleWare = async function (req, res, next) {
    // try {
    let token = req.headers['x-api-key']
    if (!token) {
        return res.send({ status: false, Message: 'No token found' })
    }
    else {
        let decodedtoken = jwt.verify(token, 'Group2')
        if (decodedtoken.length != 0) {
            // req.decodedtoken = decodedtoken;
            req.authorId = decodedtoken
            next();
        } else {
            res.status(404).send({ Message: "Not valid Token" })
        }
        // }
        // } catch (err) {
        //     res.status(404).send({ status: false, msg: err.message })

    }
}
module.exports.middleWare = middleWare;

// const jwt = require('jsonwebtoken')

// const middleWare = async (req, res, next) => {
//     try {
//         const token = req.header('x-api-key')
//         if (!token) {
//             res.status(403).send({ status: false, message: `Missing authentication token in request` })
//             return;
//         }
//         const decoded = jwt.verify(token, 'Group2')

//         if (!decoded) {
//             res.status(403).send({ status: false, message: `Invalid authentication token in request` })
//             return;
//         }
//         req.userId = decoded.userId;
//         next()
//     } catch (error) {

//         res.status(500).send({ status: false, message: error.message })
//     }
// }
// module.exports = middleWare