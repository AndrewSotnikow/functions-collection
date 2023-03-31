import React, { ReactElement } from 'react'
import '../StepContainer/StepContainer.scss'
import Checkbox from '../../Checkbox/Checkbox'
import { useAppSelector } from '../../redux/hooks'

export interface IInvoiceStepContainerProps {
    isLoggedIn?: boolean
    children: React.ReactChild
    visible: boolean
    toggleEdit?: (editMode: boolean) => void
    editMode?: boolean
    setInvoice: (invoice: boolean) => void
}

const InvoiceStepContainer = ({
    children,
    visible,
    toggleEdit,
    editMode,
    setInvoice,
}: IInvoiceStepContainerProps): ReactElement => {
    const invoice = useAppSelector((state) => state.user.withInvoice)

    return (
        <div className="c-stepContainer -mb8" data-testid="stepContainer">
            <div
                className={`c-stepContainer_title d-flex justify-content-between ${
                    visible ? '-border -pb24 -pb16md' : ''
                }`}
            >
                <div
                    className={`c-toggle d-flex justify-content-between align-items-center ${
                        visible ? '-opened' : ''
                    }`}
                >
                    <Checkbox
                        id="invoice"
                        label=""
                        checked={invoice}
                        isValid={true}
                        setValue={() => setInvoice(!invoice)}
                    />
                    <label
                        htmlFor="invoice"
                        className="c-invoice_text -f16 -wBold -cBlack"
                    >
                        Chcę otrzymać fakturę za tę transakcję
                    </label>
                </div>
                {!editMode && toggleEdit && (
                    <div className="c-stepContainer_signIn -logged d-none d-lg-flex align-items-center">
                        <button onClick={() => toggleEdit(!editMode)}>
                            Zmień
                        </button>
                    </div>
                )}
            </div>
            {!editMode && toggleEdit && (
                <div className="c-stepContainer_signIn -mt16md d-flex d-lg-none justify-content-center align-items-center">
                    <button onClick={() => toggleEdit(!editMode)}>Zmień</button>
                </div>
            )}
            {visible && (
                <div className="c-stepContainer_content -pt24">{children}</div>
            )}
        </div>
    )
}

export default InvoiceStepContainer
