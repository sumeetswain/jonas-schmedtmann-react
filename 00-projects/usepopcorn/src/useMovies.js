import { useState, useEffect } from "react"

const KEY = "f433faac"

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, SetError] = useState("")
    useEffect(function () {

        callback?.()
        const controller = new AbortController()

        async function fetchMovies() {
            try {

                setIsLoading(true)
                SetError("")

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })

                if (!res.ok) throw new Error("Something went wrong with fetching movies")

                const data = await res.json()

                if (data.Response === "False") throw new Error("Movie not found")
                setMovies(data.Search)
                SetError("")

            } catch (err) {

                if (err.message !== "signal is aborted without reason") {
                    SetError(err.message)
                    console.log(err.message);
                }

            } finally {
                setIsLoading(false)
            }
        }
        if (query.length < 3) {
            setMovies([])
            SetError("")
            return
        }
        // handleCloseMovie()
        fetchMovies()
        return function () {
            controller.abort()
        }
    }, [query])
    return { movies, isLoading, error }
}