import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent implements OnInit {

    // recipeService: RecipeService;

    constructor(
      public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
      public recipeService: RecipeService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        // this.recipeService = recipeService;
    }

    ngOnInit() {}

    onNoClick(): void {

      this.dialogRef.close();
    }

    onDelete(name: string): void {
      console.log('deleteDialog');
      let result: Object;
      this.recipeService.deleteRecipe(name)
       .subscribe(msg => { result = msg; console.log(msg); }, err => { console.log(err); });
      this.dialogRef.close();
    }


}
