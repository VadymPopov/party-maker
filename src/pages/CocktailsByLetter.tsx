import { useLoaderData } from 'react-router-dom';
import { CocktailsContainer } from '../components';

const CocktailsByLetter = () => {
    const { searchTerm } = useLoaderData() as { searchTerm: string };

    return (
        <CocktailsContainer
            searchTerm={searchTerm}
            searchType="letter"
            showSearchForm={false}
            title={`This is what we got for "${searchTerm}"`}
        />
    );
};

export default CocktailsByLetter;
