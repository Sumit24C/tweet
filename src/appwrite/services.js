import { Client, Account, Storage, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId) // Your project ID

const account = new Account(client);
const storage = new Storage(client)
const database = new Databases(client)

//Tweet services
export const createTweet = async ({ content, tweetImage, userId, username }) => {
    try {
        const tweet = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTweetsCollectionId,
            ID.unique(),
            {
                content, tweetImage, userId, username
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

export const deleteTweet = async (tweetId, tweetImage) => {
    try {
        if (tweetImage) {
            await deleteFile(tweetImage)
        }

        await deleteCommentWithTweet(tweetId)
        await deleteReactionWithTweet(tweetId)
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

export const deleteCommentWithTweet = async (tweetId = "") => {
    try {
        const commentList = await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            [Query.equal('tweetId', tweetId)]
        )
        if (commentList) {
            const deletionPromise = commentList.documents.map(async (comment) => {
                await database.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCommentsCollectionId,
                    comment.$id
                )
            })

            await Promise.all(deletionPromise)
            return true
        }
        return false
    } catch (error) {
        console.log("appwriteError :: updateTweet :: error", error)
        throw error
    }
}
export const createReaction = async ({ userId, tweetId, liked }) => {
    try {
        const reaction = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteReactionsCollectionId,
            ID.unique(),
            {
                userId, tweetId, liked
            }
        )
        return reaction
    } catch (error) {
        console.log("appwriteError :: createReaction :: error", error)
        throw error
    }
}


export const getAllReaction = async (queries = [Query.orderDesc("$createdAt")]) => {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteReactionsCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwriteError :: getAllReactions :: error", error)
        throw error
    }
}

export const deleteReaction = async (reactionId) => {
    try {

        await database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteReactionsCollectionId,
            reactionId
        )
        return true

    } catch (error) {
        console.log("appwriteError :: deleteReaction :: error", error)
        throw error
    }
}

export const deleteReactionWithTweet = async (tweetId = "") => {
    try {
        const reactionList = await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteReactionsCollectionId,
            [Query.equal('tweetId', tweetId)]
        )
        if (reactionList) {
            const deletionPromise = reactionList.documents.map(async (reaction) => {
                await database.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteReactionsCollectionId,
                    reaction.$id
                )
            })

            await Promise.all(deletionPromise)
            return true
        }
        return false
    } catch (error) {
        console.log("appwriteError :: cascaded delete reaction :: error", error)
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

export const createFollow = async ({ followerId, followingId, followerName, followingName }) => {
    try {
        const follow = await database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteFollowsCollectionId,
            ID.unique(), {
            followerId, followingId, followerName, followingName
        })
        return follow
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
            queries,
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
