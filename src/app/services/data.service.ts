import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharacterI} from "../models/character";
import {EpisodeI} from "../models/episode";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  url: string = 'https://rickandmortyapi.com/api/character/'
  episode: string = 'https://rickandmortyapi.com/api/episode/'
  status?: string | undefined = ''
  species?: string | undefined = ''
  gender?: string | undefined = ''


  getAll(page: number): Observable<CharacterI[]> {
    // return this.http.get<CharacterI[]>(this.url + '?page=' + page)
    return this.http.get<CharacterI[]>(this.url, {
      params: new HttpParams().set("page", page)
    })
  }

  getOne(id: number): Observable<CharacterI> {
    return this.http.get<CharacterI>(this.url + id)
  }

  search(page: number, name: string): Observable<CharacterI> {
    return this.http.get<CharacterI>(this.url, {
      params: new HttpParams()
        .set("page", page)
        .append('name', name)
    })

  }

  getFilter(page: number): Observable<CharacterI> {
    return this.http.get<CharacterI>(this.url, {
      params: new HttpParams()
        .set('page', page)
        .append('status', this.status!)
        .append('species', this.species!)
        .append('gender', this.gender!)
    })
  }

  getEpisode(episode: string[]): Observable<EpisodeI[]> {
    episode.join(', ')
    return this.http.get<EpisodeI[]>(this.episode + episode)
  }
}
