const BASE_URL = 'http://localhost:8000/'

// Sign up URLs
export const SIGNUP_URL = BASE_URL + 'user/signup'
export const EMAIL_VERIFY_URL = BASE_URL + 'user/email-verify'
export const SIGNUP_USER_PROFILE_URL = BASE_URL + 'user/profile/create'
export const SIGNUP_USER_ACADEMIC_URL = BASE_URL + 'user/profile/academic'
export const SIGNUP_USER_COMPANY_URL = BASE_URL + 'user/profile/company'


// Login URLs
export const LOGIN_URL = BASE_URL + 'user/login'

// Reset Password URLs
export const REQUEST_EMAIL_RESET_URL = BASE_URL + 'user/request-reset-email'
export const PASSWORD_RESET_URL = BASE_URL + 'user/password-reset'
export const PASSWORD_RESET_COMPELETE_URL = BASE_URL + 'user/password-reset-complete'
