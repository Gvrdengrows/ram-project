import {Component, EventEmitter, Output} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() getFilter = new EventEmitter<string>()

  constructor(private dataService: DataService) {
  }

  submit(status?: string, species?: string, gender?: string) {
    this.dataService.status = status
    this.dataService.species = species
    this.dataService.gender = gender
    this.getFilter.emit()
  }
}
