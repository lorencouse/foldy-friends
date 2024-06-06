import React from 'react'
import Account from '../src/pages/Account'
import { useAuth } from '../src/context/AuthContex'

const AccountPage = () => {
   const session = useAuth()

  return (
    <Account key={ session.user } session={session} />
  )
}

export default AccountPage;
