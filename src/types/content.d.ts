export interface Content {
    id: string;
    parent_id: string | null;
    owner_id: string;
    slug: string;
    body?: string;
    title: string | null;
    status: 'published' | 'draft';
    source_url: string | null;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    deleted_at: Date | null;
    tabcoins: number;
    owner_username: string;
    children_deep_count: number;
}
export type ContentWithoutBody = Omit<Content, 'body'>;
export type AnyContent = Content | Content[] | ContentWithoutBody;
export interface ContentParams {
    /**
     * Which page it should return
     */
    page?: number;
    /**
     * How many contents it should return per page
     */
    perPage?: number;
    /**
     * Classification order of the contents
     */
    strategy?: 'new' | 'old' | 'relevant';
}
