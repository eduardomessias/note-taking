import cryptoJS from "crypto-js"

const encryptionKey = "SIMPLE-NOTE-TAKING-APP-SECRET-KEY"

export function encryptObject<T>(data: T) {
    const encryptedData = cryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey)
    return encryptedData.toString()
}

export function decryptObject<T>(data: any) {
    const decryptedData = cryptoJS.AES.decrypt(data, encryptionKey)
    return JSON.parse(decryptedData.toString(cryptoJS.enc.Utf8)) as T
}