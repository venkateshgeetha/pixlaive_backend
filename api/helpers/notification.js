module.exports.verifyFCMToken = function(fcmToken) {
    return admin.messaging().send({
        token: fcmToken
    }, true)
}