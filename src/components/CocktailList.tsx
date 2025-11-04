import CocktailCard from './CocktailCard';

export interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strAlcoholic: string;
    strGlass: string;
}

interface CocktailListProps {
    drinks: Drink[];
    layout: string;
    searchTerm: string;
}

const CocktailList = ({ drinks, layout, searchTerm }: CocktailListProps) => {
    if (!searchTerm) {
        return (
            <h4 className="h-screen text-center">
                Ready to mix? Enter a cocktail name, like 'Mojito' or 'Gin',
                above to start searching!
            </h4>
        );
    }
    if (!drinks) {
        return (
            <h4 className="h-screen text-center">
                No cocktails matched your search. Try a simpler name (e.g.,
                'Gin' instead of 'Gin Tonic') or a different spirit.
            </h4>
        );
    }

    const formattedDrinks = drinks?.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

        return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
        };
    });

    return (
        <div
            className={
                layout === 'grid'
                    ? 'grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3'
                    : 'mt-12 grid gap-y-8'
            }
        >
            {formattedDrinks?.map((item) => {
                return <CocktailCard key={item.id} {...item} layout={layout} />;
            })}
        </div>
    );
};

export default CocktailList;
