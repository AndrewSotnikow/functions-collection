import './SummaryForm.scss'
import React, { ReactElement, useEffect, useState } from 'react'
import StepContainer from './StepContainer/StepContainer'

import PersonalDataForm from './sections/PersonalData'
import AddressForm from './sections/Address'
import PaymentForm from './sections/PaymentForm'
import InvoiceForm from './sections/Invoice'
import 'react-phone-input-2/lib/style.css'
import { useIsLoggedIn } from './../hooks/useIsLoggedIn'
import {
  useGetOrderDeliveryPriceByPostCodeAndCartIdQuery,
  useGetUserDetailsQuery,
} from '../../redux/api-slice/hooks'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  setPersonalData,
  setAddressData,
  setInvoice,
  setPaymentMethod,
} from '../../redux/user-slice'
import InvoiceStepContainer from '../InvoiceStepContainer/InvoiceStepContainer'
import { updateDeliveryPriceFromPostCode } from '../../../creator/redux/user-slice'
import { isTabletRes } from '../../../helpers/helpers'

const REQUIRED_ADDRESS_DATA_KEYS = [
  'postalCode',
  'city',
  'street',
  'buildingNumber',
] as const

const REQUIRED_INVOICE_DATA_KEYS = [
  'city',
  'companyName',
  'nip',
  'postalCode',
  'street',
] as const

const SummaryForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const [personalDetailsInEditMode, setPersonalDetailsInEditMode] =
    useState(true)
  const [addressInEditMode, setAddressInEditMode] = useState(true)
  const [invoiceInEditMode, setInvoiceInEditMode] = useState(true)

  const isLoggedIn = useIsLoggedIn()
  const addressData = useAppSelector((state) => state.user.addressData)
  const personalData = useAppSelector((state) => state.user.personalData)
  const invoiceData = useAppSelector((state) => state.user.invoiceData)
  const invoice = useAppSelector((state) => state.user.withInvoice)
  const cartId = useAppSelector((state) => state.cart.cartId)
  const totalPrice = useAppSelector((state) => state.cart.data?.totalPrice)

  const { firstName, lastName, email, phone } = personalData

  const {
    postalCode,
    city,
    street,
    buildingNumber,
    information,
    flatNumber,
    entrance,
    floor,
    deliveryHour,
    staircaseCode,
  } = addressData

  const { data: userData, isSuccess: isUserDataLoaded } =
    useGetUserDetailsQuery(undefined, { skip: !isLoggedIn })

  const { data: deliveryData, isSuccess: isDeliveryDataLoaded } =
    useGetOrderDeliveryPriceByPostCodeAndCartIdQuery(
      {
        postCode: postalCode as string,
        cartId: cartId || '',
      },
      {
        skip: !postalCode || !cartId,
      }
    )

  useEffect(() => {
    dispatch(updateDeliveryPriceFromPostCode(deliveryData?.price || 0))
  }, [isDeliveryDataLoaded])

  useEffect(() => {
    if (!isUserDataLoaded || !userData?.details) {
      return
    }

    dispatch(setPersonalData(userData.details))

    if (!userData?.deliveryAddress) {
      return
    }

    dispatch(setAddressData(userData.deliveryAddress))
  }, [isUserDataLoaded])

  const handleFirstStep = () => {
    setPersonalDetailsInEditMode(false)
  }

  const handleSecondStep = () => {
    setAddressInEditMode(false)
  }

  const handleInvoiceStep = () => {
    setInvoiceInEditMode(false)
  }

  const handleSetInvoice = (withInvoice: boolean) => {
    dispatch(setInvoice(withInvoice))
  }

  const isPersonalDataFilled = Object.values(personalData || {}).every(
    (item) => item !== ''
  )

  const isAddressDataFilled = REQUIRED_ADDRESS_DATA_KEYS.every(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (addressKey) => addressData![addressKey] !== ''
  )

  const isInvoiceDataFilled = REQUIRED_INVOICE_DATA_KEYS.every(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (invoiceKey) => invoiceData![invoiceKey] !== ''
  )

  useEffect(() => {
    if (isLoggedIn && isPersonalDataFilled) handleFirstStep()
  }, [isPersonalDataFilled])

  useEffect(() => {
    if (isLoggedIn && isAddressDataFilled) handleSecondStep()
  }, [isAddressDataFilled])

  useEffect(() => {
    if (isLoggedIn && isInvoiceDataFilled) handleInvoiceStep()
  }, [isInvoiceDataFilled])

  // gdy koszyk zostanie przeładowany np popranwy kupon
  useEffect(() => {
    if (totalPrice === undefined) return

    if (totalPrice === 0) {
      dispatch(setPaymentMethod('coupon'))
    } else {
      dispatch(setPaymentMethod('payu'))
    }
  }, [totalPrice])

  return (
    <section className='c-summaryForm' data-testid='SummaryForm'>
      <StepContainer
        step={1}
        title='Dane Osobowe'
        loginBtn={!isLoggedIn}
        visible={true}
      >
        {!personalDetailsInEditMode ? (
          <div className='c-stepContainer_content'>
            <div className='t-text -f16 -cCinder -wNormal -dt8'>
              <p>
                {firstName} {lastName}
              </p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>
        ) : (
          <PersonalDataForm onSubmit={handleFirstStep} />
        )}
      </StepContainer>
      <StepContainer
        step={2}
        title='Adres Dostawy'
        visible={isPersonalDataFilled}
        toggleEdit={setAddressInEditMode}
        editMode={addressInEditMode}
      >
        {!addressInEditMode ? (
          <div className='c-stepContainer_content'>
            <div className='t-text -f16 -cCinder -wNormal -dt8'>
              <p>
                ul. {street} {buildingNumber}
                {flatNumber && `/${flatNumber}`}
              </p>
              <p>
                {postalCode} {city}
              </p>
            </div>
            <div className='t-text -f16 -cCinder -wNormal -mt24 -dt8'>
              <p>
                {entrance && `klatka ${entrance}`}
                {entrance && floor && ', '}
                {floor && `${floor} piętro`}
              </p>
            </div>
            <div className='t-text -f16 -cGrey -wNormal -mt24 -dt8'>
              {deliveryHour && <p>Godzina dostawy: {deliveryHour}</p>}
              {staircaseCode && <p>{staircaseCode}</p>}
              {information && <p>{information}</p>}
            </div>
          </div>
        ) : (
          <AddressForm onSubmit={handleSecondStep} />
        )}
      </StepContainer>
      {isPersonalDataFilled && (
        <InvoiceStepContainer
          visible={invoice}
          toggleEdit={setInvoiceInEditMode}
          editMode={invoiceInEditMode}
          setInvoice={handleSetInvoice}
        >
          {!invoiceInEditMode ? (
            <div className='c-stepContainer_content'>
              <p className='t-text -f16 -cCinder -wNormal -mt8'>
                {invoiceData?.companyName}
              </p>
              <p className='t-text -f16 -cCinder -wNormal -mt8'>
                NIP: {invoiceData?.nip}
              </p>
              {invoiceData?.regon && (
                <p className='t-text -f16 -cCinder -wNormal -mt8'>
                  REGON: {invoiceData?.regon}
                </p>
              )}
              <p className='t-text -f16 -cCinder -wNormal -mt8'>
                {invoiceData?.street}{' '}
              </p>
              <p className='t-text -f16 -cCinder -wNormal -mt8'>
                {invoiceData?.postalCode} {invoiceData?.city}
              </p>
              {invoiceData?.email && (
                <p className='t-text -f16 -cCinder -wNormal -mt8'>
                  {invoiceData?.email}
                </p>
              )}
              {invoiceData?.phoneNumber && (
                <p className='t-text -f16 -cCinder -wNormal -mt8'>
                  {invoiceData?.phoneNumber}
                </p>
              )}
            </div>
          ) : (
            <InvoiceForm onSubmit={handleInvoiceStep} />
          )}
        </InvoiceStepContainer>
      )}
      <div className='d-block d-lg-none'>
        {isTabletRes() && (
          <StepContainer
            step={3}
            title='Akceptuję regulamin i płacę'
            visible={
              isPersonalDataFilled &&
              isAddressDataFilled &&
              !addressInEditMode &&
              ((invoice && isInvoiceDataFilled && !invoiceInEditMode) ||
                !invoice)
            }
          >
            <PaymentForm />
          </StepContainer>
        )}
      </div>
    </section>
  )
}

export default SummaryForm
