import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { HeroService }              from './hero.service';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';


@Component({
  selector: 'hero-detail',
  styleUrls: ['./hero-detail.component.css'],
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location){ }

  ngOnInit(): void {
    //  use the paramMap Observable to extract the id parameter value from the 
    //  ActivatedRoute service and use the HeroService to fetch the hero with that id
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}