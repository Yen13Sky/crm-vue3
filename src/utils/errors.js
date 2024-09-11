const ERROR = {
  INVALID_LOGIN_CREDENTIALS: 'Неправильный пароль или E-mail',
  auth: 'Пожалуйста авторизуйтесь в системе!'

}
export function error (code) {
  return ERROR[code] ? ERROR[code] : 'Неизвестная ошибка'
}
