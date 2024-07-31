import IRestaurant, {
  ICreateRestaurant,
  IEditRestaurant,
} from '../interfaces/restaurant';
import { BaseModel } from './base';

export default class RestaurantModel extends BaseModel {
  static getAllRestaurants() {
    return this.queryBuilder()
      .select('*')
      .from('restaurants')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRestaurant(userID: string) {
    return this.queryBuilder()
      .select('restaurants.*')
      .from('restaurants')
      .join('users', 'restaurants.user_id', 'users.id')
      .where('users.id', userID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createRestaurant(userID: string, restaurant: ICreateRestaurant) {
    return this.queryBuilder()
      .insert({ ...restaurant, userId: userID })
      .into('restaurants')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editRestaurant(
    restaurantID: string,
    editRestaurantData: IEditRestaurant,
  ) {
    return this.queryBuilder()
      .update(editRestaurantData)
      .from('restaurants')
      .where('id', restaurantID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteRestaurant(restaurantID: string) {
    return this.queryBuilder()
      .del()
      .from('restaurants')
      .where('id', restaurantID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}