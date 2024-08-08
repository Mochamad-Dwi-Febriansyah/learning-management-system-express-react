const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.userData.user_type

        if(allowedRoles.includes(userRole)){
            next()
        }else{
            return res.status(403).json({
                status: 403,
                message: 'Anda tidak berwenang untuk melakukan tindakan ini'
            })
        }
    }
}

module.exports = roleCheck