import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Update } from './update.model';

@Injectable({providedIn: 'root'})
export class UpdateService {
    private updates: Update[] = [];
    private updatesUpdated = new Subject<Update[]>();

    constructor(private http: HttpClient) {}

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
        this.http.post<{message: string}>('http://localhost:3000/api/updates', update)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.updates.push(update);
            this.updatesUpdated.next([...this.updates]);
        });
    }
}