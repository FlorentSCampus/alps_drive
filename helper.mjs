export class Helper {
    static isValidName = (name) => {
        const regex = /^[\w\d\-]+(\.[\w\d\-]+)?$/
        return name.match(regex) ? true : false
    }
}