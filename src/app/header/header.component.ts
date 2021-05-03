import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Output() featuredSelected = new EventEmitter<string>();

  isOpen = false;

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
  }

  // public onSelect(feature: string): void {
  //   this.featuredSelected.emit(feature);
  // }

  public dropdown() {
    this.isOpen = !this.isOpen;
  }

  public onSaveData() {
    this.dataStorage.storeRecipes();
  }

 }
