import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Owner } from '../../../models/owner';
import { OwnersBackendService } from '../../../services/owners-backend.service';

@Injectable()
export class OwnersService {
    constructor(private ownersBackendService: OwnersBackendService) { }

    addOwner(newOwner: Owner): Observable<number> {
        return this.ownersBackendService.addOwner(newOwner);
    }

    updateOwner(newOwner: Owner): Observable<number> {
        return this.ownersBackendService.updateOwner(newOwner);
    }

    getAll(): Observable<Array<Owner>> {
        return this.ownersBackendService.getAll();
    }

    getOwner(id: number): Observable<Owner> {
        return this.ownersBackendService.getOwner(id);
    }
}