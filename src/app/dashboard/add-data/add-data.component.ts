import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BackendService} from 'src/app/shared/backend.service';
import {StoreService} from 'src/app/shared/store.service';
import * as moment from "moment";

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
            name: ['', [Validators.required]],
            kindergardenId: ['', Validators.required],
            birthDate: [null, Validators.required]
        })
    }

    onSubmit() {
        console.log(this.addChildForm.get('name').invalid);
        if (this.addChildForm.valid) {
            console.log(this.currentPage);
            // Format Date from Datepicker to a readable String in "YYYY-MM-DD"
            const updated = {
                ...this.addChildForm.value,
                birthDate: moment(this.addChildForm.value.birthDate).format('YYYY-MM-DD')
            }
            this.backendService.addChildData(updated, this.currentPage);
        }
    }
}
