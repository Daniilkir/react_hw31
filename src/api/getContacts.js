export const getContactsApi = async () => {
    const res = await fetch("https://684ef978f0c9c9848d29bc2c.mockapi.io/contacts")
    const data = await res.json()
    return data
}

