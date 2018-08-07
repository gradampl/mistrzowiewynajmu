import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    napis: string = "Poczebny jest tu taki napis.";
    czyTak: boolean = true;
    rok: number = 2018;
}
