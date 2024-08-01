import { ICreateDish, IEditDish } from '../interfaces/dish';
import { BaseModel } from './base';

export default class DishModel extends BaseModel {
  static getAllDishes() {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getDish(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .where('menu_item_id', menuItemId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createDish(menuItemId: string, dishData: ICreateDish) {
    return this.queryBuilder()
      .insert({ ...dishData, menuItemId: menuItemId })
      .into('dishes')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editDish(dishId: string, editDishData: IEditDish) {
    return this.queryBuilder()
      .update(editDishData)
      .from('dishes')
      .where('id', dishId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteDish(dishId: string) {
    return this.queryBuilder()
      .del()
      .from('dishes')
      .where('id', dishId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
