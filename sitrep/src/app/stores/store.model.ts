import { Update } from 'app/updates/update.model';

export interface Store {
    storeId?: string;
    storeNumber?: string;
    issue: string;
    bmcTicket: string;
    serviceTicket: string;
    serverType: string;
    serverModel: string;
    commType: string;
    provider: string;
    hardware: string;
    updates?: Update[];
    startDate: string;
    startTime: string;
    downTime: string;
    endDate?: string;
    endTime?: string;
    resolved?: boolean;
    show?: boolean;
}