export const load = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        
        return JSON.parse(serializedState)
    } catch (error) {
        console.warn(`Error during local strage load: `, error)
        return undefined
    }
}

export const save = (state: object) => {
    try {
        const serializedState = JSON.stringify(state, null, '  ')
        localStorage.setItem('state', serializedState)
    } catch (error) {
        console.warn(`Error during local storage save: `, error)
    }
}