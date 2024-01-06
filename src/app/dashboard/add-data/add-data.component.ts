import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BackendService} from 'src/app/shared/backend.service';
import {StoreService} from 'src/app/shared/store.service';
import * as moment from "moment";
import {ageValidator} from "../validators";

@Component({
    selector: 'app-add-data',
    templateUrl: './add-data.component.html',
    styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

    constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
    }

    public addChildForm: any;
    @Input() currentPage!: number;

    ngOnInit(): void {
        this.addChildForm = this.formbuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            kindergardenId: ['', Validators.required],
            birthDate: [null, [Validators.required, ageValidator(3)]]
        })
    }

    onSubmit() {
        console.log(this.addChildForm)
        if (this.addChildForm.valid) {
            // Format Date from Datepicker to a readable String in "YYYY-MM-DD"
            const updated = {
                ...this.addChildForm.value,
                birthDate: moment(this.addChildForm.value.birthDate).format('YYYY-MM-DD')
            }
            this.backendService.addChildData(updated, this.currentPage).subscribe({
                next: () => {
                    this.addChildForm.reset({
                        name: '',
                        kindergardenId: '',
                        birthDate: null
                    });

                    Object.keys(this.addChildForm.controls).forEach(key => {
                        this.addChildForm.get(key).setErrors(null);
                    });
                }
            });
        }
    }
}
