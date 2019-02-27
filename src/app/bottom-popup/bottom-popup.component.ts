import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material";

@Component({
  selector: 'app-bottom-popup',
  templateUrl: './bottom-popup.component.html',
  styleUrls: ['./bottom-popup.component.css']
})
export class BottomPopupComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheet<>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  title: string;
  clearBar(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  changeStatus() {
    this.bottomSheetRef.dismiss({
      message: 'Change Status',
      data: this.data
    });
  }

  ngOnInit() {
    console.log('data received', this.data);
  }

}
