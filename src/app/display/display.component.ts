import { Component, OnInit} from '@angular/core';
import { DisplayService } from './display.service';
import {lastValueFrom} from "rxjs";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
    moduleId:module.id,
    selector: 'display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css',]
})

export class DisplayComponent implements OnInit {
    data: any[];
    errorMessage: string;
    query: string;

    constructor(
        private displayService: DisplayService
    ){}

    search(query: string) {
      const data$ = this.displayService.getdata(query);

      lastValueFrom(data$)
        .then(this.extractImages)
        .then(
          data => this.data = data,
          error =>this.errorMessage = error
        );
    }
  private extractImages(res) {
      if (!res.data || res.data.length == 0) {
        return {}
      }

      return res.data.filter(img =>
        !img.is_album &&
        img.type.toLowerCase().startsWith("image/") &&
        !img.animated
      )
  }
    ngOnInit(): void {
        this.search("hyperloop");
    }
}
