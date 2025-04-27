import { useEffect, useState } from 'react'

import * as LocalAuthentication from 'expo-local-authentication'

import { Assets } from '~/core/constants'

interface AuthenticationProps {
  callBack: () => void
}

type Compatible = 'compatible' | 'not_compatible' | 'initiate'

type Authentication = {
  compatible: Compatible
  enroll: boolean
  asset: Assets
  checkAuthentication: () => void
}

const useAuthentication = ({ callBack }: AuthenticationProps): Authentication => {
  const [asset, setAsset] = useState<Assets>(1)
  const [compatible, setCompatible] = useState<Compatible>('initiate')
  const [enroll, setEnroll] = useState<boolean>(false)

  useEffect(() => {
    checkAuthentication()
  }, [])

  async function checkAuthentication() {
    const isEnroll = await LocalAuthentication.isEnrolledAsync()
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()

    setCompatible(types.length ? 'compatible' : 'not_compatible')
    setEnroll(isEnroll)
    if (isEnroll && types.length) {
      setAsset(types[0])
      const result = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: true,
        biometricsSecurityLevel: 'strong',
      })
      if (result.success) {
        callBack()
      }
    }
  }

  return {
    compatible,
    enroll,
    asset,
    checkAuthentication,
  }
}

export default useAuthentication
