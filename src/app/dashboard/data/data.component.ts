import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BackendService} from 'src/app/shared/backend.service';
import {CHILDREN_PER_PAGE} from 'src/app/shared/constants';
import {StoreService} from 'src/app/shared/store.service';
import {MatTableDataSource} from "@angular/material/table";
import {ChildResponse} from "../../shared/interfaces/Child";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {
    constructor(public storeService: StoreService, private backendService: BackendService) {

    }
    @ViewChild(MatSort) sort!: MatSort;
    @Input() currentPage!: number;
    @Output() selectPageEvent = new EventEmitter<number>();
    public page: number = 0;
    loadingChildren: boolean = true;
    displayedColumns: string[] = ['name', 'kindergarden.name', 'kindergarden.address', 'age', 'birthDate', 'registrationDate', 'deletion'];
    currentFilter: number | undefined = undefined;
    currentSort: Sort | undefined = undefined;

    ngOnInit(): void {
        this.backendService.getChildren(this.currentPage);
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe((sortState: Sort) => {
            this.currentSort = sortState.direction ? sortState : undefined;
            this.backendService.getChildren(this.currentPage, this.currentFilter, this.currentSort);
        })
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
        let currentPage = i.pageIndex;
        this.selectPageEvent.emit(currentPage)
        this.backendService.getChildren(currentPage + 1, this.currentFilter, this.currentSort);
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
        this.backendService.deleteChildData(childId, this.currentPage + 1);
    }

    public filterChanged(value: number | null) {
        this.currentFilter = value || undefined;
        this.backendService.getChildren(this.currentPage, value || undefined, this.currentSort);
    }
    public CHILDREN_PER_PAGE = CHILDREN_PER_PAGE;
}


