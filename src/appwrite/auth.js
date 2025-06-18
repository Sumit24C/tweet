import { Client, Account, Databases, ID } from "appwrite";
import conf from "../conf/conf";
import { useSelector } from "react-redux";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId) // Your project ID

const account = new Account(client);

export const createAccount = async ({ username, email, password }) => {
    try {
        const userAccount = await account.create(ID.unique(), email, password, username)
        if (userAccount) {
            return await login({ email, password })
        } else {
            return userAccount
        }
    } catch (error) {
        console.log("appwriteError :: createAccount :: error", error)
        throw error
    }
}

// export const createUserDocumnent = async ({ username, email }, appwriteUserId) => {
//     try {
//         const userData = await database.createDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteUsersCollectionId,
//             ID.unique(),
//             {
//                 username,
//                 email,
//                 appwriteUserId
//             }
//         )
//         return userData
//     } catch (error) {
//         console.log("appwriteError :: createUserDocument :: error", error)
//         throw error
//     }
// }

export const login = async ({ email, password }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        if (session) {
            const userData = await account.get()
            return userData
        }
    } catch (error) {
        console.log("appwriteError :: Login :: error", error)
        throw error
    }
}

export const logout = async () => {
    try {
        await account.deleteSessions()
        return true
    } catch (error) {
        console.log("appwriteError :: Logout :: error", error)
        return false
    }
}

export const getCurrentUser = async () => {
    try {
        const userData = await account.get()
        if (userData) {
            return userData
        }
        return null
    } catch (error) {
        console.log("appwriteError :: getCurrentUser :: error", error)
        return false
    }
}
