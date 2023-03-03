import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {CharacterI} from "../../models/character";
import {EpisodeI} from "../../models/episode";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit{
  id: number
  data: CharacterI
  episodeString: string[] = []
  episodes: EpisodeI[] = []
  loading: boolean
  constructor(public dataService: DataService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getEpisode()
    this.loading = false
  }

 getEpisode() {
    this.dataService.getOne(this.id).subscribe(character => {
      this.data = character
      for (let i = 0; i < character.episode.length; i++) {
        let a = character.episode[i].split('/')
        let [, , , , , b] = a
        this.episodeString.push(b)
      }
      this.showEpisode()
    })
  }

  showEpisode() {
    if (this.episodeString.length == 1) {
      this.dataService.getEpisode(this.episodeString).subscribe((episode: any) => {
        this.episodes = [episode]
        console.log(this.episodes)
      })
    } else {
      this.dataService.getEpisode(this.episodeString).subscribe((episode: any) => {
        this.episodes = episode
        console.log(this.episodes)
      })
    }

  }
}
