import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie.model';
import { NavbarService } from './../../navbar/services/navbar.service';
import { MovieService } from './../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id: number;
  movie: Movie;
  movieSub$: Subscription;

  constructor(
    private movieService: MovieService,
    private navbarService: NavbarService,
    private route: ActivatedRoute, //need the parameter
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id'); //+ converts a string to a number || getting the id parameter from the URL
    this.movieSub$ = this.movieService
      .movieFromHttp(this.id)
      .subscribe(movie => {
        this.movie = movie;
        this.navbarService.title.next(movie.name);
      });
  }

  ngOnDestroy(): void {
    this.movieSub$.unsubscribe(); // cleans up any subscriptions whenever we are no longer using the relevant component
    // isnt needed when the async pipe is used
  }
}
