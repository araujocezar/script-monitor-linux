export interface Cpu {
    type: number;
    id: number;
    comment?: string;
    core: string;
    gnice: boolean;
    guest: boolean;
    idle: boolean;
    iowait: boolean;
    irq: boolean;
    name?: string;
    nice: boolean;
    soft: boolean;
    steal: boolean;
    sys: boolean;
    user: boolean;
}
