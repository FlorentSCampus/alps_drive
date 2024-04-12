export default class Server {
    constructor(express, fs, os, path, process, port) {
        this.dirName = "/alps_drive"

        this.app = express
        this.fs = fs
        this.os = os
        this.path = path
        this.port = port
        this.process = process

        this.tmp = os.tmpdir()
        this.dirPath = this.tmp + this.dirName
    }

    start = () => {
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Methods", "*")
            res.setHeader("Access-Control-Allow-Headers", "*")
            next()
        })
        
        this.app.get("/", (req, res) => {
            res.send("Hello World!")
        })

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

        this.createTmpFolder()
        this.getContent()
    }

    getContent = (dirPath = this.dirPath) => {
        this.app.get("/api/drive", async (req, res, next) => {
            try {
                const files = await this.fs.promises.readdir(dirPath, { withFileTypes: true })
                const filesFormat = files.map(file => {
                    return {
                        name: file.name,
                        size: this.fs.statSync(this.path.join(dirPath, file.name)).size,
                        isFolder: file.isDirectory()
                    }
                })

                return res.status(200).send(filesFormat)
            } catch (err) {
                return res.status(500).send(`Cannot get contents: ${err}`)
            }
        })
    }

    getName = (req) => {
        const name = req.query.name !== undefined ? req.query.name : req.params.name
        const regex = /^[a-zA-Z0-9_-]+$/
        const isValid = regex.test(name)

        return isValid ? name : false
    }

    createTmpFolder = () => {
        if (!this.fs.existsSync(this.dirPath)) {
            this.fs.promises.mkdir(this.dirPath, { recursive: true })
        }
    }

    createDir = () => {
        this.app.post("/api/drive", async (req, res, next) => {
            const name = this.getName(req)

            try {
                const dirPath = this.path.join(this.dirPath, "/", name)
                await this.fs.promises.mkdir(dirPath, { recursive: true })
                return res.sendStatus(201)
            } catch (err) {
                return res.status(500).send(`Cannot create (POST) directory: ${err}`)
            }
        })
    }

    putFile = () => {
        
    }

    deleteContent = () => {
        this.app.delete("/api/drive/:name", (req, res, next) => {
            const name = this.getName(req)
            const dirPath = this.path.join(this.dirPath, "/", name)

            this.fs.rm(dirPath, { recursive: true }, (err) => {
                if (err) {
                    return res.status(500).send(`Cannot delete content: ${err}`)
                } else {
                    return res.sendStatus(200)
                }
            })
        })
    }

    /**
     * TO DO LATER
     */
    changeDir = () => {
        this.app.get("/api/drive/:name", async (req, res, next) => {
            try {
                const name = this.getName(req)
                const dirPath = this.path.resolve(this.dirPath + "/" + name)
                console.log(dirPath);
                // const dirPath = this.dirPath + "/" + name
                const files = await this.fs.promises.readdir(dirPath, { withFileTypes: true })
                const filesFormat = files.map(file => {
                    return {
                        name: file.name,
                        isFolder: file.isDirectory()
                    }
                })

                return res.status(200).send(filesFormat)
            } catch (err) {
                return res.status(500).send(`Cannot changed directory: ${err}`)
            }
        })
    }
}