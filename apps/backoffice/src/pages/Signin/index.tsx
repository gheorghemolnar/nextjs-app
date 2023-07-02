import React from 'react'

import { LoginForm } from "@backoffice/components/forms";


export default function Signin() {
    return (
        <div className="container flex items-center justify-center w-1/2 h-2/3 bg-gray-50">
            <LoginForm className='w-full'/>
        </div>
  )
}

