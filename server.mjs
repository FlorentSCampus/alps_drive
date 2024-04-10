export default class Server {
    constructor(express, port) {
        this.app = express
        this.port = port
    }

    start = () => {
        this.app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "*");
            res.setHeader("Access-Control-Allow-Headers", "*");
            next();
        })
        
        this.app.get("/", (req, res) => {
            res.send("Hello World!")
        })

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}