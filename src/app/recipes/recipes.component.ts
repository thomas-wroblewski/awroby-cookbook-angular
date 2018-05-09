import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeService: RecipeService;
  recipes: Recipe[];
  selectedRecipe: Recipe;
  @Input() newRecipe: Recipe;
  welcome: boolean;
  cookTimeOptions: SelectItem[];




  // Table Headers
  sideMenuColumn = ['recipeName'];
  ingredientsColumn = [ 'amount', 'ingredient'];
  instructionsColumn = [ 'instruction'];

  constructor(recipeService: RecipeService, public dialog: MatDialog) {
      this.recipeService = recipeService;
      this.welcome = true;
      // this.newRecipe = new Recipe();
      this.cookTimeOptions = [
        {label: '0 min', value: '0 min'},
        {label: '5 min', value: '5 min'},
        {label: '10 min', value: '10 min'},
        {label: '15 min', value: '15 min'},
        {label: '20 min', value: '20 min'},
        {label: '25 min', value: '25 min'},
        {label: '30 min', value: '30 min'},
        {label: '35 min', value: '35 min'},
        {label: '40 min', value: '40 min'},
        {label: '45 min', value: '45 min'},
        {label: '50 min', value: '50 min'},
        {label: '55 min', value: '55 min'},
        {label: '60 min', value: '60 min'},
        {label: '75 min', value: '75 min'},
        {label: '90 min', value: '90 min'},
        {label: '120 min', value: '120 min'}
      ];
  }

  ngOnInit () {
    this.recipeService.getRecipes().subscribe(data => this.recipes = data);
  }


  onSelect(recipe: Recipe): void {
      this.selectedRecipe = recipe;
      this.newRecipe = null;
      this.welcome = false;
  }

  onDelete(recipe: Recipe): void {
    // console.log('test');
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { name: recipe.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.recipeService.getRecipes().subscribe(data => this.recipes = data);
      this.selectedRecipe = null;
      this.welcome = true;
    });
  }

  editRecipe(recipe: Recipe) {
    this.newRecipe = recipe;
    this.welcome = false;
    this.selectedRecipe = null;
    console.log('edit');
  }

  generateRecipe() {
    this.newRecipe = new Recipe();
    this.newRecipe.ingredients = [new Ingredient()];
    this.newRecipe.instructions = [new Instruction()];
    this.welcome = false;
    this.selectedRecipe = null;
  }

  addIngRow(ings: Ingredient[], ing: Ingredient) {
    const index: number = this.newRecipe.ingredients.indexOf(ing);
    ings.splice(index + 1, 0, new Ingredient());
    // ings.push(new Ingredient());
  }

  removeIngRow(ing: Ingredient) {
    // this.newRecipe.ingredients;
    const index: number = this.newRecipe.ingredients.indexOf(ing);
    console.log(index);
    if (index !== -1) {
        this.newRecipe.ingredients.splice(index, 1);
    }
  }

  addInstRow(insts: Instruction[], inst: Instruction) {
    const index: number = this.newRecipe.instructions.indexOf(inst);
    insts.splice(index + 1, 0, new Instruction());
  }

  removeInstRow(inst: Instruction) {
    // this.newRecipe.ingredients;
    const index: number = this.newRecipe.instructions.indexOf(inst);
    console.log(index);
    if (index !== -1) {
        this.newRecipe.instructions.splice(index, 1);
    }
  }

  submitRecipe(recipe: Recipe) {
    let index: number;
    index = 0;
    let result: Object;
    for (const inst of recipe.instructions) {
      inst.order = index++;
    }
    this.recipeService.postRecipe(recipe)
      .subscribe(msg => {
        result = msg; console.log(msg);
        this.recipeService.getRecipes().subscribe(data => this.recipes = data);
        this.newRecipe = null;
        this.welcome = true;
      }, err => {
        console.log(err);
      });


  }

}
