import React, { ReactElement } from 'react'
import Label from '../../Label/Label'
import RadioGroup from '../../RadioGroup/RadioGroup'
import { FieldProps } from 'formik'

const HoursSelection = ({ form }: FieldProps): ReactElement => {
    const { setFieldValue } = form
    const handleSetHours = (option: string) => {
        setFieldValue('deliveryHour', option)
    }
    const hourOptions = ['8:00', '7:00', '6:00']

    return (
        <div className="c-hoursSelection" id="HoursSelection">
            <p className="t-text -f12 -wNormal -cCinder -mb8">
                Wybierz godzinę dostawy
            </p>
            <RadioGroup>
                <>
                    {hourOptions.map((option) => {
                        return (
                            <Label
                                key={option}
                                text={`Do ${option} rano`}
                                name={option}
                                id={option}
                                checked={form.values.deliveryHour === option}
                                onChange={() => handleSetHours(option)}
                            />
                        )
                    })}
                </>
            </RadioGroup>
        </div>
    )
}

export default HoursSelection
