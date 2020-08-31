export interface Process {
    id: number;
    comment?: string;
    cpu_core: boolean;
    cpu_total_percente: boolean;
    elapsed_time: boolean;
    filter?: string;
    guest_percent: boolean;
    max_faults_sec: boolean;
    min_faults_sec: boolean;
    name?: string;
    physical_memory_percent: boolean;
    resident_memory_kb: boolean;
    system_percent: boolean;
    usr_percent: boolean;
    virtual_memory_kb: boolean;
}
