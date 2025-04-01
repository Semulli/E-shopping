import {Route, Routes} from "react-router-dom";
import {Routers} from "../../Constants/Router.jsx";
import HomePage from "../../Pages/Home/index.jsx";
import ProductsPage from "../../Pages/Products/index.jsx";
import ProductDetails from "../../Pages/ProductDetails/index.jsx";
import Basket from "../../Pages/Basket/index.jsx";
import Favorites from "../../Pages/Favorites/index.jsx";
import NotFound from "../../Pages/NotFound/index.jsx";
import {lazy, Suspense} from "react";
import Header from "../Header/index.jsx";
import CircularProgress from '@mui/joy/CircularProgress';
import CenteredLoadingSpinner from "../Loading/index.jsx";


const Main = () => {
    const HomePage = lazy(() => import("../../Pages/Home"));
    const ProductDetails = lazy(() => import("../../Pages/ProductDetails/index.jsx"));
    const NotFound = lazy(() => import("../../Pages/NotFound/index.jsx"));
    const ProductsPage = lazy(() => import("../../Pages/Products/index.jsx"));
    const Basket = lazy(() => import("../../Pages/Basket/index.jsx"));
    const Favorites = lazy(() => import("../../Pages/Favorites/index.jsx"));
    return (
        <>
            <Header/>

            <Suspense fallback={<CenteredLoadingSpinner/>}>
                <Routes>
                    <Route path={Routers.Home} element={<HomePage/>}/>
                    <Route path={Routers.Products} element={<ProductsPage/>}/>
                    <Route path={Routers.ProductDetails + "/:id"} element={<ProductDetails/>}/>
                    <Route path={Routers.Basket} element={<Basket/>}/>
                    <Route path={Routers.Favorites} element={<Favorites/>}/>
                    <Route path={Routers.NotFound} element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </>
    )
}

export default Main