import fs from "node:fs"
import path from "node:path"

export class Drive {
    _setTmpDir = async (pathToCreate) => {
        if (!fs.existsSync(pathToCreate)) {
            await fs.promises.mkdir(pathToCreate, { recursive: true })
        }
    }

    _getContents = async (dirPath, name) => {
        const fullPath = path.join(dirPath, name)

        if (fs.statSync(fullPath).isDirectory()) {
            const contents = await fs.promises.readdir(fullPath, { withFileTypes: true })
            const contentsFormat = contents.map(file => {
                return {
                    name: file.name,
                    size: fs.statSync(fullPath).size,
                    isFolder: file.isDirectory()
                }
            })

            return contentsFormat
        } else {
            const content = await fs.promises.readFile(fullPath)
            return content
        }
    }

    _setDir = async (pathToCreate, name) => {
        await fs.promises.mkdir(path.join(pathToCreate, name), { recursive: true })
    }

    _putFile = async (pathToUpload, req) => {
        await fs.promises.rename(req.files.file.file, pathToUpload)
    }

    _deleteContent = async (contentPath) => {
        await fs.promises.rm(contentPath, { recursive: true })
    }
}