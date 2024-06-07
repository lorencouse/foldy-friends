import React from 'react'
import Account from '../src/pages/Account'
// import { useAuth } from '../src/context/AuthContex'
import SignIn from '../src/pages/SignIn'


const AccountPage = () => {
  //  const session = useAuth()

  return (
    <SignIn />
    // <Account key={ session.user } session={session} />
  )
}

export default AccountPage;
