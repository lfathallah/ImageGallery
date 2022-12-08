import {Component} from '@angular/core';
import {ImageService} from '../services/image.service';
import {NgForm} from "@angular/forms";

const FILE_TYPE_FILTER = "image/";

@Component({
  moduleId: module.id,
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css',]
})

export class DisplayComponent {
  data: any[] = [];
  query: string;
  page: number = 1;

  constructor(private imageService: ImageService) {
    this.search();
  }

  searchPhotos(searchForm: NgForm) {
    if (searchForm.invalid) {
      console.log(`INVALID FORM ERROR.. `)
      return;
    }

    this.page = 1;
    this.data = [];
    this.search();
  }

  /**
   * Search images from the server either randomly or with a specific query depending on whether query global
   * variable is set or not
   * If query is set, the a random search is performed, otherwise a specific one matching the query's keywords
   */
  search() {
    let data$;

    console.log("Query: ",this.query)
    if (this.query && this.query !== "") {
      // search specific images
      console.log(`Getting page ${this.page} of images matching query : "${this.query}" `)
      data$ = this.imageService.get(this.page, this.query)
    } else {
      // get random images
      console.log("Getting random images of page ", this.page)
      data$ = this.imageService.get(this.page);
    }

    data$.subscribe(res => {
      console.log("Appending images to data array object..")

      // filter images (by format) and append the result to data variable
      // to keep in all searched images (for scrolling purpose)
      let searchData = this.extractImages(res);
      this.data = this.data.concat(searchData);

      console.log(`Found ${searchData.length} images.. Displaying a total of ${this.data.length} images`)
    })
  }

  /**
   * Filters the data array to keep only the images and the animated gifs
   * and exclude videos, albums and others
   * @param data : the array of images to filter
   * @private
   */
  private extractImages(data) {
    if (!data.data || data.data.length == 0) {
      return []
    }

    // only keep animated images or static ones and exclude albums and videos
    return data.data.filter(img =>
      img.type && img.type.toLowerCase().startsWith(FILE_TYPE_FILTER)
    );
  }

  /**
   * Performs search action with next page number on scroll event
   */
  onScroll() {
    this.page++
    this.search()
  }

  /**
   * Displays the HTML Element having elementID as ID on mouse over
   * @param elementId
   */
  onMouseOver(elementId: string) {
    (document.getElementById(elementId) as HTMLElement)
      .style.display="block"
  }

  /**
   * Hides the HTML Element having elementID as ID on mouse out
   * @param elementId
   */
  onMouseLeave(elementId: string) {
    (document.getElementById(elementId) as HTMLElement)
      .style.display="none"
  }
}
