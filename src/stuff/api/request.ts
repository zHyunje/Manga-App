import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import api from './conn'

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.message)
    } else {
      console.error('Erro inesperado:', error)
    }
    throw error
  }
}

export default request
