import serve from '.'

export async function requestLogin(account, password) {
  const result = await serve.post('/user/login', {
    account,
    password,
  })
  return result.data
}
export async function requestRegister(account, password, userName) {
  const result = await serve.post('/user/register', {
    account,
    password,
    userName,
  })
  return result.data
}
