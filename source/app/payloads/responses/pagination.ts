export type Pagination<T> = {
    count: number;
    currentPage: number;
    next: string | null;
    previous: string | null;
    results: T[];
}