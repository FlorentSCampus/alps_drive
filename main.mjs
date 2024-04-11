import express from "express"
import fs from "fs"
import os from "os"
import path from "path"

import Server from "./server.mjs"

const port = 3000
const server = new Server(express(), fs, os, path, port)

server.start()
server.getDirs()
server.createDir()
server.deleteDir()