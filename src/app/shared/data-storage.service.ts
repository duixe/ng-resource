import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    private server = "https://recipe-4a90c-default-rtdb.firebaseio.com";
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    public storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put(`${this.server}/recipe.json`, recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    public fetchRecipes() {
        // trying to take only one property fron the user (BehaviouralSubject) from 
        // the authService and then unscubscribe automativally
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
            .get<Recipe[]>(`${this.server}/recipe.json`, 
            {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }), map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes); 
        }));
    }

    // public fetchRecipes() {
    //     return this.http.get<Recipe[]>(`${this.server}/recipe.json`)
    //     .pipe(
    //         map(recipes => {
    //             return recipes.map(recipe => {
    //                 return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
    //             });
    //         }),
    //         tap(recipes => {
    //             this.recipeService.setRecipes(recipes); 
    //         })
    //     )
    // }
}