/* tslint:disable:no-unused-variable */
import { ImageService } from "./image.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";


describe("ImageService", () => {
  let service: ImageService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ImageService(httpClientSpy);
  });

  it('should return expected images when calling random images API', (done: DoneFn) => {
    const expectedImages: any[] =
      [
        { id: 1, title: 'title-1', link: 'https://link-1.com' },
        { id: 2, title: 'title-2', link: 'https://link-2.com' },
      ];

    httpClientSpy.get.and.returnValue(of(expectedImages));

    service.get(1).subscribe({
      next: images => {
        expect(images)
          .withContext('expected images')
          .toEqual(expectedImages);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return expected images when calling the search images API', (done: DoneFn) => {
    const expectedImages: any[] =
      [
        { id: 1, title: 'cats-1', link: 'https://link-1.com' },
        { id: 2, title: 'cats-2', link: 'https://link-2.com' },
      ];

    httpClientSpy.get.and.returnValue(of(expectedImages));

    service.get(1, 'cats').subscribe({
      next: images => {
        expect(images)
          .withContext('expected images')
          .toEqual(expectedImages);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
