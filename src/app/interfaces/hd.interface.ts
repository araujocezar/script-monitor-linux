export interface Hd {
    type: number;
    id: number;
    blocks: boolean;
    comment?: boolean;
    free_kb: boolean;
    free_percent: boolean;
    name?: string;
    total: boolean;
    used_kb: boolean;
    used_percent: boolean;
}
