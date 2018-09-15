import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Property } from '../../models/property';
import { PropertiesService } from './services/properties.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Message } from 'primeng/components/common/api';
import { Owner } from '../../models/owner';
import { BaseComponent } from '../../common/base.component';

@Component({
	templateUrl: './property-details.component.html'
})

export class PropertyDetailsComponent extends BaseComponent implements OnInit {
	constructor(
		private propertiesService: PropertiesService,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) { super(activatedRoute, location) };

	urlParam: number;
	pageTitle: string;
	ownerBtnTitle: string = 'Dane właściciela';
	addressBtnTitle: string = 'Lokalizacja';

	owner: Owner = new Owner();
	property: Property = new Property();

	isUpdatePage: boolean = false;
	isNewOwnerModeActivated: boolean = false;
	isNewAddressModeActivated: boolean = false;

	ownerAddedEvent(id: number): void {
		this.property.ownerId = id;
	}
	addressAddedEvent(id: number): void {
		this.property.addressId = id;
	}

	ngOnInit(): void {
		this.messages = new Array<Message>();
		this.detectUrlParam();
		if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
			this.pageTitle = "Nowa nieruchomość:";
			this.ownerBtnTitle = "Dodaj właściciela";
			this.addressBtnTitle = "Dodaj lokalizację";
		}
		else if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
			this.pageTitle = "Aktualizacja nieruchomości:";
			this.ownerBtnTitle = "Aktualizuj właściciela";
			this.addressBtnTitle = "Aktualizuj lokalizację";
			this.downloadProperty();
		}
		else {
			this.pageTitle = "Szczegóły nieruchomości:";
			this.downloadProperty();
			this.isInEditMode = false;
		}
	}

	activateNewAddressMode(): void {
		this.isNewAddressModeActivated == true ? this.isNewAddressModeActivated = false : this.isNewAddressModeActivated = true;
	}

	activateNewOwnerMode(): void {
		this.isNewOwnerModeActivated == true ? this.isNewOwnerModeActivated = false : this.isNewOwnerModeActivated = true;
	}

	detectUrlParam(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.urlParam = params['id'];
		});
	}

	downloadProperty(): void {
		this.propertiesService.getProperty(this.urlParam)
		.subscribe(
			propertyFromDb => this.property = propertyFromDb,
			errorMessage => this.showMessage(true, 'warn', 'Information', false, errorMessage)
		);
	}

	onSubmit(propObj: Property): void {
		if ((propObj.addressId == undefined || propObj.addressId < 0) || (propObj.ownerId == undefined || propObj.ownerId < 0)) {
			return this.showMessage(true, 'warn', 'Warning!', false, 'Before submitting property you need to create owner and address first!');
		}
		if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
			this.propertiesService.addProperty(propObj).subscribe(
				onSuccess => this.showMessage(false, 'success', 'Confirmation', true, 'Property has been created successfully!'),
				errorMessage => this.showMessage(false, 'warn', 'Information', false, errorMessage)
			);
		}
		else {
			this.propertiesService.updateProperty(propObj).subscribe(
				onSuccess => this.showMessage(false, 'success', 'Confirmation', true, 'Property has been updated successfully!'),
				errorMessage => this.showMessage(false, 'warn', 'Information', false, errorMessage)
			);
		}
	}
}