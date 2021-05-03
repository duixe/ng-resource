import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>(); or can also be done like this 👇
  // @Output() ingredientAdded = new EventEmitter<Ingredients>();
  @ViewChild('f', {static: false}) slForm: NgForm;
  public subscription: Subscription;
  public editMode = false;
  public editedItemIndex: number;
  public editedItem: Ingredients;
  public amountPattern = "^[1-9]+[0-9]*$";

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } 
      );
  }

  public onAddItem(form: NgForm) {
    const value = form.value;
    // const ingredientName = this.nameInputRef.nativeElement.value;
    // const ingredientamount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredients(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else {
      this.slService.addIngredients(newIngredient);
    }

    this.editMode = false;
    form.reset();

  }

  public onClear(): void {
    this.slForm.reset();
    this.editMode = false;
  }

  public onDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
