export type FavoriteCategory = "Product" | "Site" | "People" | "Font" | "Movie";

export type FavoriteSecondaryUrl = {
  name: string;
  url: string;
};

export type Favorite = {
  id: string;
  name: string;
  category: FavoriteCategory;
  description: string;
  url: string;
  secondaryUrl?: FavoriteSecondaryUrl;
  previewImageUrl?: string | null;
  nofollow?: boolean;
  createdAt: number;
};
