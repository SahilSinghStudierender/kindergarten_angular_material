import {Component, OnInit} from '@angular/core';
import {BackendService} from "../shared/backend.service";
import {StoreService} from "../shared/store.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{

  constructor(private backendService: BackendService, public storeService: StoreService) {
  }

  ngOnInit(): void {
    this.backendService.getKindergardens();
  }


}
