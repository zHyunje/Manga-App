import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { SignSection } from './style'
import { Link } from 'react-router-dom'
import checkPass from '../../stuff/checkPass'

// components
import Button from '../../components/button'

// icons
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoEye, IoEyeOff } from 'react-icons/io5'

// images
import Background from '../../stuff/images/background.png'
import request from '../../stuff/api/request'

const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [reTypePass, setReTypePass] = useState<string>('')
  const [passStrength, setPassStrenght] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)
  const [isPassValid, setIsPassValid] = useState<boolean>(true)
  const [hasTyped, setHasTyped] = useState(false)

  useEffect(() => {
    if (hasTyped) {
      setIsPassValid(!!password && !!reTypePass && reTypePass === password)
    }
  }, [password, reTypePass, hasTyped])

  const handleForm = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (username && password) {
        if (isPassValid) {
          const res = await request<{ username: string; password: string }>({
            method: 'POST',
            url: '/sign-up',
            data: {
              username,
              password,
            },
          })

          return console.log(res)
        } else {
          console.log('As senhas não coincidem.')
        }
      } else {
        console.log('Por favor, preencha todos os campos.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getStrength = (strength: string) => {
    switch (strength) {
      case '0':
        return 'weak'
      case '1':
        return 'medium'
      case '2':
        return 'strong'
      case '3':
        return 'very-strong'
      default:
        return 'very-strong'
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
            <div className="title">Vamos criar uma nova conta</div>
          </div>

          <div className="middle">
            <div className="input-box">
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value
                  setUsername(value)
                  event.currentTarget.classList.toggle('active', value.length > 0)
                }}
              />
              <label htmlFor="email">Escolha um nome de Usuário</label>
            </div>

            <div className="input-box">
              <input
                type={showPass ? 'text' : 'password'}
                name="pass"
                id="pass"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value
                  setPassword(value)
                  setPassStrenght(checkPass(value))
                  setHasTyped(true)
                  event.currentTarget.classList.toggle('active', value.length > 0)
                }}
              />
              <label htmlFor="pass">Agora uma senha forte</label>

              <div className="see-pass" onClick={() => setShowPass(!showPass)}>
                {!showPass && <IoEye className="icon" />}
                {showPass && <IoEyeOff className="icon" />}
              </div>

              {passStrength && (
                <div className={`pass-strenght ${getStrength(passStrength)}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>

            <div className="input-box">
              <input
                type={showPass ? 'text' : 'password'}
                name="pass2"
                id="pass2"
                style={{ border: hasTyped && !isPassValid ? '1px solid salmon' : 'none' }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value
                  setReTypePass(value)
                  setHasTyped(true)
                  event.currentTarget.classList.toggle('active', value.length > 0)
                }}
              />
              <label htmlFor="pass2">Digite novamente a mesma senha</label>

              <div className="see-pass" onClick={() => setShowPass(!showPass)}>
                {!showPass && <IoEye className="icon" />}
                {showPass && <IoEyeOff className="icon" />}
              </div>
            </div>

            <Button
              text={'Criar Conta'}
              classes="default py-lg font-md bold w-full my-lg"
              textCenter={true}
              type={'submit'}
            />
          </div>

          <div className="bottom">
            <div className="or"></div>

            <div className="text">
              Já possui uma conta? <Link to="/sign-in">Clique aqui</Link> para fazer login
            </div>
          </div>
        </form>
      </div>
    </SignSection>
  )
}

export default SignUp
