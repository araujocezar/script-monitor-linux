export interface Process {
    type: number;
    id: number;
    comment?: string;
    name?: string;
    filter1: string;
    filter2: string;
    filter3: string;
    cpu: boolean;
    mem: boolean;
    virtmem: boolean;
    resmem: boolean;
}
