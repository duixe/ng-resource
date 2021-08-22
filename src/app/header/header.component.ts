import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // @Output() featuredSelected = new EventEmitter<string>();

  isOpen = false;
  isAuthenticated = false;
  userSub: Subscription;
  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      // 👆 this is thesame as this 👇
      this.isAuthenticated = !!user;
    });
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

  public onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
 }
