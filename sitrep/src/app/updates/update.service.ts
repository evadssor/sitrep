import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Update } from './update.model';
import { StoreService } from 'app/stores/store.service';

@Injectable({providedIn: 'root'})
export class UpdateService {
    private updates: Update[] = [];
    private updatesUpdated = new Subject<Update[]>();

    constructor(private http: HttpClient,
        public storeService: StoreService) {}

    getUpdates() {
        this.http.get<{message: string, updates: Update[]}>('http://localhost:3000/api/updates')
        .subscribe((updateData) => {
            this.updates = updateData.updates;
            this.updatesUpdated.next([...this.updates]);
        });
    }

    getUpdateListener() {
        return this.updatesUpdated.asObservable();
    }

    addUpdate(update: Update) {
        this.http.post<{message: string, updateId: string}>('http://localhost:3000/api/updates', update)
        .subscribe((responseData) => {
            const returnedId = responseData.updateId;
            update.updateId = returnedId;
            this.storeService.getStores();
        });
    }

    editUpdate(update: Update) {
        this.http.post('http://localhost:3000/api/updates/edit/', update)
        .subscribe(() => {

        });
    }

    deleteUpdate(updateId: string) {
        this.http.delete('http://localhost:3000/api/updates/delete/' + updateId)
            .subscribe(() => {
                this.storeService.getStores();
            })
    }
}