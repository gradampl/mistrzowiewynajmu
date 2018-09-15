import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner';

@Injectable()
export abstract class OwnersBackendService {
    abstract addOwner(newOwner: Owner): Observable<number>;
    abstract updateOwner(newOwner: Owner): Observable<number>;
    abstract getAll(): Observable<Array<Owner>>;
    abstract getOwner(id: number): Observable<Owner>;
}