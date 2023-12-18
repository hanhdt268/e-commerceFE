import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateManufacturerComponent} from "../update-manufacturer/update-manufacturer.component";
import Swal from "sweetalert2";
import {MatSort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ManufacturerService} from 'src/app/service/manufacturer.service';
import {AddManufacturerComponent} from '../add-manufacturer/add-manufacturer.component';
import {Manufacturer} from 'src/app/_model/manufacturer.model';
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-manufacturer',
  templateUrl: './view-manufacturer.component.html',
  styleUrls: ['./view-manufacturer.component.css'],

})
export class ViewManufacturerComponent implements OnInit, AfterViewInit {
  dataSource: any = []
  displayedColumns = ['checkbox', 'Id', 'ManufacturerName', 'Action']
  checkSelected = false;
  allComplete = false;
  form!: FormGroup;
  parentSelector = false;
  @ViewChild(MatSort) sort!: MatSort
  manuId: any = []
  protected readonly FormGroup = FormGroup;

  constructor(private _manufacturer: ManufacturerService, private _dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      manufacturers: new FormArray([])
    });
    this.addCheckboxes();
  }

  get ordersFormArray() {
    // @ts-ignore
    return this.form.controls.manufacturers as FormArray;
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.getAllManufacturer();
  }

  getAllManufacturer() {
    this._manufacturer.getAllManufacturer().subscribe({
      next: (data: Manufacturer[]) => {
        this.dataSource = new MatTableDataSource(data);
        for (const datum of data) {

        }
        this.dataSource.sort = this.sort;

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDialog() {
    const manufacturer = this._dialog.open(AddManufacturerComponent, {width: "40%", height: "300px"})
    manufacturer.afterClosed().subscribe(r => {
      this.getAllManufacturer();
    })
  }

  delete(manuId: any) {
    console.log(manuId)
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._manufacturer.deleteManufacturer(manuId).subscribe({
          next: (data: any) => {
            this.getAllManufacturer();
            Swal.fire('Successfully', 'Manufacturer deleted', 'success')
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting Manufacturer', 'error')
          }
        })
      }
    })

  }

  openDialogUpdate(mId: any) {
    console.log(mId)
    const update = this._dialog.open(UpdateManufacturerComponent, {
      data: {mId: mId},
      width: "40%",
      height: "300px"
    })
    update.afterClosed().subscribe(r => {
      this.getAllManufacturer();
    })
  }

  setAll(checked: boolean) {

  }

  onChangeManu(manuId: any, isChecked: any) {
    console.log(manuId, isChecked)
    this.dataSource = this.dataSource.map((d: any) => {
      if (d.manuId == manuId) {
        d.completed = isChecked
        return d
      }
      return d;
    })
  }

  selectAll(checked: boolean) {
    this.allComplete = checked;
    this.dataSource.forEach((t: any) => {
      t.completed = checked;
    })
  }

  updateAllComplete(manuId: any, event: any) {
    const input = event as HTMLInputElement;
    console.log(input.checked)
    if (input.checked) {
      this._manufacturer.updateSelected(manuId).subscribe(
        {
          next: (resp) => {
            console.log(resp);
            this.checkSelected = true

          }
        }
      )
    } else {
      this._manufacturer.updateSelect(manuId).subscribe(
        {
          next: (resp) => {
            console.log(resp);

          }
        }
      )
    }
  }

  deleteAll() {
    console.log(this.manuId)
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._manufacturer.deleteAllId(this.manuId).subscribe({
          next: (resp) => {
            console.log(
              resp
            )
            Swal.fire('Successfully', 'Manufacturer deleted', 'success')

            this.getAllManufacturer();
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting Manufacturer', 'error')
          }
        })

      }
    })


  }

  submit() {
    const selectedOrderIds = this.form.value.manufacturers
      .map((checked: any, i: any) => checked ? this.dataSource[i].manuId : null)
      .filter((v: any) => v !== null);
    console.log(selectedOrderIds);
  }

  updateChecked(manuId: any, checked: boolean, i: any) {
    console.log(manuId, checked)
    console.log(i)
    const index = this.manuId.indexOf(manuId)
    if (checked) {
      this.manuId.push(manuId)
      console.log(this.manuId)
      this.checkSelected = true;
    } else {
      this.manuId.splice(index, 1)
      console.log(this.manuId)
      if (this.manuId.length == 0) {
        this.checkSelected = false;
      }
    }

  }


  private addCheckboxes() {
    this.dataSource.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }
}
