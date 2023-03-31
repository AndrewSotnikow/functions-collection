import Checkbox from '../Checkbox/Checkbox'
import React, { ReactElement, useState } from 'react'

import './CheckboxGroup.scss'

export interface ICheckboxOption {
    id: string
    text: string
    price: number
}

export interface ICheckboxGroupProps {
    id: string
    options: ICheckboxOption[]
    title: string
    value: string[]
    setValue: (id: string) => void
}

const CheckboxGroup = ({
    id,
    options,
    title,
    value,
    setValue,
}: ICheckboxGroupProps): ReactElement => {
    const groupId = id
    const checkboxValue = (checkboxId: string) => {
        return value.includes(checkboxId)
    }

    const [collapsed, setCollapsed] = useState(true)
    const active = value.length > 0

    return (
        <div
            className={`c-checkboxGroup ${collapsed ? '-collapsed' : ''}`}
            data-testid="checkboxGroup"
        >
            <div
                className="c-checkboxGroup_title"
                onClick={() => setCollapsed(!collapsed)}
            >
                <h3
                    className={`t-title -f14 -wNormal ${
                        active || !collapsed ? '-cDark' : '-cGrey'
                    }`}
                >
                    {title}
                </h3>
                {active && (
                    <div className="c-checkboxGroup_count">{value.length}</div>
                )}
                <span className="icon-dropdown -s24"></span>
            </div>
            <div className="c-checkboxGroup_content">
                <div className="c-checkboxGroup_inner -dt16">
                    {options.map(({ id, text, price }) => {
                        return (
                            <div className="c-checkboxOption d-flex" key={text}>
                                <Checkbox
                                    id={`${groupId}-${id}`}
                                    label={text}
                                    price={price}
                                    checked={checkboxValue(id)}
                                    setValue={() => setValue(id)}
                                ></Checkbox>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CheckboxGroup
