import { Helper } from "./helper.mjs"
import { Drive } from "./drive.mjs"

import express from "express"
import bb from "express-busboy"

import os from "node:os"
import path from "node:path"

export class Server {
    constructor(port, tmpDirName, drivePath) {
        this.helper = new Helper()
        this.drive = new Drive()

        this.port = port

        this.tmpDirName = tmpDirName
        this.tmpDirPath = os.tmpdir() + this.tmpDirName

        this.drivePath = drivePath

        this.app = express()
    }

    config = async () => {
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Methods", "*")
            res.setHeader("Access-Control-Allow-Headers", "*")
            res.setHeader("Cache-Control", "no-store")
            next()
        })

        bb.extend(this.app, { upload: true, path: "/tmp/busboy" })

        this._getConfig()
        this._postConfig()
        this._putConfig()
        this._deleteConfig()

        await this.drive._setTmpDir(this.tmpDirPath)
    }

    start = () => {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

    _getConfig = () => {
        const onRequest = async (req, res, next) => {
            try {
                const contents = await this.drive._getContents(this.tmpDirPath, req.params.name)
                return res.status(200).send(contents)
            } catch (e) {
                return res.status(500).send(`Cannot get contents: ${e}`)
            }
        }

        this.app.get(this.drivePath, onRequest)
    }

    _postConfig = () => {
        const onRequest = async (req, res, next) => {
            if (!this.helper.isValidName(req.query.name)) {
                return res.status(400).send(`${req.query.name} is an illegal name`)
            }

            try {
                const createDir = await this.drive._setDir(path.join(this.tmpDirPath, req.params.name), req.query.name)
                return res.status(201).send(createDir)
            } catch (e) {
                return res.status(500).send(`Cannot create directory: ${e}`)
            }
        }

        this.app.post(this.drivePath, onRequest)
    }

    _putConfig = () => {
        const onRequest = async (req, res, next) => {
            if (!this.helper.isValidName(req.files.file.filename)) {
                return res.status(400).send(`${req.files.file.filename} is an illegal name`)
            }

            try {
                const uploadFile = await this.drive._putFile(path.join(this.tmpDirPath, req.params.name, req.files.file.filename), req)
                return res.status(200).send(uploadFile)
            } catch (e) {
                return res.status(500).send(`Cannot upload file: ${e}`)
            }
        }

        this.app.put(this.drivePath, onRequest)
    }

    _deleteConfig = () => {
        const onRequest = async (req, res, next) => {
            try {
                const deleteContent = await this.drive._deleteContent(path.join(this.tmpDirPath, req.params.name), req.params.name)
                return res.status(200).send(deleteContent)
            } catch (e) {
                return res.status(500).send(`Cannot delete content: ${e}`)
            }
        }

        this.app.delete(this.drivePath, onRequest)
    }
}