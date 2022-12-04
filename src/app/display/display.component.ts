import {Component, OnInit} from '@angular/core';
import {DisplayService} from './display.service';
import {NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css',]
})

export class DisplayComponent implements OnInit {
  data: any[] = [];
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
      data$ = this.displayService.get(this.page, this.query)
    } else {
      console.log("Getting random images of page ", this.page)
      data$ = this.displayService.get(this.page);
    }

    data$.subscribe(data => {
      console.log("Appending images to data array object.")
      this.data = this.data.concat(this.extractImages(data));
      console.log(`Displaying a total of ${this.data.length} images`)
    })
  }

  /**
   * extract data from the response and filter them to only keep images (static and animated)
   * and exclude videos, albums and others
   * @param res
   * @private
   */
  private extractImages(res) {
    if (!res.data || res.data.length == 0) {
      return {}
    }

    // only keep animated images or static ones and exclude albums and videos
    return res.data.filter(img =>
      !img.is_album &&
      img.type.toLowerCase().startsWith("image/")
    );
  }

  onScroll() {
    this.page++
    this.search()
  }

  ngOnInit(): void {
    this.search();
  }
}
