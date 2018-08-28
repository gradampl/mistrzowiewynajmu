import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property';
import { PropertiesService } from '../services/properties.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './property-details.component.html'
})

export class PropertyDetailsComponent implements OnInit {
    constructor(
        private propertiesService: PropertiesService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) { };

    pageTitle: string = "";
    urlParam: number = 0;
    isInEditMode: boolean = true;
    property: Property = new Property();

    ngOnInit(): void {
        this.detectUrlParam();
        if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            this.pageTitle = "Nowa nieruchomość";
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-update" + this.urlParam)) {
            this.pageTitle = "Aktualizacja nieruchomości";
            this.downloadProperty();
        }
        else {
            this.pageTitle = "Szczegóły nieruchomości";
            this.isInEditMode = false;
            this.downloadProperty();
        }
    }

    downloadProperty(): void {
        this.propertiesService.getProperty(this.urlParam).subscribe(
            propertyFromDb => this.property = propertyFromDb,
            errorObj => console.log(errorObj)
        );
    }

    onSubmit(propObj: Property): void {
        if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            propObj.addressId = 1;
            propObj.ownerId = 1;
            this.propertiesService.addProperty(propObj).subscribe(
                onSuccess => console.log(onSuccess),
                onError => console.log(onError)
            )
        }
        else {
            this.propertiesService.updateProperty(propObj).subscribe(
                onSuccess => console.log(onSuccess),
                onError => console.log(onError)
            )
        }
    }

    detectUrlParam(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        });
    }

    goBack(): void {
        this.location.back();
    }
}