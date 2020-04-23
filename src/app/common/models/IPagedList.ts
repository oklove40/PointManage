export interface IPagedList<T> {
    totalCount: number;
    pageNum: number;
    pageSize: number;
    items: Array<T>;
}
