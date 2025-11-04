import { Title, Ingredient } from '../components';

const IngredientsList = () => {
    const ingredients = ['gin', 'rum', 'tequila'];

    return (
        <section className="px-10 py-20 text-center lg:px-16 lg:py-24">
            <Title title="popular ingredients" />
            <div className="carousel-container xl:flex-list sm:min-h-[450px]">
                {ingredients.map((item) => {
                    return <Ingredient key={item} ingredient={item} />;
                })}
            </div>
        </section>
    );
};

export default IngredientsList;
