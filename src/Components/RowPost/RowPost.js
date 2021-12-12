import React, { useEffect, useState } from 'react'
import { imageUrl, API_KEY } from '../../constants/constants'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'


function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    const [page, setPage] = useState(1)
    const [play, setPlay] = useState(false)
    const handleClick = () => {
        setPage(page + 1)
    }
    const close = () => {
        setPlay(false)
    }
    useEffect(() => {
        axios.get(props.url + `&page=${page}`).then((response) => {
            // console.log(response.data.results)
            // console.log(page);
            setMovies(movies.concat(response.data.results))
        }).catch((err) => {
            // alert('Network Error')
        })
    }, [page])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }
    const handleMovie = (id) => {
        setPlay(true)
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-us`).then((response) => {
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
            } else {
                console.log('Array empty');
                setUrlId("")
            }
        }).catch((err) => {
            console.log("Item not found");
            setUrlId("")
        })
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj) =>
                    <div>
                        <img onClick={() => { handleMovie(obj.id) }} className={props.isSmall ? 'smallPoster loading' : 'poster loading'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
                        <h4>{obj.name || obj.title}</h4>
                    </div>
                )}
                <button className="show-more" onClick={handleClick}>Show More</button>
            </div>
            {urlId && play && <div className='youtube'>
                <div className='yt-close' onClick={() => setUrlId(null)}><span>&#10005;</span></div>
                <YouTube opts={opts} onEnd={close} videoId={urlId.key} />
            </div>}
        </div>
    )
}

export default RowPost
