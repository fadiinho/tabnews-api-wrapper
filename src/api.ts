import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { AnyContent, Content, ContentParams, ContentWithoutBody } from "./types/content";
import { ChildContentPublishedStatus, RootContentPublishedStatus, UsersCreatedStatus } from "./types/status";
import  { TabnewsError } from "./types/errors";
import { UserToken } from "./types/user";

export class TabnewsApi {
    axiosOptions: AxiosRequestConfig;
    client: AxiosInstance;
    constructor(axiosOptions?: AxiosRequestConfig) {
        this.axiosOptions = {
            baseURL: 'https://www.tabnews.com.br/api/v1',
            headers: {
                "Accept-Encoding": "gzip,deflate,compress",
                "Content-Type": "application/json"
            },
            ...axiosOptions
        };

        this.client = axios.create(this.axiosOptions);
    }

    private _handleError(error: AxiosError) {
        if (error.response) {
            return error.response;
        }

        throw error;
    }

    private async _getContents(path: string, params?: ContentParams): Promise<AnyContent | TabnewsError> {
        const response: AxiosResponse = await this.client.get(`/contents${path}`, { params: {
                page: params?.page,
                per_page: params?.perPage,
                strategy: params?.strategy
            }
        }).catch(this._handleError);

        return response.data;
    }

    /** Get the posts from the homepage
     * @returns An array containing posts
     */
    async getPosts(params?: ContentParams): Promise<Omit<Content, 'body'>[] | TabnewsError> {
        const response = await this._getContents("/", params) as ContentWithoutBody[];

        return response;
    }

    /** Get the posts from a specific user
     * @returns An array containing posts or an empty array if the user doesn't have any posts
     */
    async getPostsByUser(username: string, params?: ContentParams): Promise<Content[] | TabnewsError> {
        const response = await this._getContents(`/${username}`, params) as Content[];

        return response;
    }

    /** Get the post and its details
     * @returns The details of a post
     */
    async getPostDetails(user: string, slug: string): Promise<Content | TabnewsError> {
        const response = await this._getContents(`/${user}/${slug}`) as Content;

        return response;
    }

    /** Get the comments of a post
     * @returns A array containing the comments of a post
     */
    async getPostComments(user: string, slug: string): Promise<Content[] | TabnewsError> {
        const response = await this._getContents(`/${user}/${slug}/children`) as Content[];

        return response;
    }

    /** Get the thumbnail of a post
     * @returns a image as buffer
     */
    async getPostThumbnail(user: string, slug: string): Promise<Buffer | TabnewsError> {
        const response: AxiosResponse = await this.client.get(`/contents/${user}/${slug}/thumbnail`, {
            responseType: 'arraybuffer'
        }).catch(this._handleError);;

        return response.data;
    }

    private async _getStatus(path: string) {
        const response: AxiosResponse = await this.client.get(`/analytics${path}`)
            .catch(this._handleError);

        return response.data;

    }

    /**
     * Get the analytics of the registred users
     * @returns an array containing how many users were created (per day)
     */
    async userAnalytics(): Promise<UsersCreatedStatus[]> {
        const userStatus = this._getStatus('/users-created');

        return userStatus;
    }

    /**
     * Get the analytics of the registred posts
     * @returns an array containing how many posts were created (per day)
     */
    async postAnalytics(): Promise<RootContentPublishedStatus[]> {
        const userStatus = this._getStatus('/root-content-published');

        return userStatus;
    }

    /**
     * Get the analytics of the published comments
     * @returns an array containing how many comments were created (per day)
     */
    async commentsAnalytics(): Promise<ChildContentPublishedStatus[]> {
        const userStatus = this._getStatus('/child-content-published');

        return userStatus;
    }

    /**
     * Creates a user
     * @param username - new user username
     * @param email - new user email
     * @param password - new user password
     * @returns ?
     */
    // TODO: esta função não foi testada
    async createUser(
        data: { username: string; email: string; password: string; }
    ): Promise<unknown> {
        const response = await this.client.post('/users', data).catch(this._handleError);

        return response.data;
    }


    /**
     * Login with email and password
     * @param email - account email
     * @param password - account password
     * @returns an object containing auth info
     */
    async login(
        { email, password }: { email: string; password: string}
    ): Promise<UserToken> {
        const response = await this.client.post('/sessions', { email, password })
            .catch(this._handleError);

        return response.data;
    }

    /**
     * Recover account.
     * Only one of the following parameters should be used
     * @param username - account username
     * @param email - account email

     * @returns ?
     */
    // TODO: Esta função não foi testada
    async recovery(
        { username, email }: { username?: string; email?: string}
    ): Promise<unknown> {
        const response = await this.client.post('/recovery', { username, email })
            .catch(this._handleError);

        return response.data;
    }
}
