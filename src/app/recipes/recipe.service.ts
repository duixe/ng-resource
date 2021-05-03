import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    public recipeChanged = new Subject<Recipe[]>();
    public recipeSelected = new EventEmitter<Recipe>();
    private imgLocation = 'https://www.wholesomeyum.com/wp-content/uploads/2019/09/wholesomeyum-keto-chaffles-recipe-sweet-savory-5-ways-24.jpg';
    private imgLocationTwo = 'https://329851.smushcdn.com/1342261/wp-content/uploads/EMP180-BrusselSproutsjpeg.jpeg?lossy=0&strip=1&webp=1';
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A test Recipe', 
    //         'this is simply a test recipe', 
    //         this.imgLocation,
    //         [
    //             new Ingredients('meat', 1),
    //             new Ingredients('Beef', 13)
    //         ]
    //     ),
    //     new Recipe(
    //         'Another test Recipe', 
    //         'this is simply another test recipe', 
    //         this.imgLocationTwo,
    //         [
    //             new Ingredients('Mushroom', 34),
    //             new Ingredients('carrot', 33)
    //         ]
    //     ),
    // ];
    private recipes: Recipe[] = []; 

    constructor(private slService: ShoppingListService) {}

    public setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice()); 
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public addIngredientsToShoppingLIst(ingredients: Ingredients[]) {
        this.slService.addIngredientForRecipe(ingredients);
    }

    public getRecipe(id: number) {
        return  this.recipes[id];
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    public updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number): void{
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}