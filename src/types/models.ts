export interface IMovement {
    name: string
}

export interface ISelectableMovements {
    carsLowerBody: ISelectableMovement[]
    carsUpperBody: ISelectableMovement[]
    spinalMovements: ISelectableMovement[]
    pailsLowerBody: ISelectableMovement[]
    pailsUpperBody: ISelectableMovement[]
}

export interface ISelectableMovement {
    movement: IMovement
    checked: boolean
}

