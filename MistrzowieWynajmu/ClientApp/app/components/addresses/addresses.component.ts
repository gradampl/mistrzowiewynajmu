import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../common/base.component';
import { Address } from '../../models/address';
import { AddressesService } from './services/addresses.service';


@Component({
    templateUrl: './addresses.component.html',
})

export class AddressesComponent extends BaseComponent implements OnInit {
    constructor(
        private addressesService: AddressesService,
		private activatedRoute: ActivatedRoute,
		private location: Location,
		private router: Router,
    ) { super(activatedRoute, location) };

    addresses: Array<Address> = new Array<Address>();
    pageTitle: string = "Lista lokalizacji";

    ngOnInit(): void {
        this.downloadAddresses();
    }

    downloadAddresses(): void {
        this.addressesService.getAll().subscribe(
            addresses => this.addresses = addresses,
            errorMessage => this.showMessage(true, 'warn', 'Information', false, errorMessage)
        );
    }

    getAddress(id: number): void {
        this.router.navigate(['./addresses/address-details', id]);
    }

    updateAddress(id: number): void {
        this.router.navigate(['./addresses/address-update', id]);
    }
}
