import api from "./index";
import config from "../config";
import { keyedTop250Films } from "../data";

export const getTop250Films = async () => {
  const result = (await api.get(`Top250Movies/${config.IMDB_API_KEY}`).json())
    .items;
  return result;
};

export const getFilm = async (id) => {
  if (keyedTop250Films[id] != null) {
    return keyedTop250Films[id];
  }
  const result = await api.get(`Title/${config.IMDB_API_KEY}/${id}`).json();
  return result;
};

export const searchFilms = async (filter) => {
  const result = (
    await api.get(`SearchMovie/${config.IMDB_API_KEY}/${filter}`).json()
  ).results;
  return result;
};
