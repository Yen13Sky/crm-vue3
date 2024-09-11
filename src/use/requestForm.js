import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm (fn) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      reqStatus: 'process'

    }
  })
  const { value: name, errorMessage: errorName, handleBlur: blurName } = useField(
    'name',
    yup.string().trim().required('Укажите ФИО заказчика!')
  )
  const { value: phone, errorMessage: errorPhone, handleBlur: blurPhone } = useField(
    'phone',
    yup.string().trim().required('Укажите номер телефона заказчика!')
  )
  const { value: req, errorMessage: errorReq, handleBlur: blurReq } = useField(
    'req',
    yup.string().trim().required('Укажите название заявки!')
  )
  const { value: textReq, errorMessage: errorTextReq, handleBlur: blurTextReq } = useField(
    'textReq',
    yup.string().trim()
  )
  const { value: reqSum, errorMessage: errorReqSum, handleBlur: blurReqSum } = useField(
    'reqSum',
    yup.number().required('Укажите стоимость!').min(0, 'Сумма заказа не может быть менее 0!')
  )
  const { value: reqStatus, errorMessage: errorReqStatus, handleBlur: blurReqStatus } = useField(
    'reqStatus',
    yup.string().trim().required('Необходимо указать статус заявки!'))

  const onSubmit = handleSubmit(fn)

  return {
    name,
    phone,
    req,
    textReq,
    reqSum,
    reqStatus,
    errorName,
    errorPhone,
    errorReq,
    errorTextReq,
    errorReqSum,
    errorReqStatus,
    blurName,
    blurPhone,
    blurReq,
    blurTextReq,
    blurReqSum,
    blurReqStatus,
    onSubmit,
    isSubmitting

  }
}
