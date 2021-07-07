import fetch from "node-fetch";
import { getSSRTable } from "./ssr";

const fetchNotionAPI = async (endpoint: string) => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL || `https://rizkyrahad.vercel.app`
      : `http://localhost:3000`;
  return await fetch(`${baseURL}${endpoint}`).then((res) => res.json());
};

export const getTable = async (tableId: string) => {
  const tableEndpoint = `/api/notion/table/${tableId}`;
  return await fetchNotionAPI(tableEndpoint);
};

export const getPage = async (pageId: string) => {
  const pageEndpoint = `/api/notion/page/${pageId}`;
  return await fetchNotionAPI(pageEndpoint);
};

const parseMeta = (notionTable: any[]) => {
  const result = {};
  for (const obj of notionTable) {
    if (obj["Type"] === "text") {
      const key = obj["Key"].toLowerCase();
      const value = obj["Value"];
      result[key] = value;
    } else if (obj["Type"] === "file") {
      const key = obj["Key"].toLowerCase();
      const value = obj["File"][0];
      result[key] = value;
    } else if (obj["Type"] === "number") {
      const key = obj["Key"].toLowerCase();
      try {
        const value = parseInt(obj["Value"]);
        result[key] = value;
      } catch (e) {
        console.log(e);
        result[key] = 0;
      }
    }
  }
  return result;
};

export const getMeta = async () => {
  const metaPageId = `3e28ec13b74f408f99c2e514918fbce8`;
  const table = await getSSRTable(metaPageId);
  const meta = parseMeta(table);

  return meta;
};

export const getPosts = async () => {
  const postsTableId = `a33808e821de4b97938c01373c0a6026`;
  return await getSSRTable(postsTableId);
};
