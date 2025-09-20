import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000",
});

export async function sendChat(message) {
  const { data } = await api.get("/chat", { params: { message } });
  if (data.error) throw new Error(data.error);
  return data.reply;
}
