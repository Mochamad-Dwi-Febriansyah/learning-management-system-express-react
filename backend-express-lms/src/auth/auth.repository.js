const  prisma = require("../db/index.js")

const getEmail = async (emailUser) => {
    const email = await prisma.user.findUnique({
        where: {
            email: emailUser
        }
    })

    return email
}

module.exports = getEmail