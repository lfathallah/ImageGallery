import {Component} from '@angular/core';
import {DisplayService} from './display.service';
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

  constructor(private displayService: DisplayService) {
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

  search() {
    let data$;

    console.log("Query: ",this.query)
    if (this.query && this.query !== "") {
      console.log(`Getting page ${this.page} of images matching query : "${this.query}" `)
      data$ = this.displayService.get(this.page, this.query)
    } else {
      console.log("Getting random images of page ", this.page)
      data$ = this.displayService.get(this.page);
    }

    data$.subscribe(res => {
      console.log("Appending images to data array object..")

      let searchData = this.extractImages(res);
      this.data = this.data.concat(searchData);

      console.log(`Found ${searchData.length} images.. Displaying a total of ${this.data.length} images`)

      // display the "No images found" message only when there are no images in this.data
      let messageElt = document.getElementsByClassName("message").item(0) as HTMLElement;
      if (this.data.length > 0) {
        messageElt.style.display="none"
      } else {
        messageElt.style.display="block"
      }
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
      return []
    }

    // only keep animated images or static ones and exclude albums and videos
    return res.data.filter(img =>
      img.type && img.type.toLowerCase().startsWith(FILE_TYPE_FILTER)
    );
  }

  onScroll() {
    this.page++
    this.search()
  }

  onMouseOver(elementId: string) {
    (document.getElementById(elementId) as HTMLElement)
      .style.display="block"
  }

  onMouseLeave(elementId: string) {
    (document.getElementById(elementId) as HTMLElement)
      .style.display="none"
  }
}
