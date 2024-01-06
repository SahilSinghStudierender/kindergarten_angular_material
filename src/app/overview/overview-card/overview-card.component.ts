import {Component, Input} from '@angular/core';
import {Kindergarden, Typ} from "../../shared/interfaces/Kindergarden";

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent {
  @Input() kindergarden: Kindergarden | undefined = undefined;

  getType() {
    return this.kindergarden?.typ === Typ.oeffentlich ? "Öffentlich" : "Privat";
  }
}
