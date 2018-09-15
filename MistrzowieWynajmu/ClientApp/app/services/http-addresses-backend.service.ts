import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AddressesBackendService } from './addresses-backend.service';
import { Address } from '../models/address';

@Injectable()
export class HttpAddressesBackendService extends AddressesBackendService {
    
    private addAddressUrl: string = "api/addresses/addaddress";
    private getAllUrl: string = "api/addresses/getaddresses";
    private updateAddressUrl: string = "api/addresses/updateaddress";
    private getAddressUrl: string = "api/addresses/getaddress?addressId=";

    private jsonContentOptions: RequestOptions;
    constructor(private http: Http) {
        super();
        let headersJson: Headers = new Headers({
            'Content-Type': 'application/json',
        });
        this.jsonContentOptions = new RequestOptions({ headers: headersJson });
    }
    addAddress(newAddress: Address): Observable<number> {
        return this.http.post(this.addAddressUrl, JSON.stringify(newAddress), this.jsonContentOptions).
            map(response => response.json() as number);
    }
    updateAddress(newAddress: Address): Observable<number> {
        return this.http.post(this.updateAddressUrl, JSON.stringify(newAddress), this.jsonContentOptions).
            map(response => response.json() as number);
    }
    getAll(): Observable<Address[]> {
        return this.http.get(this.getAllUrl, this.jsonContentOptions).
            map(response => response.json() as Array<Address>);
    }
    getAddress(id: number): Observable<Address> {
        return this.http.get(this.getAddressUrl + id, this.jsonContentOptions).
            map(response => response.json() as Address);
    }
}