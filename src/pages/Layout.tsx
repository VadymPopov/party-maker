import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar, SearchByLetter, Footer, Loader } from '../components';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {isPageLoading ? <Loader /> : <Outlet />}
                <SearchByLetter />
            </main>

            <Footer />
        </>
    );
};

export default Layout;
