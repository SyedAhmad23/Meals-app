import React, { useContext, useEffect, useState } from "react";


const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
    const getFavoritesFromLocalStorage = () => {
        let favourites = localStorage.getItem('favourites');
        if (favourites) {
            favourites = JSON.parse(localStorage.getItem('favourites'))
        }
        else {
            favourites = []
        }
        return favourites
    }

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favourites, setFavourites] = useState(getFavoritesFromLocalStorage());





    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios.get(url)
            if (data.meals) {
                setMeals(data.meals)
            }
            else {
                setMeals([])
            }
        }
        catch (e) {

            console.log(e.response)
        }
        setLoading(false)
    }
    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const SelectMeal = (idMeal, favouriteMeal) => {
        let meal;
        meal = meals.find((meal) => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }
    const CloseModal = () => {
        setShowModal(false)
    }

    const addToFavourite = (idMeal) => {
        const alreadyFavourites = favourites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavourites) return
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const updateFavourites = [...favourites, meal]
        setFavourites(updateFavourites)
        localStorage.setItem("favourites", JSON.stringify(updateFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        const updateFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
        setFavourites(updateFavourites)
        localStorage.setItem("favourites", JSON.stringify(updateFavourites))

    }

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if (favouriteMeal) {
            meal = favourites.find((meal) => meal.idMeal === idMeal);
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true)
    }
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])


    return (
        <AppContext.Provider
            value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, SelectMeal, CloseModal, addToFavourite, favourites, removeFromFavourites, selectMeal }}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }