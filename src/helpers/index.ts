export const toCapitalized = (string: string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`

export const getRandomKey = () => `${Math.random()}`.replace('.', '')

export const replaceNewLineChars = (string: string) => string.replaceAll(/[\n\f]/gim, ' ')
