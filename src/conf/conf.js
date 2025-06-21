const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteTweetsCollectionId: String(import.meta.env.VITE_APPWRITE_TWEETS_COLLECTION_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appwriteFollowsCollectionId: String(import.meta.env.VITE_APPWRITE_FOLLOWS_COLLECTION_ID),
    appwriteReactionsCollectionId: String(import.meta.env.VITE_APPWRITE_REACTIONS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf