import { useEffect, useState } from "react"
import { decryptObject, encryptObject } from "./useEncryption"

const storageKey = "SIMPLE-NOTE-TAKING-APP"

export function useLocalStorage<T>(initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(storageKey)
        if (jsonValue == null) {
            if (initialValue instanceof Function) {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return decryptObject<T>(jsonValue)
        }
    })
    useEffect(() => {
        const encryptedData = encryptObject(value)
        localStorage.setItem(storageKey, encryptedData)
    }, [value, storageKey])
    return [value, setValue] as [T, typeof setValue]
}