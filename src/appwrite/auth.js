import config from "../config/config";

import { Client, Account, ID } from "appwrite";

class AppwriteAuth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwrite.url) // Your Appwrite Endpoint
      .setProject(config.appwrite.projectId); // Your Appwrite Project ID
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({

        userId:ID.unique(), // Unique user ID
        email:email, // User email
        password:password, // User password
        name:name // User name
      }
      );
      if (userAccount) {
        return this.login({
          email,
          password,
        });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    try {
      const account = await this.account.get();
      return account;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
const appwriteAuth = new AppwriteAuth();

export default appwriteAuth;
