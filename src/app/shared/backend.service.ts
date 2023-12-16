import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Kindergarden} from './interfaces/Kindergarden';
import {StoreService} from './store.service';
import {Child, ChildResponse} from './interfaces/Child';
import {CHILDREN_PER_PAGE} from './constants';
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient, private storeService: StoreService) {
    }

    public getKindergardens() {
        this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
            this.storeService.kindergardens = data;
        });
    }

    public getChildren(page: number) {
        this.storeService.loadingChildren = true;
        this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}`, {observe: 'response'}).subscribe(data => {
            this.storeService.children = data.body!;
            this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
            this.storeService.loadingChildren = false;
        });
    }

    public addChildData(child: Child, page: number) {
        this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
            this.storeService.saveChildSuccess = true;
            this.getChildren(page);

            setTimeout(() => {
                this.storeService.saveChildSuccess = false;
            }, 3000)
        })
    }

    public deleteChildData(childId: string, page: number) {
        this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_ => {
            this.getChildren(page);
        })
    }
}
