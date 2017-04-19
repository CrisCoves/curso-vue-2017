// Dependencies
import Vue from 'vue'
import Router from 'vue-router'
import RandomWords from '@/libs/RandomWords.js'

// Components
import App from '@/App'
import MovieList from '@/components/MovieList/MovieList'
import Movie from '@/components/Movie/Movie'
import GoToHome from '@/components/GoToHome/GoToHome'
import NotFound from '@/components/NotFound/NotFound'

Vue.use(Router)

export default new Router({
    // Remove the hash mode for router, and simulate a full URL
    mode: 'history',
    routes: [
        {
            path: '/',
            component: App,
            children: [
                {
                    // loclahost:8080?criteria=[criterio-de-busqeda]
                    path: '',
                    name: 'movieList',
                    component: MovieList,
                    props: route => ({
                        // RandomWords: Genera una pañabra aleatoria para
                        // cuando `criteria` no viene definido en la ruta
                        criteria: route.query.criteria || RandomWords()
                    })
                },
                {
                    // localhost:8080/film/[identificdor]
                    path: '/film/:film',
                    name: 'movie',
                    components: {
                        default: Movie,
                        return: GoToHome
                    },
                    props: {
                        default: true
                    }
                }
            ]
        },
        {
            path: '/not-found',
            name: '404',
            component: NotFound
        },
        {
            path: '*',
            redirect: { name: '404' }
        }
    ]
})
