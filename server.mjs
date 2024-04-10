export default class Server {
    constructor(express, port) {
        this.app = express
        this.port = port
    }

    start = () => {
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}