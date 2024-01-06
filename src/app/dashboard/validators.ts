import {AbstractControl, ValidatorFn} from "@angular/forms";
import * as moment from "moment/moment";

export function ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (!control.value) {
            return null;
        }

        const birthdate = moment(control.value);
        const today = moment();
        const age = today.diff(birthdate, 'years');

        // Check if the age is less than the minimum age
        if (age < minAge) {
            // Return an object if the validation fails
            return { 'ageError': {value: control.value} };
        }

        // Return null if there's no error
        return null;
    };
}
