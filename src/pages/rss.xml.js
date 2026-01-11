import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const recipes = await getCollection("recipes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      pubDate: recipe.data.pubDate,
      description: recipe.data.description,
      link: `/rezepte/${recipe.id.replace(/^de\//, "").replace(/\.md$/, "")}/`,
    })),
  });
}
