import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    string_a = '';
    string_b = '';
    
    get comparison_result(){
        const a = this.string_a.toLowerCase();
        const b = this.string_b.toLowerCase();
        let min_length = 0;
        if(a.length < b.length){
            min_length = a.length;
        }else{
            min_length = b.length;
        }
        let same_chars = 0;
        for (let i = 0; i < min_length; i++){
            if(a[i] == b[i]){
                same_chars++;
            }
        }
        return same_chars;
    }
    

}
