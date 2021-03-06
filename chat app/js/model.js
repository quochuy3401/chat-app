const model = {}
model.currentUser = undefined
model.register = async (data) => {
  try {
   await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    firebase.auth().currentUser.updateProfile({
      displayName: data.firstName + ' ' + data.lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check you email!')
    view.setActiveScreen('loginScreen')
  } catch(err) {
    console.log(err)
    if(err.message==='The email address is already in use by another account.'){
        document.getElementById('email-error').innerText='*The email address is already in use by another account.'
    }
    if(err.message==='Password should be at least 6 characters'){
        document.getElementById('password-error').innerText='*Password should be at least 6 characters'
    }
    //alert(err.message)
  }
 
  // .then((res) => {
  //   firebase.auth().currentUser.updateProfile({
  //     displayName: data.firstName + ' ' + data.lastName
  //   })
  //   firebase.auth().currentUser.sendEmailVerification()
  // }).catch((err) => {
  //   console.log(err)
  // })
}
model.login = async (dataLogin) => {
  try {
    const response = await firebase.auth()
    .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
    console.log(response)
    if(response.user.emailVerified === false) {
      alert('Please verify your email!')
    } else {
      model.currentUser = {
        displayName: response.user.displayName,
        email: response.user.email
      }
      view.setActiveScreen('chatScreen')
    }
  } catch(err) {
    console.log(err)
    if(err.code==='auth/wrong-password'){
        document.getElementById('password-error').innerText='The password is invalid or the user does not have a password.'
    }
    if(err.code==='auth/user-not-found'){
        document.getElementById('email-error').innerText='There is no user record corresponding to this identifier. The user may have been deleted.'
    }
  }
}