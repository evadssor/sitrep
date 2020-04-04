import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from './store.model';

@Injectable({providedIn: 'root'})
export class StoreService {
    private stores: Store[] = [];
    private storesUpdated = new Subject<Store[]>();

    constructor(private http: HttpClient) {}

    getStores() {
        this.http.get<{message: string, stores: Store[]}>('http://localhost:3000/api/stores')
        .subscribe((storeData) => {
            this.stores = storeData.stores;
            this.storesUpdated.next([...this.stores]);
        });
    }

    getStoreListener() {
        return this.storesUpdated.asObservable();
    }

    addStore(store: Store) {
        this.http.post<{message: string}>('http://localhost:3000/api/stores', store)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.stores.push(store);
            this.storesUpdated.next([...this.stores]);
        });
    }
}