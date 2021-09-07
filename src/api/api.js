import server from '../libs/server'
export default class Api {
    static translate(params) {
        return server.get('/translate', { params })
    }
}