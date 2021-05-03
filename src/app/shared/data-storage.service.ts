import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    private server = "https://recipe-4a90c-default-rtdb.firebaseio.com";
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    public storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put(`${this.server}/recipe.json`, recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    public fetchRecipes() {
        return this.http.get<Recipe[]>(`${this.server}/recipe.json`)
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes); 
            })
        )
    }
}