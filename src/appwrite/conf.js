import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class service {
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

  async createPost({ title, slug, content, featuredImage, status, userId }) {
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

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwrite.bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwrite.bucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
  }
  
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appwrite.bucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
    }
  }
}

const appwriteService = new service();
export default appwriteService;