interface BaseStatus {
    /**
     * Date in the format dd/mm
     */
    date: string;
}
export interface UsersCreatedStatus extends BaseStatus {
    cadastrados: number;
}
export interface RootContentPublishedStatus extends BaseStatus {
    conteudos: number;
}
export interface ChildContentPublishedStatus extends BaseStatus {
    respostas: number;
}
export {};
