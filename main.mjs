import express from "express"
import Server from "./server.mjs"

const port = 3000

const server = new Server(express(), port)

server.start()