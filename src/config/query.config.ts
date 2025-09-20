import { APIBaseResponse, IValidationError } from '@/interfaces/api.interface'
import { IApiError } from '@/interfaces/error.interface'
import { renderErr } from '@/utils/error.util'
import { isServer, QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

let browserQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: data => {
        const res = data as APIBaseResponse

        if ('error' in res && res.error !== null) {
          const resErr = res as IApiError
          if (resErr.error.message.includes('Validation error'))
            return toast.error((resErr.error.data as IValidationError[])[0].message ?? '')

          return toast.error(renderErr(resErr.error.message))
        }

        if (typeof res?.data === 'string') {
          return res
        }

        if (!res.status) {
          return toast.error(renderErr(res.message))
        }
      },
    },
    queries: {
      select: data => {
        const res = data as APIBaseResponse

        if (typeof res === 'string') return res
        if (typeof res === 'object' && res?.status === undefined) return res
        if (!res?.status) return undefined
        return res
      },
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })
}

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
