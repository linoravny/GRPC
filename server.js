const grpc = require('grpc')
const movieProto = grpc.load('movie.proto')

const movies = [
    { id: '1', title: 'Movie 1', content: 'Content 1'},
    { id: '2', title: 'Movie 2', content: 'Content 2'}
]
const server = new grpc.Server()

server.addService(movieProto.MovieService.service, {
    
    insert : (call,callback) => {
        
        let movie = call.request
        console.log(movie)
        
        movies.push(movie)
        callback(null,movies)
    },
    insertMany : (call,callback) => {
        
        let movies = call.request
        console.log(movies)

        for(let i=0;i< movies.length; i++) {
            movies.push(movie)
        }
        
        callback(null,movies)
    },
    search :(call,callback) => {
        let req = call.request
        console.log("search id:" + req.id)

        let searchMovies = movies.filter((item) => {
            return item.id == req.id
        })

        console.log(searchMovies)
        callback(null,searchMovies)
    }
})

server.bind('127.0.0.1:50051',grpc.ServerCredentials.createInsecure())
server.start()
console.log(`the server is running`)
