import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Update } from './update.model';
import { StoreService } from 'app/stores/store.service';
import { subscribeOn } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UpdateService {
    private updates: Update[] = [];
    private updatesUpdated = new Subject<Update[]>();

    constructor(private http: HttpClient,
        public storeService: StoreService) { }

    getUpdates() {
        this.http.get<{ message: string, updates: Update[] }>('http://localhost:3000/api/updates')
            .subscribe((updateData) => {
                this.updates = updateData.updates;
                this.updatesUpdated.next([...this.updates]);
            });
    }

    getUpdate(storeId: string): Update[] {
        let updates: Update[] = [];
        let message: String;
        this.http.get<{ message: string, updates: Update[] }>("http://localhost:3000/api/updates/" + storeId)
            .subscribe((updateData) => {
                message = updateData.message
                updateData.updates.map(update => {
                    updates.push(update)
                });
            });
        return updates;

    }

    getUpdateListener() {
        return this.updatesUpdated.asObservable();
    }

    addUpdate(update: Update) {
        this.http.post<{ message: string, updateId: string }>('http://localhost:3000/api/updates', update)
            .subscribe((responseData) => {
                const returnedId = responseData.updateId;
                update.updateId = returnedId;
                this.storeService.getStores();
            });
    }

    editUpdate(update: any) {
        const updateEdited = {
            updateId: update._id,
            storeId: update.storeId,
            storeNumber: update.storeNumber,
            date: update.date,
            time: update.time,
            message: update.message
        };
        this.http.put('http://localhost:3000/api/updates/edit/' + update._id, updateEdited)
            .subscribe((response) => {
                // console.log('Response: ', response);
            });
    }

    deleteUpdate(updateId: string) {
        this.http.delete('http://localhost:3000/api/updates/delete/' + updateId)
            .subscribe(() => {
                this.storeService.getStores();
            })
    }
}