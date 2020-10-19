export interface Network {
    type: number;
    id: number;
    comment?: string;
    download_kb: boolean;
    download_packet: boolean;
    name?: string;
    upload_kb: boolean;
    upload_packet: boolean;
}
