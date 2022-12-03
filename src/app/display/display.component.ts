import {Component, OnInit} from '@angular/core';
import {DisplayService} from './display.service';
import {lastValueFrom} from "rxjs";
import {NgForm} from "@angular/forms";
import {query} from "@angular/animations";

@Component({
  moduleId: module.id,
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css',]
})

export class DisplayComponent implements OnInit {
  data: any[];
  errorMessage: string;
  query: string;
  page: number = 1;

  constructor(
    private displayService: DisplayService
  ) {
  }

  searchPhotos(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }

    this.page = 1;
    this.data = [];
    this.search();
  }

  search() {
    let data$;

    if (this.query && this.query !== "") {
      console.log(`Getting page ${this.page} of images matching query : "${this.query}" `)
      data$ = this.displayService.get(this.page, this.query);
    } else {
      console.log("Getting random images of page ", this.page)
      data$ = this.displayService.get(this.page);
    }

    lastValueFrom(data$)
      .then(this.extractImages)
      .then(
        data => this.data = data,
        error => this.errorMessage = error
      );
  }

  private extractImages(res) {
    if (!res.data || res.data.length == 0) {
      return {}
    }

    let images = res.data.filter(img =>
      !img.is_album &&
      img.type.toLowerCase().startsWith("image/")
    );
    console.log("size: ", images.length)
    return images
  }

  onScroll() {
    this.page++
    this.search()
  }

  ngOnInit(): void {
    this.search();
  }
}
