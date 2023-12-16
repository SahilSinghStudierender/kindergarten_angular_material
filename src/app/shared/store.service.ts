import {Injectable} from '@angular/core';
import {Kindergarden} from './interfaces/Kindergarden';
import {ChildResponse} from './interfaces/Child';
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    constructor() {
    }

    public kindergardens: Kindergarden[] = [];
    public children: ChildResponse[] = [];
    public childrenDataSource = new MatTableDataSource<ChildResponse>([]);
    public loadingChildren: boolean = true;
    public childrenTotalCount: number = 0;
}
