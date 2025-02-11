import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		const userAccount = await this.account.create(
			ID.unique(),
			email,
			password,
			name
		);
		if (userAccount) {
			return this.login({ email, password });
		} else {
			return userAccount;
		}
	}

	async login({ email, password }) {
		// eslint-disable-next-line no-useless-catch
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async logout() {
		try {
			return await this.account.deleteSession();
		} catch (error) {
			console.log(error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log(error);
		}
	}
}

const authService = new AuthService();

export default authService;
