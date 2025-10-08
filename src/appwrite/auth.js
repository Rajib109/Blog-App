import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite.url)
      .setProject(config.appwrite.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite serive :: login :: error", error);
    }
  }

  getCurrentUser = async () => {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      if (error.code === 401) {
        console.warn("No active session. Redirecting to login...");
        return null;
      }
      throw error;
    }
  };

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
