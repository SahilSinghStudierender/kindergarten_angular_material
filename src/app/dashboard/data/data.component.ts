import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BackendService} from 'src/app/shared/backend.service';
import {CHILDREN_PER_PAGE} from 'src/app/shared/constants';
import {StoreService} from 'src/app/shared/store.service';
import {MatTableDataSource} from "@angular/material/table";
import {ChildResponse} from "../../shared/interfaces/Child";

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnChanges {

    constructor(public storeService: StoreService, private backendService: BackendService) {

    }

    @Input() currentPage!: number;
    @Output() selectPageEvent = new EventEmitter<number>();
    public page: number = 0;
    loadingChildren: boolean = true;
    dataSource = new MatTableDataSource<ChildResponse>([]);
    displayedColumns: string[] = ['name', 'kindergarden.name', 'kindergarden.address', 'age', 'birthDate', 'deletion'];

    ngOnInit(): void {
        this.backendService.getChildren(this.currentPage);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    getAge(birthDate: string) {
        var today = new Date();
        var birthDateTimestamp = new Date(birthDate);
        var age = today.getFullYear() - birthDateTimestamp.getFullYear();
        var m = today.getMonth() - birthDateTimestamp.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
            age--;
        }
        return age;
    }

    selectPage(i: any) {
        let currentPage = i;
        this.selectPageEvent.emit(currentPage)
        this.backendService.getChildren(currentPage);
    }

    public returnAllPages() {
        let res = [];
        const pageCount = Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
        for (let i = 0; i < pageCount; i++) {
            res.push(i + 1);
        }
        return res;
    }

    public cancelRegistration(childId: string) {
        this.backendService.deleteChildData(childId, this.currentPage);
    }
}


