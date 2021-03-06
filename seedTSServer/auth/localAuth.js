var jwt = require("jwt-simple");
var moment = require("moment");
var $Token = require("./token");
var $EmailVerification = require("./emailVerification");
var $log = require("../services/logger");
var $configSecret = require("../services/configSecret");
var moduleName = "localAuth";
function register(expReq, expRes, info) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}
exports.register = register;
function login(expReq, expRes, info) {
    $Token.createSendToken(expReq.user, expRes);
}
exports.login = login;
function authenticationCheck(expReq, expRes, next) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    }
    else {
        $log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var authorization = expReq.headers["authorization"];
        var token = authorization.split(" ")[1];
        try {
            var payload = jwt.decode(token, $configSecret.JWT_SECRET);
        }
        catch (e) {
            payload = {};
        }
        if (!payload.sub) {
            return expRes.status(401).send({ message: "Authentication failed" });
        }
        else {
            if (moment.unix(payload.exp).diff(moment(), 'second') < 0) {
                console.log("!!!!token expired!!!");
            }
            next();
        }
    }
}
exports.authenticationCheck = authenticationCheck;
//# sourceMappingURL=localAuth.js.map