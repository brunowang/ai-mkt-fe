export interface IApiResponse<T> {
    code: number;
    mesg: string;
    data: T | undefined;
    get isSucceeded(): boolean;
}

// 实现 IApiResponse 接口
export class ApiResponse<T> implements IApiResponse<T> {
    constructor(public code: number, public mesg: string, public data: T) {}

    /// code == 0 表示请求成功
    get isSucceeded(): boolean {
        return this.code === 0;
    }
}

export class ApiResponseError<T> extends Error {
    public readonly response: IApiResponse<T>;

    public constructor(message: string, response: IApiResponse<T>) {
        super(message);
        this.response = response;
    }
}

/** Api 列表数据体 */
export class ApiListData<T> {
    public count: number;
    public list: T[];

    constructor(count: number, list: T[]) {
        this.count = count;
        this.list = list;
    }
}

/** Api 分页列表数据体 */
export class ApiPageListData<T> {
    public page: number;
    public page_size: number;
    public total: number;
    public count: number;
    public list: T[];

    constructor(page: number, page_size: number, count: number, total: number, list: T[]) {
        this.page = page;
        this.page_size = page_size;
        this.count = count;
        this.total = total;
        this.list = list;
    }
}
