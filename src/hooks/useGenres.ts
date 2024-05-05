import { useEffect, useState } from "react";
import { Game } from "./useGame";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}


const useGenres = () => {
    const [genres, setGenres] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        setLoading(false); // set skeloton loading cards to display loading cards. 

        apiClient
            .get<FetchGenresResponse>("/genres", { signal: controller.signal })
            .then((res) => {
                setGames(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false);
            });

        return () => controller.abort();
    });

    return { genres, error, isLoading };
};

export default useGenres;