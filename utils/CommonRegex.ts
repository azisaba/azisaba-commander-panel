
export const isAlphabetNumber = (str: string, min?: number, max?: number): boolean => {
    const regex = new RegExp("^([a-zA-Z0-9]{" + (min ? min : 8) + "," + (max ? max : "") + "})$")
    return regex.test(str)
}

export const isAlphabetNumberSymbol = (str: string, min?: number, max?: number): boolean => {
    const regex = new RegExp("^([a-zA-Z0-9!-/:-@¥[-`{-~]{" + (min ? min : 8) + "," + (max ? max : "") + "})$")
    return regex.test(str)
}