import React, { ReactElement, useState } from 'react'
import './StepContainer.scss'
import Button from '../../../Button/Button'
import LogInPopup from '../../../LogInPopup/LogInPopup'
import Modal from '../../../Modal/Modal'
import ConfirmationToast, {
  IConfirmationToastProps,
} from '../../../ConfirmationToast/ConfirmationToast'
import { isTabletRes } from '../../../../helpers/helpers'

export interface IStepContainerProps {
  title: string
  step: number
  loginBtn?: boolean
  children: React.ReactChild
  visible: boolean
  toggleEdit?: (editMode: boolean) => void
  editMode?: boolean
}

const StepContainer = ({
  title,
  step,
  loginBtn,
  children,
  visible,
  toggleEdit,
  editMode,
}: IStepContainerProps): ReactElement => {
  const [loginOpened, setLoginOpened] = useState<boolean>(false)
  const [toast, setToast] = useState<IConfirmationToastProps>({
    toastContent: '',
    toastIcon: 'envelope',
  })

  const loginButton = () => {
    return (
      <>
        <span className='icon-sign-in -s16 -cPumpkin'></span>
        <span className='t-text -cCinder -f14 -wNormal'>Masz kik Konto?</span>
        <Button css='-f14' type='link' onClick={() => setLoginOpened(true)}>
          Zaloguj się
        </Button>
      </>
    )
  }

  const handleToggleModal = () => {
    setLoginOpened(!loginOpened)
  }

  return (
    <div className='c-stepContainer -mb8' data-testid='StepContainer'>
      <div
        className={`c-stepContainer_title d-flex justify-content-between align-items-center ${
          visible ? '-border -pb24 -pb16md' : ''
        }`}
      >
        <div
          className={`c-toggle d-flex justify-content-between ${
            visible ? '-opened' : ''
          }`}
        >
          <div className='d-flex align-items-center'>
            <p className='c-stepContainer_itemsNumber t-text -wBold -cWhite -f14'>
              {step}
            </p>
            <span className='t-text -wBold -cCinder -f20 -f18md'>{title}</span>
          </div>
        </div>

        <div
          className={`c-stepContainer_signIn ${
            !loginBtn ? '-logged ' : ''
          } d-lg-flex align-items-center`}
        >
          <div className='d-none d-lg-block'>
            {!isTabletRes() && loginBtn && loginButton()}
          </div>
          {!editMode && toggleEdit && (
            <button onClick={() => toggleEdit(!editMode)}>Zmień</button>
          )}
        </div>
      </div>
      {toast.toastContent.length ? (
        <ConfirmationToast
          toastContent={toast.toastContent}
          toastIcon={toast.toastIcon}
          onClose={() => {
            const nextToast = Object.assign({}, toast, {
              toastContent: '',
            })
            setToast(nextToast)
          }}
        />
      ) : null}

      {loginBtn && (
        <div className='c-stepContainer_signIn -mt16md d-flex d-lg-none justify-content-center align-items-center'>
          {loginButton()}
        </div>
      )}

      {((visible && step !== 1) || step === 1) && (
        <div className='c-stepContainer_content -pt24'>{children}</div>
      )}

      {loginBtn && (
        <Modal opened={loginOpened} onClose={handleToggleModal}>
          <LogInPopup
            onSuccessLogin={() => handleToggleModal()}
            onSuccessReset={(message) => {
              handleToggleModal()
              setToast({
                toastContent: message,
                toastIcon: 'envelope',
              })
            }}
            onClose={handleToggleModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default StepContainer
