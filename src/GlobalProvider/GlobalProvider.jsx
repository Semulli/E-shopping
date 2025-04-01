import React, {createContext, useState, useEffect} from "react";
import {toast} from "react-toastify";

export const context = createContext();

export const DataProvider = ({children}) => {
    const [favoriteData, setFavoriteData] = useState([]);
    const [basketData, setBasketData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortValue, setSortValue] = useState('')
    useEffect(() => {
        try {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];

            setFavoriteData(Array.isArray(storedFavorites) ? storedFavorites : []);
            setBasketData(Array.isArray(storedBasket) ? storedBasket : []);
        } catch (error) {
            console.error("LocalStorage JSON parsing error:", error);
            setFavoriteData([]);
            setBasketData([]);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoriteData));
    }, [favoriteData]);


    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basketData));
    }, [basketData]);


    const addFavorites = (product) => {
        setFavoriteData((prev) => {
            if (prev.some((favorite) => favorite.id === product.id)) {
                return prev;
            }
            return [...prev, product];

        });
        toast.success("Added successfully.");

    };


    const addBasket = (data) => {
        setBasketData((prev) => {
            if (prev.some((item) => item.id === data.id)) {
                return prev;
            }
            return [...prev, data];

        });
        toast.success("Added successfully.");

    };

    const deleteBasket = (id) => {
        setBasketData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Deleted successfully.");
    };

    const deleteFav = (id) => {
        setFavoriteData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Deleted successfully.");

    };


    return (
        <context.Provider
            value={{
                addFavorites,
                favoriteData,
                addBasket,
                basketData,
                deleteBasket,
                deleteFav,
                sortValue,
                setSortValue,
                searchQuery,
                setSearchQuery
            }}>
            {children}
        </context.Provider>
    );
};

export const useData = () => {
    return React.useContext(context);
};
