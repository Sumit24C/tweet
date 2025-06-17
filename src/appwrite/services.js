import { Client, Account, Storage, Databases, ID } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId) // Your project ID

const account = new Account(client);
const storage = new Storage(client)
const database = new Databases(client)

//Tweet services
export const createTweet = async ({ content, tweetImage, reactionCount, userId }) => {
    try {
        const tweet = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            ID.unique(),
            {
                content, tweetImage, reactionCount, userId
            }
        )

        return tweet
    } catch (error) {
        console.log("appwriteError :: createTweet :: error", error)
        throw error
    }
}

export const getAllTweets = async () => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId
        )
    } catch (error) {
        console.log("appwriteError :: getAllTweets :: error", error)
        throw error
    }
}
//File services
export const uploadFile = async (file) => {
    try {
        return await storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwriteError :: uploadFile :: error", error)
        throw error
    }
}

export const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("appwriteError :: deleteFile :: error", error)
        throw error
    }
}

export const updateFile = async (fileId) => {
    try {
        const updatedFile = await storage.updateFile(
            conf.appwriteBucketId,
            fileId,
        )
        return updatedFile
    } catch (error) {
        console.log("appwriteError :: updateFile :: error", error)
        throw error
    }
}

export const getFileView = async (fileId) => {
    return storage.getFileView(
        conf.appwriteBucketId,
        fileId
    )
}

//File Services