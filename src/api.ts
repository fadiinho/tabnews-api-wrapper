import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { AnyContent, Content, ContentParams, ContentWithoutBody } from "../types/content";
import  { TabnewsError } from "../types/errors";

export class TabnewsApi {
    axiosOptions: AxiosRequestConfig;
    client: AxiosInstance;
    constructor(axiosOptions?: AxiosRequestConfig) {
        this.axiosOptions = {
            baseURL: 'https://www.tabnews.com.br/api/v1',
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            },
            ...axiosOptions
        };

        this.client = axios.create(this.axiosOptions);
    }

    private async _getContents(path: string, params?: ContentParams): Promise<AnyContent | TabnewsError> {
        const response: AxiosResponse = await this.client.get(`/contents${path}`, { params: {
                page: params?.page,
                per_page: params?.perPage,
                strategy: params?.strategy
            }
        });

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
        // @ts-ignore
        const response: AxiosResponse = await this.client.get(`/contents/${user}/${slug}/thumbnail`, {
            responseType: 'arraybuffer'
        });

        return response.data;
    }
}
