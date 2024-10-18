import axios from "axios";

export const dedAPi = axios.create({ baseURL: "https://www.dnd5eapi.co" })