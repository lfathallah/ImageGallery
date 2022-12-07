import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DisplayComponent} from "./display.component";
import {ImageService} from "../services/image.service";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  let hostElement: any;

  let service: jasmine.SpyObj<ImageService>;

  let componentData: any[];
  let serviceResultData: {data: any[]} = {
    data: [
      { id: 1, title: 'title-1', link: 'https://link-1.com', type: 'image/jpg' },
      { id: 2, title: 'title-2', link: 'https://link-2.com', type: 'image/png' },
      { id: 3, title: 'title-3', link: 'https://link-3.com', is_album: true },
      { id: 4, title: 'title-4', link: 'https://link-4.com', is_album: true },
    ]
  }
  let expectedImages: {data: any[]} = {
    data: [
      { id: 1, title: 'title-1', link: 'https://link-1.com', type: 'image/jpg' },
      { id: 2, title: 'title-2', link: 'https://link-2.com', type: 'image/png' },
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DisplayComponent],
      providers: [{
        provide: ImageService,
        useValue: jasmine.createSpyObj('ImageService', ['get'])
      }],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();
    service = TestBed.get(ImageService);
    service.get.and.returnValue(of(serviceResultData));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;

    fixture.detectChanges();


    componentData = component.data;
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random images on page load', () => {
    expect(componentData).toEqual(expectedImages.data);
    expect(service.get).toHaveBeenCalledTimes(1);
  });

  it('should get images when search is performed', () => {
    const searchSubmit: HTMLButtonElement = hostElement.querySelector('button')!;

    // serviceResultData.data will be filtered within component.search method. Assertion about its new size is done below
    expect(serviceResultData.data).toHaveSize(4);

    searchSubmit.click();

    expect(componentData).toHaveSize(2);
    expect(componentData).toEqual(expectedImages.data);

    // called one at page load and one on button click
    expect(service.get).toHaveBeenCalledTimes(2);
  });

  it('should hide the message "No images found" when search action returns data', () => {
    const searchSubmit: HTMLButtonElement = hostElement.querySelector('button')!;
    searchSubmit.click();
    const searchInfoElt = fixture.debugElement.query(By.css('.addItem'));

    // called one at page load and one on button click
    expect(service.get).toHaveBeenCalledTimes(2);
    expect(searchInfoElt).toBeNull();
  });
});
