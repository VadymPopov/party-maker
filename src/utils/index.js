import axios from "axios";

export const searchCocktailsQuery = (searchType, searchTerm) => {
  let searchUrl;
  switch (searchType) {
    case "name":
      searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
      break;
    case "ingredient":
      searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
      break;
    case "letter":
      searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
      break;
    case "random":
      searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      break;
    case "cocktail":
      searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
      break;
    default:
      throw new Error("Invalid search type");
  }

  return {
    queryKey: [searchType, searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${searchUrl}${searchTerm || ""}`);
      if (searchType === "ingredientInfo") {
        return response.data;
      }
      return response.data.drinks;
    },
  };
};

export const searchIngredientQuery = (searchType, searchTerm) => {
  const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=";

  return {
    queryKey: [searchType, searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${searchUrl}${searchTerm}`);
      return response.data;
    },
  };
};

export const loader =
  (queryClient, queryFn, searchType) =>
  async ({ request, params }) => {
    let searchTerm;
    const url = new URL(request.url);

    switch (searchType) {
      case "name":
        searchTerm = url.searchParams.get("search") || "";
        break;
      case "ingredient":
        searchTerm = params.ingredient;
        break;
      case "letter":
        searchTerm = params.letter;
        break;
      case "random":
        searchTerm = "";
        break;
      case "cocktail":
        searchTerm = params.id;
        break;

      default:
        console.log("error is here");
        break;
    }

    await queryClient.ensureQueryData(queryFn(searchType, searchTerm));
    return { searchTerm };
  };

export const cocktailsLoader = (queryClient) =>
  loader(queryClient, searchCocktailsQuery, "name");

export const singleCocktailLoader = (queryClient) =>
  loader(queryClient, searchCocktailsQuery, "cocktail");

export const randomCocktailLoader = (queryClient) =>
  loader(queryClient, searchCocktailsQuery, "random");

export const getCocktailsByIngredientLoader = (queryClient) =>
  loader(queryClient, searchCocktailsQuery, "ingredient");

export const getCocktailsByLetterLoader = (queryClient) =>
  loader(queryClient, searchCocktailsQuery, "letter");
