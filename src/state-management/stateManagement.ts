import Header from '../app-section/header';
import { IFormattedCartItemData } from '../interfaces/cartItem';
import Cart from '../pages/cart/cart';
import MenuPageLayout from '../pages/menu/menuPageLayout';

interface AppState {
  accessToken: string | null;
  user: {
    id: string;
    name: string;
    imageSrc: string;
    roleID: string;
    email: string;
    phoneNumber: string;
  } | null;
  cart: IFormattedCartItemData[];
}

export class StateManagement {
  static state: AppState = this.loadStateFromSessionStorage();

  static updateState<K extends keyof AppState>(key: K, value: AppState[K]) {
    this.state[key] = value;
    this.saveStateToSessionStorage();
    this.render();
  }

  static resetState() {
    this.state = this.getInitialState();
    this.saveStateToSessionStorage();
    this.render();
    MenuPageLayout.init();
    Cart.init();
  }

  static render() {
    Header.init();
  }

  static saveStateToSessionStorage() {
    sessionStorage.setItem('appState', JSON.stringify(this.state));
  }

  static loadStateFromSessionStorage(): AppState {
    const storedState = sessionStorage.getItem('appState');
    if (!storedState) return this.getInitialState();

    try {
      return JSON.parse(storedState) as AppState;
    } catch (error) {
      console.error('Failed to parse state from sessionStorage:', error);
      return this.getInitialState();
    }
  }

  static getInitialState(): AppState {
    return {
      accessToken: null,
      user: null,
      cart: [],
    };
  }
}