import React, { ReactElement } from 'react'
import { Field, Form, Formik } from 'formik'
import Button from '../../../Button/Button'
import { setAddressData } from '../../../redux/user-slice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Quote from '../../../components/Quote/Quote'
import { Address } from '../../../redux/api-slice/types'
import TextField from '../utils/TextField'
import TextareaField from '../utils/TextareaField'
import PostCodeField from '../utils/PostCodeField'
import { updateDeliveryPriceFromPostCode } from '../../../../creator/redux/user-slice'
import HoursSelection from './HoursSelection'
import { isTabletRes } from '../../../../helpers/helpers'

interface IAddressFormProps {
  onSubmit: () => void
}

const AddressForm = ({ onSubmit }: IAddressFormProps): ReactElement => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user.addressData)
  const deliveryPrice = useAppSelector(
    (state) => state.user.deliveryPriceFromPostCode
  )

  const submitAddress = (values: Address) => {
    dispatch(setAddressData(values))
    onSubmit()
  }

  const initialFormValues: Address = {
    postalCode: userData?.postalCode || '',
    city: userData?.city || '',
    street: userData?.street || '',
    buildingNumber: userData?.buildingNumber || '',
    information: userData?.information || '',
    flatNumber: userData?.flatNumber || '',
    entrance: userData?.entrance || '',
    floor: userData?.floor || '',
    deliveryHour: userData.deliveryHour || '8:00',
    staircaseCode: userData?.staircaseCode || '',
  }

  const handleDeliveryPriceValidation = (nextDeliveryPrice: number | null) => {
    dispatch(updateDeliveryPriceFromPostCode(nextDeliveryPrice || 0))
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <Formik
        initialValues={initialFormValues}
        onSubmit={submitAddress}
        enableReinitialize
        isInitialValid={!!initialFormValues.postalCode}
      >
        {({ isValid, errors, touched }) => (
          <Form className='c-form d-flex flex-column -mr20 -mr0md'>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex flex-column flex-lg-row justify-content-lg-between`}
            >
              <div className='c-form_group -postalCode d-flex flex-column -mr16 -mr0md'>
                <PostCodeField
                  id='postalCode'
                  label='Kod pocztowy'
                  isDeliveryValidation
                  onDeliveryValidation={(nextDeliveryPrice) => {
                    handleDeliveryPriceValidation(nextDeliveryPrice)
                  }}
                />
              </div>

              <div className='c-form_group -city d-flex flex-column -mt24md -fullWidth'>
                <TextField
                  id='city'
                  label='Miasto'
                  placeholder='np. Warszawa'
                  error={errors.city}
                  touched={touched.city || false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex -fullWidth -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextField
                  id='street'
                  label='Ulica'
                  placeholder='np. Kolejowa'
                  error={errors.street}
                  touched={touched.street || false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex flex-column flex-lg-row -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextField
                  id='buildingNumber'
                  label='Numer domu'
                  placeholder='np. 3A'
                  error={errors.buildingNumber}
                  touched={touched.buildingNumber || false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex flex-column flex-lg-row -mt24`}
            >
              <div className='c-form_group d-flex flex-column -mt24md -fullWidth'>
                <TextField
                  id='flatNumber'
                  label='Numer lokalu'
                  placeholder='np. 8'
                  required={false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex -fullWidth -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextField
                  id='entrance'
                  label='Klatka'
                  placeholder='np. A'
                  required={false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex -fullWidth -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextField
                  id='staircaseCode'
                  label='Kod do klatki'
                  placeholder='np. 1234'
                  required={false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex -fullWidth -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextField
                  id='floor'
                  label='Piętro'
                  placeholder='1'
                  required={false}
                />
              </div>
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex flex-column -fullWidth -mt24`}
            >
              <Field component={HoursSelection} name='deliveryHour' />
            </div>
            <div
              className={`c-form_row ${
                !isTabletRes() && !!deliveryPrice && '-address'
              } d-flex -fullWidth -mt24`}
            >
              <div className='c-form_group d-flex flex-column -fullWidth'>
                <TextareaField
                  id='information'
                  label='Dodatkowe informacje'
                  placeholder='Dane, które pomogą dostawcy, np. numer piętra'
                  required={false}
                  max={500}
                />
              </div>
            </div>
            {!!deliveryPrice && (
              <div className='-mt24md d-block d-lg-none'>
                <Quote
                  name='Filip'
                  image='/build/images/mapPage/avatar.jpg'
                  position='Manager ds. Cateringu'
                  department='catering'
                  text={
                    <>
                      Ten adres znajduje się poza darmową strefą dostaw.
                      Zostanie naliczona opłata w wysokości{' '}
                      <span className='-wBold'>{deliveryPrice}zł</span>
                      <span> </span>
                      za dzień.
                    </>
                  }
                />
              </div>
            )}

            <div className='c-form_row'>
              <Button
                type='submit'
                layout='primary'
                css='c-stepContainer_button -mt32 -mt24md'
                disabled={!isValid}
              >
                Kontynuuj
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {!!deliveryPrice && (
        <div className='-mt122 -mt24md d-none d-lg-block'>
          <Quote
            name='Filip'
            image='/build/images/mapPage/avatar.jpg'
            position='Manager ds. Cateringu'
            department='catering'
            text={
              <>
                Ten adres znajduje się poza darmową strefą dostaw. Zostanie
                naliczona opłata w wysokości
                <span> </span>
                <span className='-wBold'>{deliveryPrice}zł</span>
                <span> </span>
                za dzień.
              </>
            }
          />
        </div>
      )}
    </div>
  )
}

export default AddressForm
