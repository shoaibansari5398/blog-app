import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwiteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async getPosts(query = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appwiteDatabaseId,
				conf.appwriteCollectionId,
				query
			);
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async createPost({title,content,status,userId,slug,featuredImage}) {
		try {
			return await this.databases.createDocument(
				conf.appwiteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{title,content,status,userId,featuredImage}
			);
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async updatePost(slug,{title,content,status,featuredImage}) {
		try {
			return await this.databases.updateDocument(
				conf.appwiteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{title,content,status,featuredImage}
			);
		} catch (error) {
			console.log(error);
			return false;
		}

	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwiteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}

const service = new Service();
export default service;
