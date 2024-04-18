export class Helper {
    isValidName = (name) => {
        const regex = /^[\w\d\-]+(\.[\w\d\-]+)?$/
        return name.match(regex) ? true : false
    }
}