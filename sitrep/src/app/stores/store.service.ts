import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from './store.model';
import { map } from 'rxjs/operators';
import { Update } from 'app/updates/update.model';

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
                        downTime: this.downTime(store.startDate, store.startTime),
                        endDate: store.endDate,
                        endTime: store.endTime,
                        resolved: store.resolved,
                        show: store.show,
                        updates: this.sortUpdates(updates)
                    }
                });
            }))
            .subscribe((transformedStores) => {
                transformedStores.sort((a, b) => parseFloat(a.downTime) - parseFloat(b.downTime));
                transformedStores.reverse();
                this.stores = transformedStores;
                console.log('Stores:', this.stores);
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
            downTime: store.downTime,
            endDate: store.endDate,
            endTime: store.endTime,
            resolved: store.resolved,
            show: store.show
        }
        this.http.put('http://localhost:3000/api/stores/edit/' + store.storeId, editedStore)
            .subscribe((response) => {
                console.log('Reponse from Edit Store: ', response);
                this.getStores();
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

    sortUpdates(updates: Update[]) {
        const sortedUpdates = updates.sort((a, b) => this.downTime(a.date, a.time) - this.downTime(b.date, b.time));
        sortedUpdates.reverse();
        return sortedUpdates;
    }

    downTime(d, t) {//take in date and time from inputs
        if(d !== null && d !== undefined && t !== null && t !== undefined ) {
            var date_time = (d.toString() + " " + t.toString());//Combine incoming date and time strings
            var start_milli = Date.parse(date_time); //parse date_time string to milliseconds
            var current_milli = new Date().getTime(); //get current time in milliseconds
        
            var down_hours = (current_milli - start_milli) / 1000 / 60 / 60;//divide milliseconds into hours 
            var setHours = Math.floor(down_hours);//Cut off decimal after hour
        
            var down_minutes = (down_hours - setHours) * 60;//Calculate Minutes
            var setMinutes = Math.floor(down_minutes);//Cut off decimal after minute
            var m = setMinutes > 9 ? setMinutes : '0' + setMinutes;//Add a leading 0 if minutes are less than 10
        
            return (setHours + setMinutes);
        }
        return 0;
      }
}