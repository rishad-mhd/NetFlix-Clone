import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
import YouTube from 'react-youtube'

function Banner() {
    const [movie, setMovie] = useState()
    const [urlId, setUrlId] = useState('')
    const [play,setPlay] = useState(false)
    const close = ()=>{
        setPlay(false)
    }
    
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            const random=response.data.results[Math.floor(Math.random() * response.data.results.length)]
            console.log(random);
            setMovie(random)
        })
    }, [])
    const handleMovie = (id) => {
        setPlay(true)
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-us`).then((response) => {
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
            } else {
                console.log('Array empty');
            }
        }).catch((err) => {
            console.log("Item not found");
        })
    }
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }
    return (
        <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}} className="banner">
            <div className="content">
                <h1 className="title">{movie ? (movie.name||movie.title):""}</h1>
                <div className="banner-buttons">
                    <button className="button" onClick={(e)=>{
                        e.preventDefault()
                        handleMovie(movie.id)}}>Play</button>
                    <button className="button">My List</button>
                </div>
                <h1 className="description">{movie?movie.overview:""}</h1>
            </div>
            <div className="fade-bottom"></div>
            {urlId && play&& <div className='youtube'>
            <div className='yt-close' onClick={() => setUrlId(null)}><span>&#10005;</span></div>
                <YouTube opts={opts}  onEnd={close} onError={close} videoId={urlId.key} />
                </div>}
        </div>
    )
}

export default Banner
