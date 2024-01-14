import axios from "axios";

const API_URL = "http://localhost:3000";
const TIMEOUT_IN_MS = 10000;
const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

export const apiWithConfig = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT_IN_MS,
    headers: DEFAULT_HEADERS
});