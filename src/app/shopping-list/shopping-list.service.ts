import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from './../shared/ingredient.model';

export class ShoppingListService{
    // public ingredientsChanged = new EventEmitter<Ingredients[]>();
    public ingredientsChanged = new Subject<Ingredients[]>();
    public startedEditing = new Subject<number>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 12),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredients(ingredients: Ingredients) {
        this.ingredients.push(ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientForRecipe(ingredients: Ingredients[]) {
        // for (const ingredient of ingredients) {
        //     this.addIngredients(ingredient);
        // }

        this.ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public updateIngredient(index: number, newIngredient: Ingredients) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}

