const grpc = require('grpc')

const MovieService =  grpc.load('movie.proto').MovieService 

const client = new MovieService('localhost:50051',
grpc.credentials.createInsecure())

client.insert({id: "1", title: 'New Movie 1', content: 'New Content 1'},(err,movies)=>{
    if(err) {
        console.error(err)
        return
    }
    console.log("**** insert result *****: ")
    console.log(movies)
})

client.insertMany([
    {id: "1", title: 'New Movie 1', content: 'New Content 1'},
    {id: "23", title: 'New Movie 23', content: 'New Content 23'},
    {id: "24", title: 'New Movie 24', content: 'New Content 24'}
],(err,movies)=>{
    if(err) {
        console.error(err)
        return
    }
    console.log("**** insertMany result *****: ")
    console.log(movies)
})

client.search({id:"1"},(err,movies)=>{
    if(err) {
        console.error(err)
        return
    }
    console.log("**** search result *****: ")
    console.log(movies)
})