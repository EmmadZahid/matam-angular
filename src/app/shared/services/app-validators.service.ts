import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppValidators {
    public static maxLengthAndTrimValidator(maxLength: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const val: string = control.value;
            if (val && val.toLocaleLowerCase().trim().length > maxLength) {
                return { "maxLength": true }
            }
            return null
        }
    }

    public static minLengthAndTrimValidator(minLength: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const val: string = control.value;
            if (val && val.toLocaleLowerCase().trim().length < minLength) {
                return { "minLength": true }
            }
            return null
        }
    }

    public static emptyFieldValidator() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let val: string = control.value;
            if (val && val.toLocaleLowerCase().trim() == '') {
                return { "emptyField": true }
            }
            return null
        }
    }
}