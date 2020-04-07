import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from './store.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StoreService {
    private stores: Store[] = [];
    private storesUpdated = new Subject<Store[]>();

    constructor(private http: HttpClient) {}

    getStores() {
        this.http.get<{ message: string, stores: any }>('http://localhost:3000/api/stores')
        .pipe(map((storeData) => {
            console.log('StoreDate: ', storeData);
            return storeData.stores.map(store => {
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
                }
            })
        }))
        .subscribe((transformedStores) => {
            console.log('TransStores: ', transformedStores);
            this.stores = transformedStores;
            console.log('Store 2: ', this.stores);
            this.storesUpdated.next([...this.stores]);
        });
    }

    getStoreListener() {
        return this.storesUpdated.asObservable();
    }

    addStore(store: Store) {
        this.http.post<{message: string, storeId: string}>('http://localhost:3000/api/stores', store)
        .subscribe((responseData) => {
            const returnedId = responseData.storeId;
            store.storeId = returnedId;
            this.stores.push(store);
            this.storesUpdated.next([...this.stores]);
            console.log('Stores: ', this.stores);
        });
    }

    deleteStore(storeId: string) {
        this.http.delete('http://localhost:3000/api/stores/delete/' + storeId)
        .subscribe(() => {
            const updatedStores= this.stores.filter(store => store.storeId !== storeId);
            console.log('UpdatedStores', updatedStores);
                this.stores = updatedStores;
                this.storesUpdated.next([...this.stores]);
        })
    }
}