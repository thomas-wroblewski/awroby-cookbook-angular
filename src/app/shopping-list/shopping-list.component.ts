import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe';
import { Ingredient } from '../recipes/ingredient';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  recipeService: RecipeService;
  recipes: Recipe[];
  selectedValues: string[] = [];

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => this.recipes = data);
  }



}
