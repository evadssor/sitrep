import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from './store.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StoreService {
    private stores: Store[] = [];
    private storesUpdated = new Subject<Store[]>();

    constructor(private http: HttpClient) { }

    getStores() {
        this.http.get<{ message: string, stores: any, updates: any }>('http://localhost:3000/api/stores')
            .pipe(map((storeData) => {
                return storeData.stores.map(store => {
                    var updates = storeData.updates.filter(update => update.storeId === store._id);
                    return {
                        storeId: store._id,
                        storeNumber: store.storeNumber,
                        issue: store.issue,
                        bmcTicket: store.bmcTicket,
                        serviceTicket: store.serviceTicket,
                        serverType: store.serverType,
                        serverModel: store.serverModel,
                        commType: store.commType,
                        provider: store.provider,
                        hardware: store.hardware,
                        startDate: store.startDate,
                        startTime: store.startTime,
                        downTime: store.downTime,
                        updates: updates
                    }
                });
            }))
            .subscribe((transformedStores) => {
                this.stores = transformedStores;
                this.storesUpdated.next([...this.stores]);
            });
    }

    getStoreListener() {
        return this.storesUpdated.asObservable();
    }

    addStore(store: Store) {
        this.http.post<{ message: string, storeId: string }>('http://localhost:3000/api/stores', store)
            .subscribe((responseData) => {
                const returnedId = responseData.storeId;
                store.storeId = returnedId;
                store.updates[0].storeId = returnedId;
                this.stores.push(store);
                this.storesUpdated.next([...this.stores]);
            });
    }

    editStore(store: Store) {
        const editedStore = {
            storeId: store.storeId,
            storeNumber: store.storeNumber,
            issue: store.issue,
            bmcTicket: store.bmcTicket,
            serviceTicket: store.serviceTicket,
            serverType: store.serverType,
            serverModel: store.serverModel,
            commType: store.commType,
            provider: store.provider,
            hardware: store.hardware,
            startDate: store.startDate,
            startTime: store.startTime,
            downTime: store.downTime
        }
        this.http.put('http://localhost:3000/api/stores/edit/' + store.storeId, editedStore)
            .subscribe((response) => {
                console.log('Reponse from Edit Store: ', response);
            });
    }

    deleteStore(storeId: string) {
        this.http.delete('http://localhost:3000/api/stores/delete/' + storeId)
            .subscribe(() => {
                const updatedStores = this.stores.filter(store => store.storeId !== storeId);
                this.stores = updatedStores;
                this.storesUpdated.next([...this.stores]);
            });
    }
}