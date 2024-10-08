import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { SignSection } from './style'

// components
import Button from '../../components/button'

// icons
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoEye, IoEyeOff } from 'react-icons/io5'

// images
import Background from '../../stuff/images/background.png'
import { Link } from 'react-router-dom'
import request from '../../stuff/api/request'

type SignInRequest = {
  username: string
  password: string
}

type SignInResponse = {
  token: string // O token que você receberá
  // Outros campos que a resposta possa ter, se necessário
}

const SignIn = () => {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // useEffect(() => {
  //   if (email || password) {
  //     console.log(email, '|', password)
  //   }
  // }, [email, password])

  const handleForm = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (username && password) {
        const res = await request<SignInResponse>({
          method: 'POST',
          url: '/sign-in',
          data: {
            username,
            password,
          } as SignInRequest,
        })

        if (res.token) {
          localStorage.setItem('@token', res.token)
          setTimeout(() => {
            window.location.href = '/'
          }, 3000)
        }
      } else {
        console.log('error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SignSection>
      <div className="backdrop"></div>
      <img className="bg" src={`${Background}`} alt="" />

      <div className="content">
        <form onSubmit={handleForm}>
          <div className="top">
            <Button
              iconProps={{ icon: IoIosArrowRoundBack, size: 40 }}
              classes={'no-bg no-padding'}
              href={'/'}
              type={'button'}
            />
            <div className="title">
              Bem vindo ao{' '}
              <span>
                Arti<span>fy</span>
              </span>
            </div>
          </div>

          <div className="middle">
            <div className="input-box">
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  event.currentTarget.value.length > 0
                    ? event.currentTarget.classList.add('active')
                    : event.currentTarget.classList.remove('active')

                  setUsername(event.currentTarget.value)
                }}
              />
              <label htmlFor="email">Usuário</label>
            </div>

            <div className="input-box">
              <input
                type={showPass ? 'text' : 'password'}
                name="pass"
                id="pass"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  event.currentTarget.value.length > 0
                    ? event.currentTarget.classList.add('active')
                    : event.currentTarget.classList.remove('active')

                  setPassword(event.currentTarget.value)
                }}
              />
              <label htmlFor="pass">Senha</label>

              <div className="see-pass" onClick={() => setShowPass(!showPass)}>
                {!showPass && <IoEye className="icon" />}
                {showPass && <IoEyeOff className="icon" />}
              </div>
            </div>

            <Button
              text={'Entrar'}
              classes="default py-lg font-md bold w-full my-lg"
              textCenter={true}
              type={'submit'}
            />
          </div>

          <div className="bottom">
            <div className="or"></div>

            <div className="text">
              <Link to="/sign-up">clique aqui</Link> para criar uma nova conta
            </div>
          </div>
        </form>
      </div>
    </SignSection>
  )
}

export default SignIn
