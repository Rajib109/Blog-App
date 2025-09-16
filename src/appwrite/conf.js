import config from "./config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwrite.url)
            .setProject(config.appwrite.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({title, slud,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                config.appwrite.databaseId,
                config.appwrite.collectionId,
                slug,
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }