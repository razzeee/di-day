import { useState } from "react";
import type { CollectionEntry } from "astro:content";

interface Props {
  recipe: any;
  seeText: string;
  href: string;
}

export default function RecipeCard({ recipe, seeText, href }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const data = recipe.data || recipe;
  const heroImage = data.heroImage;
  const title = data.title;
  const description = data.description;

  return (
    <a
      href={href}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {heroImage && (
        <div
          className="aspect-video overflow-hidden"
          data-astro-transition:name={`recipe-image-${title}`}
        >
          <img
            src={typeof heroImage === "string" ? heroImage : heroImage.src}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {description}
        </p>

        <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
          <span
            className={`transition-transform ${
              isHovered ? "translate-x-1" : ""
            }`}
          >
            {seeText}
          </span>
        </div>
      </div>
    </a>
  );
}
