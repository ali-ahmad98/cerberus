var jwt = require('jsonwebtoken'); 
const config = require('../config/config');
const { sendResponseData } = require('../util/Utility');

exports.validateToken = async (req, res, next) => {

    var token = req.headers['authorization'];
        if (token) {
            if (token.startsWith('Bearer ') || token.startsWith('bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            // decode token
            if (token) {
                jwt.verify(token, config.secretKey, function (err, decoded) {
                        if (err) { 
                            sendResponseData(res, 200, false, "Token expired. Please login again.", {});
                        }
                        else {
                            //VALID USER CHECK
                            if (req.body.customerId != decoded.subject) { 
                                sendResponseData(res, 200, false, "Request info not valid", {})
                            } else {
                                // console.log(decoded);
                                res.locals.user_id = decoded.user_id;
                                req.user_id = decoded.user_id;
                                next();
                            }
                        }
                    });

            } else {
                sendResponseData(res, 200, false, "Token format not valid", {});
            }
        } else {
            sendResponseData(res, 200, false, "Token not found", {});
        }


}