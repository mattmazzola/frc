import * as React from 'react'
import './Toggle.css'

interface Props {
    render: (onClick: () => void) => React.ReactNode
}

interface State {
    isOpen: boolean
}

const initialState = {
    isOpen: false
}

class Toggle extends React.Component<Props, State> {
    state = initialState
    onClickToggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render(): any {
        return (
            <div>
                <div>{this.props.render(this.onClickToggle)}</div>
                {this.state.isOpen && <div>
                    {this.props.children}
                </div>}
            </div>
        );
    }
}

export default Toggle;
