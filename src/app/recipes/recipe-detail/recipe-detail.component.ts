import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe: Recipe;
  public recipe: Recipe;
  public id: number;
  isOpen = false;
  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // use this 👇 instead of this 👆 when reacting to changes from the component.html
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )

  }

  public dropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingLIst(this.recipe.ingredients);
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // use this 👆 or this 👇 both of them works
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});

  }

  public onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
