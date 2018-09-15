import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../../../models/address';
import { AddressesBackendService } from '../../../services/addresses-backend.service';

@Injectable()
export class AddressesService {
	constructor(private ownersBackendService: AddressesBackendService) { }

	addAddress(newAddress: Address): Observable<number> {
		return this.ownersBackendService.addAddress(newAddress);
	}
	updateAddress(newAddress: Address): Observable<number> {
		return this.ownersBackendService.updateAddress(newAddress);
	}
	getAll(): Observable<Array<Address>> {
		return this.ownersBackendService.getAll();
	}
	getAddress(id: number): Observable<Address> {
		return this.ownersBackendService.getAddress(id);
	}
}