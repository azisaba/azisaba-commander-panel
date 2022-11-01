import React from "react"
import styles from "../styles/FlexibleInput.module.scss"

type ButtonProps = {
    onClick: () => void
    value: string
    color?: string
}

type ButtonState = {
    style: React.CSSProperties
}

export class ClickableButton extends React.Component<ButtonProps, ButtonState> {

    constructor(props: ButtonProps) {
        super(props)

        //  handler
        this.handlerClick = this.handlerClick.bind(this)

        const style: React.CSSProperties = this.props.color == undefined ? {} : {
            backgroundColor: this.props.color
        }
        //  state
        this.state = {
            style: style
        }
    }

    handlerClick()
    {
        this.props.onClick()
    }

    render() {
        return (
            <input type="button" value={this.props.value} className={styles.flexible_input} style={this.state.style} />
        )
    }
}