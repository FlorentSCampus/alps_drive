export default class Server {
    constructor(express, fs, os, path, port) {
        this.app = express
        this.fs = fs
        this.os = os
        this.path = path
        this.port = port

        this.tmp = os.tmpdir()
        this.tmpDir = "/alps_drive"
    }

    start = () => {
        this.app.use((req, res, next) => {
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

    getName = (req) => {
        if (req.query.name !== undefined) {
            return req.query.name
        } else {
            return req.params.name
        }
    }

    createDir = () => {
        const tmpDirPath = this.tmp + this.tmpDir

        if (this.fs.existsSync(tmpDirPath)) {
            this.fs.promises.mkdir(tmpDirPath, { recursive: true })
        }

        this.app.post("/api/drive", async (req, res, next) => {
            const name = this.getName(req)
            const dirPath = this.path.join(tmpDirPath, "/", name)

            try {
                await this.fs.promises.mkdir(dirPath, { recursive: true })
                return res.sendStatus(201)
            } catch (err) {
                return res.status(500).send(`Cannot create the directory: ${err}`)
            }
        })
    }

    getDirs = () => {
        this.createDir()

        this.app.get("/api/drive", async (req, res, next) => {
            const files = await this.fs.promises.readdir(this.tmp + this.tmpDir, { withFileTypes: true })
            const filesFormat = files.map(file => {
                const obj = {
                    name: file.name,
                    isFolder: file.isDirectory()
                }

                return obj
            })

            res.send(filesFormat)
        })
    }

    deleteDir = () => {
        const tmpDirPath = this.tmp + this.tmpDir

        this.app.delete("/api/drive/:name", (req, res, next) => {
            const name = this.getName(req)
            const dirPath = this.path.join(tmpDirPath, "/", name)

            this.fs.rm(dirPath, { recursive: true }, (err) => {
                if (err) {
                    return res.status(500).send(`Cannot delete the directory: ${err}`)
                } else {
                    return res.sendStatus(200)
                }
            })
        })
    }
}