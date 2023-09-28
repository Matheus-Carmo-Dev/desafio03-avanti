import { useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { api } from '../../services/api';
import { FaStar, FaCalendar } from 'react-icons/fa';


import "./style.css"
import { useParams } from "react-router-dom";
import moment from "moment";
export const Detalhes = () => {



    const id = useParams().id;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {

            api.get(`/movie/${id}?language=pt`)
                .then(response => {
                    setMovie(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter os detalhes do filme:', error);
                });
        }
        fetchMovie();
    }, []);


    return (
        <>
            <div className="detalhes-container .d-flex flex-column align-items-center">
            <Header />
                <h2>{movie.title}</h2>
                <h5>{moment(movie.release_date).format('DD/MM/YYYY')}</h5>
                <img className="detalhes-poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
                <link rel="icon" href="./assets/icone_logo_aba.png" />
                <h5 className="text-warning " >{movie.vote_average}
                    <FaStar />

                </h5>
                <div className="genero">
                    <h5>Gênero(s)</h5>
                    {
                        movie.genres?.map((genre) => (
                            <span key={genre.id}>{`${genre.name}`} </span>
                        ))
                    }
                </div>

                <p className="description">{movie.overview}</p>

                <div className="companies">
                    <h5>Companhias de produção</h5>
                    {
                        movie.production_companies?.map((companies) => (
                            <span key={companies.id}>
                                {companies.logo_path != undefined &&
                                    <img className="companies-img" src={`https://image.tmdb.org/t/p/original/${companies.logo_path}`}></img>
                                }

                            </span>
                        ))
                    }
                </div>

            </div>
        </>
    )
}
