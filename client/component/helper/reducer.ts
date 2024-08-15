import {
  IAuthor,
  IBook,
  ICatalog,
  IMember,
  IPublisher,
  ITransaction,
} from "../../types/type";

interface IState {
  books: IBook[];
  authors: IAuthor[];
  members: IMember[];
  catalogs: ICatalog[];
  transactions: ITransaction[];
  publishers: IPublisher[];
  isLoggedIn: boolean;
  loading: boolean;
}

interface ActionType {
  type: string;
  payload: any;
}

export const initialState:IState = {
  books: [],
  authors: [],
  members: [],
  catalogs: [],
  publishers: [],
  transactions: [],
  isLoggedIn: false,
  loading: false,
};


export function reducer(state: IState, action: ActionType) {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "SET_AUTHORS":
      return { ...state, authors: action.payload };
    case "SET_MEMBERS":
      return { ...state, members: action.payload };
    case "SET_CATALOGS":
      return { ...state, catalogs: action.payload };
    case "SET_PUBLISHERS":
      return { ...state, publishers: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
