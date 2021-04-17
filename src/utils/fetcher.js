import urls from './urls'

const fetcher = (url, callback) => {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if (json.success == false) {
                callback({
                    err: true,
                    data: null,
                    msg: json.status_message
                })
            } else {
                callback({
                    err: false,
                    data: json,
                    msg: null
                })
            }
        })
        .catch((error) => {
            callback({
                err: true,
                data: null,
                msg: error
            })
        })

}

const Fetcher = {

    fetch_search_multi: (query, callback) => fetcher(urls.search_multi(query), callback),

    fetch_popular_movie: callback => fetcher(urls.popular_movie, callback),
    fetch_top_movie: callback => fetcher(urls.top_movie, callback),
    fetch_trending_movie: callback => fetcher(urls.trending_movie, callback),
    fetch_current_playing_movie: callback => fetcher(urls.current_playing_movie, callback),

    fetch_recommeneded_movie: (id, callback) => fetcher(urls.recommended_movie(id), callback),
    fetch_similar_movie: (id, callback) => fetcher(urls.similar_movie(id), callback),
    fetch_movie_video: (id, callback) => fetcher(urls.movie_video(id), callback),
    fetch_movie_details: (id, callback) => fetcher(urls.movie_details(id), callback),
    fetch_movie_reviews: (id, callback) => fetcher(urls.movie_reviews(id), callback),
    fetch_movie_cast: (id, callback) => fetcher(urls.movie_cast(id), callback),

    fetch_popular_tv: callback => fetcher(urls.popular_tv, callback),
    fetch_top_tv: callback => fetcher(urls.top_tv, callback),
    fetch_trending_tv: callback => fetcher(urls.trending_tv, callback),

    fetch_recommeneded_tv: (id, callback) => fetcher(urls.recommended_tv(id), callback),
    fetch_similar_tv: (id, callback) => fetcher(urls.similar_tv(id), callback),
    fetch_tv_video: (id, callback) => fetcher(urls.tv_video(id), callback),
    fetch_tv_details: (id, callback) => fetcher(urls.tv_details(id), callback),
    fetch_tv_reviews: (id, callback) => fetcher(urls.tv_reviews(id), callback),
    fetch_tv_cast: (id, callback) => fetcher(urls.tv_cast(id), callback),

    fetch_cast_detail: (id, callback) => fetcher(urls.cast_detail(id), callback),
    fetch_cast_external_ids: (id, callback) => fetcher(urls.cast_external_ids(id), callback),


    setData: (d, callback, type) => {
        const { err, data, msg } = d
        if (err) {
            console.log(type + " Error:" + msg)
            callback(null)
        }
        else callback(data)
    }
}

export default Fetcher;