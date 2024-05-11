import { Component, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'CanvasJS Angular Charts';
  @ViewChildren('menuLinks') links!: QueryList<ElementRef>;

  activeChange(e: any) {
    this.links.forEach( (link: any) => {
      if(!link.nativeElement.classList.contains("show")) {
        link.nativeElement.parentElement.childNodes[0].classList.add("collapsed");
      } else {
        if(link.nativeElement.parentElement.childNodes[0].classList.contains("collapsed"))
          link.nativeElement.parentElement.childNodes[0].classList.remove("collapsed");
      }
    })
  }

  ngAfterViewInit() {
   this.activeChange({});
  }
}