import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Category} from "../../../_model/category.model";

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit, AfterViewInit {
  @ViewChildren("submenu_item") spans!: QueryList<ElementRef<HTMLElement>>
  categories: any = [];

  isShow: boolean = true;

  showArrow: boolean = true;
  demo: any;
  manufacturer: any

  constructor(private _category: CategoryService, private _snack: MatSnackBar,
              private _manufacturer: ManufacturerService) {
  }

  ngOnInit(): void {
    this.getCategory();
    const body = document.querySelector("body");
    const darkLight = document.querySelector("#darkLight");
    const sidebar = document.querySelector(".sidebar");
    const submenuItems = document.querySelectorAll(".submenu_item");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    const sidebarExpand = document.querySelector(".expand_sidebar");


    // @ts-ignore
    sidebarClose.addEventListener("click", () => {
      // @ts-ignore
      sidebar.classList.add("close", "hoverable");
    });
    // @ts-ignore
    sidebarExpand.addEventListener("click", () => {
      // @ts-ignore
      sidebar.classList.remove("close", "hoverable");
    });

    // @ts-ignore
    sidebar.addEventListener("mouseenter", () => {
      // @ts-ignore
      if (sidebar.classList.contains("hoverable")) {
        // @ts-ignore
        sidebar.classList.remove("close");
      }
    });
    // @ts-ignore
    sidebar.addEventListener("mouseleave", () => {
      // @ts-ignore
      if (sidebar.classList.contains("hoverable")) {
        // @ts-ignore
        sidebar.classList.add("close");
      }
    });

    // @ts-ignore

    // submenuItems.forEach((item, index) => {
    //   item.addEventListener("click", () => {
    //     item.classList.toggle("show_submenu");
    //     console.log(item, index)
    //     submenuItems.forEach((item2, index2) => {
    //       if (index !== index2) {
    //         item2.classList.remove("show_submenu");
    //       }
    //     });
    //   });
    // });
    if (window.innerWidth < 768) {
      // @ts-ignore
      sidebar.classList.add("close");
    } else {
      // @ts-ignore
      sidebar.classList.remove("close");
    }

  }

  getCategory() {
    this._category.categories().subscribe({
      next: (data: Category[]) => {
        this.categories = data
        console.log(this.categories)
      },
      error: (error) => {
        this._snack.open('Error loading database', '', {
          duration: 3000
        })
        console.log(error)
      }
    });
  }

  ngAfterViewInit(): void {
    this.spans.changes.subscribe({
      next: (resp: QueryList<ElementRef<HTMLElement>>) => {
        resp.forEach((item, index) => {
          // console.log(item)
          item.nativeElement.addEventListener("click", () => {
            item.nativeElement.classList.toggle("show_submenu")
            this.spans.forEach((item2, index2) => {
              if (index !== index2) {
                item2.nativeElement.classList.remove("show_submenu")
              }
            })
          })
        })
      }
    })
  }
}
