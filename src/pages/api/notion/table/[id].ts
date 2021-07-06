import { fetchPageById } from "../../../../notion/core";
import { getTableData } from "../../../../notion/table";
import { CollectionType } from "../../../../notion/types";
import { parsePageId } from "../../../../notion/utils";
import { NextApiRequest, NextApiResponse } from "next";

const notionToken = process.env.NOTION_TOKEN || "";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pageId = parsePageId(req.query.id as string);
  const page = await fetchPageById(pageId!, notionToken);

  if (!page.recordMap.collection) {
    return res
      .status(422)
      .json({ error: `No table found on Notion page: ${pageId}` });
  }

  const collection = Object.keys(page.recordMap.collection).map(
    (k) => page.recordMap.collection[k]
  )[0];

  const collectionView: {
    value: { id: CollectionType["value"]["id"] };
  } = Object.keys(page.recordMap.collection_view).map(
    (k) => page.recordMap.collection_view[k]
  )[0];

  const { rows } = await getTableData(
    collection,
    collectionView.value.id,
    notionToken
  );

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
  return res.json(rows);
};
