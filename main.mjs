import { Server } from "./server.mjs"

const port = 3000
const tmpDirName = "/alps_drive"
const drivePath = "/api/drive/:name(*)"

const server = new Server(port, tmpDirName, drivePath)

server.config()
    .then(() => {
        server.start()
    }).catch(e => {
        console.error("Cannot launch server", e)
    })
