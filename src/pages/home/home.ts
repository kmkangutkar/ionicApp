import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    stringOne = '';
    stringTwo = '';
    
    get comparisonResult() {
        const a = this.stringOne.toLowerCase();
        const b = this.stringTwo.toLowerCase();

        let minLength = 0;

        if (a.length < b.length) {
            minLength = a.length;
        } else {
            minLength = b.length;
        }

        let sameChars = 0;

        for (let i = 0; i < minLength; i++) {
            if (a[i] == b[i]) {
                sameChars++;
            }
        }

        return sameChars;
    }
}
