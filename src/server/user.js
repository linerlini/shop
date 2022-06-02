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
export async function requestAutoLogin() {
  const result = await serve.get('/user/auto')
  return result.data
}
export async function requestAddressList() {
  const result = await serve.get('/user/address/list')
  return result.data
}
export async function requestEditAddress(addressData, actionType, addressId) {
  const result = await serve.post('/user/address/edit', {
    actionType,
    addressData,
    addressId,
  })
  return result.data
}
export async function requestDeleteAddress(id) {
  const result = await serve.get('/user/address/delete', {
    params: {
      id,
    },
  })
  return result.data
}

export async function requestAddCoupon(id) {
  const result = await serve.get('/user/coupon/add', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestEditProfile(data) {
  const result = await serve.post('/user/edit', data)
  return result.data
}
