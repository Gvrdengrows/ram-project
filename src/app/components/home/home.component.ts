import {Component, OnInit} from '@angular/core';
import {CharacterI, Info} from "../../models/character";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: CharacterI[] = []
  info: Info
  throttle = 700;
  distance = 1;
  page = 1;
  searchText = ''
  searching = false
  scrolling = false
  filtering = false

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.dataService.getAll(this.page).subscribe((characters: any) => {
      const {info, results} = characters
      this.characters = [...this.characters, ...results]
      this.info = info
      ++this.page
    })

  }

  onSearch(name: string) {
    this.dataService.search(this.page, name).subscribe((characters: any) => {
      const {info, results} = characters
      this.characters = [...this.characters, ...results]
      this.info = info
      ++this.page
    })
  }

  getFilter() {
    this.dataService.getFilter(this.page).subscribe((characters: any) => {
        const {info, results} = characters
        this.characters = [...this.characters, ...results]
        this.info = info
        ++this.page
      })
  }

  onScroll() {
    if (this.scrolling && !this.searching && !this.filtering) {
      this.getAll()
    }
    if (this.searching) {
      this.onSearch(this.searchText)
    }
    if (this.filtering) {
      this.getFilter()
    }
  }

  getDefault() {
    this.page=1
    this.characters = []
    this.onScroll()
  }
}
