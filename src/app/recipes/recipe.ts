import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {
  id: number;
  name: string;
  cooktime: string;
  ingredients: Ingredient[];
  instructions: Instruction[];


}
