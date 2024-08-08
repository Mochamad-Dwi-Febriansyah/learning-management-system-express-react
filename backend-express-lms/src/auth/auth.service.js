const  getEmail   =require("./auth.repository.js")

const getUserByEmail = async (email) => {
    const user = await getEmail(email)

    return user
}

module.exports = getUserByEmail 