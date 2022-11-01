import React from "react"
import styles from "../styles/SingleLineInput.module.scss"

type InputProps = {
    type: string
    value: string
    onChange: (value: string) => void
    blind?: boolean
    message?: React.ReactNode
}

export class SingleLineInput extends React.Component<InputProps, any> {

    constructor(props: InputProps) {
        super(props)

        this.handlerInputChange = this.handlerInputChange.bind(this)
    }

    handlerInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(event.currentTarget.value)
    }

    render() {
        return (
            <div className={styles.single_line_input}>
                <label htmlFor={`${this.props.type}_input_field`} className={styles.input_label}>{this.props.type}</label>
                {this.props.message &&
                    <div className={styles.status_message}>
                        {this.props.message}
                    </div>
                }

                <input type={this.props.blind ? "password" : "text"} name={`${this.props.type}_input_field`}
                       id={`${this.props.type}_input_field`} className={styles.input_field} ref={this.props.value}
                       onChange={this.handlerInputChange}/>
            </div>
        )
    }
}