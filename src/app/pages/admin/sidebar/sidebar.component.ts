import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
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

}
