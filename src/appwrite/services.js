import { Client, Account, Storage, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId) // Your project ID

const account = new Account(client);
const storage = new Storage(client)
const database = new Databases(client)

//Tweet services
export const createTweet = async ({ content, tweetImage, reactionCount, userId, username }) => {
    try {
        const tweet = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            ID.unique(),
            {
                content, tweetImage, reactionCount, userId, username
            }
        )
        return tweet
    } catch (error) {
        console.log("appwriteError :: createTweet :: error", error)
        throw error
    }
}

export const getAllTweets = async (queries = [Query.orderDesc("$createdAt")]) => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwriteError :: getAllTweets :: error", error)
        throw error
    }
}

export const updateTweet = async (tweetId, { data }) => {
    try {
        return await database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            tweetId,
            {
                ...data
            }
        )
    } catch (error) {
        console.log("appwriteError :: updateTweet :: error", error)
        throw error
    }
}

export const deleteTweet = async (tweetId) => {
    try {
        await database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            tweetId
        )
        return true
    } catch (error) {
        console.log("appwriteError :: updateTweet :: error", error)
        throw error
    }
}

//Comment Services 
export const createComment = async ({ userId, username, tweetId, content }) => {
    try {
        const comment = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            ID.unique(), {
            userId, username, tweetId, content
        })
        return comment
    } catch (error) {
        console.log("appwriteError :: updateTweet :: error", error)
        throw error
    }
}

export const getAllComments = async (queries = [Query.orderDesc("$createdAt")]) => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwriteError :: getAllComments :: error", error)
        throw error
    }
}

export const deleteComment = async (commentId) => {
    try {
        await database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            commentId
        )
        return true
    } catch (error) {
        console.log("appwriteError :: deleteComment :: error", error)
        throw error
    }
}
//Followers services

export const createFollow = async ({ followerId, followingId }) => {
    try {
        const comment = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteFollowsCollectionId,
            ID.unique(), {
            followerId, followingId
        })
        return comment
    } catch (error) {
        console.log("appwriteError :: createFollow :: error", error)
        throw error
    }
}

export const getAllFollowers = async (queries = [Query.orderDesc("$createdAt")]) => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteFollowsCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwriteError :: getAllFollowers :: error", error)
        throw error
    }
}

export const getAllFollowing = async (queries = [Query.orderDesc("$createdAt")]) => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteFollowsCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwriteError :: getAllFollowing :: error", error)
        throw error
    }
}


export const unFollow = async (followId) => {
    try {
        await database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteFollowsCollectionId,
            followId
        )
        return true
    } catch (error) {
        console.log("appwriteError :: deleteFollow :: error", error)
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

export const getFileView = (fileId) => {
    return storage.getFileView(
        conf.appwriteBucketId,
        fileId
    )
}
