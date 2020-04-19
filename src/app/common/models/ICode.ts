export interface ICode {
    code: string;
    codeName1: string;
    remark1: string;
}

export class Code implements ICode {
    constructor(
        public code: string,
        public codeName1: string,
        public remark1: string
    ) { }
}
