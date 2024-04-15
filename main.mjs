import express from "express"
import bb from "express-busboy"
import fs from "fs"
import os from "os"
import path from "path"

import Server from "./server.mjs"

const port = 3000
const server = new Server(express(), bb, fs, os, path, port)

server.start()
server.createDir()
server.putFile()
server.deleteContent()

// //

// TO DO LATEER
// server.changeDir()