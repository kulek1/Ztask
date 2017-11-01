const state = {
  isSettings: false,
  isSound: true,
  isLoading: false,
  user: {
    fullName: '',
    profession: ''
  },
  isError: false,
  errorFeedback: null,
  errorTypes: {
    serverError: 'Internal Server Error',
    connectionError: 'Server is shutdown',
    loginError: 'Incorrect username or password'
  }
}

export default state
