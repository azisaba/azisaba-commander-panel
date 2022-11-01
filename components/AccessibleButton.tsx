import React from "react"
import styles from "../styles/FlexibleInput.module.scss"
import Link from "next/link";

type ButtonProps = {
    href: string
    value: string
    color?: string
}

type ButtonState = {
    style: React.CSSProperties
}

export class AccessibleButton extends React.Component<ButtonProps, ButtonState> {

    constructor(props: ButtonProps) {
        super(props)

        const style: React.CSSProperties = this.props.color == undefined ? {} : {
            backgroundColor: this.props.color
        }
        //  state
        this.state = {
            style: style
        }
    }

    render() {
        return (
            <Link href={this.props.href} >
                <a className={styles.flexible_input} style={this.state.style} >
                    {this.props.value}
                </a>
            </Link>
        )
    }
}