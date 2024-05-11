import { Get, Post } from "./common";

export default class UserService {
  static getAll = async (data) => await Post({ path: "users", body: data });

  static getById = async (token, userId) =>
    await Get({ path: `users/${userId}`, token });

  static login = async (data) =>
    await Post({ path: "users/login", body: data });

  static activateAccount = async (data) =>
    await Post({ path: "users/activate", body: data });

  static signup = async (data) =>
    await Post({ path: "users/signup", body: data });

  static update = async (token, data) =>
    await Post({ path: "users/update", token, body: data });

  static addFavourite = async (token, data) =>
    await Post({ path: "users/add-favourite", token, body: data });

  static removeFavourite = async (token, data) =>
    await Post({ path: `users/remove-favourite`, token, body: data });

  static updateTags = async (token, data) =>
    await Post({ path: "users/tags", token, body: data });

  static updateLevel = async (token, data) =>
    await Post({ path: "users/level", token, body: data });

  static addRoadmap = async (token, data) =>
    await Post({ path: "users/add-roadmap", token, body: data });

  static removeRoadmap = async (token, data) =>
    await Post({ path: `users/remove-roadmap`, token, body: data });

  static updateRoadmap = async (token, data) =>
    await Post({ path: `users/update-roadmap`, token, body: data });
}
