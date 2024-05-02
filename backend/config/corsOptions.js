const corsList = ["http://localhost:5000", "http://localhost:3000", "http://localhost:3002"];
const corsOptions = {
    origin: (origin, callback) => {
        if(corsList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS!'))
        }
    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions;