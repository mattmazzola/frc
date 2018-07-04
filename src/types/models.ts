export interface IMovement {
    name: string
    imgUrl?: string
}

export interface ISelectableMovement {
    id: string
    movement: IMovement
    checked: boolean
}
