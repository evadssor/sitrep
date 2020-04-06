import { Update } from 'app/updates/update.model';

export interface Store {
    storeNumber?: string;
    issue: string;
    bmcTicket: string;
    serviceTicket: string;
    serverType: string;
    serverModel: string;
    commType: string;
    provider: string;
    updates: Update[];
}