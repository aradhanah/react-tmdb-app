import React, { useEffect } from 'react';
import ImageNotAvailable from '../images/NA.png'
const Content = (props) => {
    const { data } = props;
    let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
        posterAlt = data.original_title,
        production = data.production,
        productionCountries = data.production_countries,
        genres = data.genre,
        totalRevenue = data.revenue,
        noData = '-',
        backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;


    if (totalRevenue === 'undefined' || totalRevenue === 0) {
         totalRevenue = noData
       } else {
        let revenue = data.revenue;
        totalRevenue = revenue ? revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }) : noData; 
       };
    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
    })
    return (
        <div className="main-content flex bg-black bg-opacity-75 xs:text-sm xs:flex-col-reverse">
            <div className="poster lg:w-1/3">
                <img className="movie-poster" src={data.poster ? posterIMG : ImageNotAvailable } alt={posterAlt}></img>
            </div>
            <div className="content lg:w-3/4 p-5">
                <h1 className="title uppercase xs:leading-tight">{data.original_title}</h1>
                <div className="tag-line lg:text-xl">{data.tagline}</div>
                <p className="movie-overview">{data.overview}</p>
                <div className="additional-details">
                    <div className="flex additional">
                        <div className="w-1/2">
                            <div className="text-green">RELEASE: </div>
                            <div>{data.release}</div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-green">RUNTIME: </div>
                            <div>{data.runtime} MINS</div>
                        </div>
                    </div>
                    <div className="flex additional">
                        <div className="w-1/2">
                            <div className="text-green">REVENUE: </div>
                            <div>{totalRevenue}</div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-green">AVERAGE VOTES: </div>
                            <div>{data.vote ? data.vote + '/10' : noData}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content;