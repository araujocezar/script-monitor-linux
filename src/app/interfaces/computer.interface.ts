export interface Computer {
    id: number;
    comment?: string;
    data: boolean;
    hour: boolean;
    ip?: string;
    memory_buffers: boolean;
    memory_cache: boolean;
    memory_free: boolean;
    memory_shared: boolean;
    memory_total: boolean;
    memory_used: boolean;
    monitoring_time_second: number;
    name?: string;
    password?: string;
    rsa: boolean;
    sampling_frequency_second: number;
    swap_free: boolean;
    swap_total: boolean;
    swap_used: boolean;
    user?: string;
    zombie_process_total: boolean;
}
