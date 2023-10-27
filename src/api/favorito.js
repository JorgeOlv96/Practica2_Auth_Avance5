import AsyncStorage from "@react-native-async-storage/async-storage";

import { ENV } from "../util/constants"
import { includes, pull } from "lodash"

// función para traer favoritos
export const getFavoriteApi = async () => {
  try {
      const response = await AsyncStorage.getItem(ENV.STORAGE.FAVORITE);
      return JSON.parse(response || []);
  } catch (error) {
      console.log(error);
  }
}
// función para añadir a favoritos
export const addFavoritosApi = async (id) => {
  try {
    // Recuperar los favoritos actuales
    const favoritosJSON = await AsyncStorage.getItem(ENV.STORAGE.FAVORITE);
    const favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];


    if (!favoritos.includes(id)) {
      favoritos.push(id);
      // Guardar la lista actualizada
      await AsyncStorage.setItem(ENV.STORAGE.FAVORITE, JSON.stringify(favoritos));
    }
    else{
      console.log("Este ya lo agregaste :O")
    }
  } catch (error) {
    console.log("src/api/Favoritos/addFavoritos:Error:", error);
  }
}

// función para validar si un personaje esta en favoritos o no
export const isFavoriteApi = async (id) => {
  try {
      const favorites = await getFavoriteApi();
      return includes(favorites, id);
  } catch (error) {
      console.log(error);
      return false;
  }
}

// función que elimina un personaje de favoritos
export const removeFavoriteApi = async (id) => {
  try {
      const favorites = await getFavoriteApi();
      const newFavorites = pull(favorites, id);
      await AsyncStorage.setItem(ENV.STORAGE.FAVORITE, JSON.stringify(newFavorites));
  } catch (error) {
      console.log(error)
  }
}