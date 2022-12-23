import jwt from 'jsonwebtoken'

export const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1y' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' })

    return { status: true, token, refreshToken }

  } catch (error) {
    console.log(error)
    return { status: false, message: 'Token generation failed' }
  }
}

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, secret, (err, user) => {

        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({ status: false, isExpired: true, message: 'Bad token' })
          } else {
            reject({ status: false, isExpired: false, message: 'Bad token' })
          }
        }
        // console.log(err)
        resolve({ status: true, token, user })
      })
    } catch (error) {
      reject({ status: false, isExpired: false, message: 'Bad token' })
    }
  })
}

export const parseJwtPayload = (token) => {
  var base64Url = token.split('.')[1]

  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}