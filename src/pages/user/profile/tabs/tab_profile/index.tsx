import React, { ChangeEvent, useEffect, useState } from 'react'
import { ProfileTabSection } from './style'
import { User } from '../../../../../stuff/interfaces'
import Input from '../../../../../components/input'
import request from '../../../../../stuff/api/request'
import getToken from '../../../../../stuff/getToken'

// icons
import { FaCamera } from 'react-icons/fa'
import Button from '../../../../../components/button'

interface UserInfos {
  data?: {
    username?: string
    avatar?: string
    createdAt?: Date
  }
}

const ProfileTab: React.FC<UserInfos> = ({ data }) => {
  const [pfp, setPfp] = useState<File | null>(null)
  const [newUsername, setNewUsername] = useState<string>('')
  const [previewPfp, setPreviewPfp] = useState<string | null>(null)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isColorsActive, setIsColorsActive] = useState<boolean>(false)
  const colors = [
    '#FAD02E',
    '#F28C8C',
    '#B9EBCF',
    '#A9D6E5',
    '#E0A4B3',
    '#F5C6C6',
    '#0b0b0b',
    '#141414',
  ]
  const [curColor, setCurColor] = useState(() => {
    const storedColor = localStorage.getItem('color')
    return storedColor || 'black'
  })

  useEffect(() => {
    if (newUsername) {
      console.log(newUsername)
    }
  }, [newUsername])

  useEffect(() => {
    localStorage.setItem('color', curColor)
  }, [curColor])

  useEffect(() => {
    if (previewPfp) {
      setIsModalActive(true)
    }
  }, [previewPfp])

  const updateUser = async () => {
    if (newUsername !== '') {
      try {
        const res = (await request({
          method: 'PUT',
          url: '/update-username',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          data: {
            username: newUsername,
          },
        })) as { newUser: { username: string } }

        if (res) {
          sessionStorage.setItem('temporary_user', res.newUser.username)
        }
      } catch (error) {
        console.error(`Error: ${error}`)
      } finally {
        setNewUsername('')
        window.location.reload()
      }
    }
  }

  const updatePfp = async () => {
    if (pfp !== null) {
      const formData = new FormData()

      if (pfp) {
        formData.append('avatar', pfp)
      }

      try {
        const res = (await request({
          method: 'PUT',
          url: '/update-avatar',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })) as { newUser: { avatar: string } }

        if (res) {
          sessionStorage.setItem('temporary_pfp', res.newUser.avatar)
        }
      } catch (error) {
        console.error(`Error: ${error}`)
      } finally {
        setPfp(null)
        window.location.reload()
      }
    }
  }

  return (
    <ProfileTabSection>
      <div className="top">
        <div
          className="banner"
          style={{
            backgroundColor: `${curColor ? curColor : localStorage.getItem('color')}`,
          }}
        >
          <div className="palette">
            <div className={isColorsActive ? 'menu active' : 'menu'}>
              {colors.map((item, index) => (
                <div
                  className="color"
                  style={{ backgroundColor: item }}
                  key={index}
                  onClick={() => setCurColor(item)}
                ></div>
              ))}
            </div>

            <div className="opener" onClick={() => setIsColorsActive(!isColorsActive)}></div>
          </div>
        </div>
        <div className="pfp">
          <div className="profile-image">
            <img
              src={`${
                sessionStorage.getItem('temporary_pfp')
                  ? sessionStorage.getItem('temporary_pfp')
                  : data && data.avatar
              }`}
              alt="your profile picture"
            />
            <input
              type="file"
              name="pfp"
              id="pfp"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                  const file = e.currentTarget.files[0]
                  setPfp(file)

                  const objectUrl = URL.createObjectURL(file)
                  setPreviewPfp(objectUrl)
                }
              }}
            />
            <label htmlFor="pfp">
              <FaCamera />
            </label>
          </div>

          <div className="username">
            <div>Usuário atual</div>
            <div className="user">
              {sessionStorage.getItem('temporary_user')
                ? sessionStorage.getItem('temporary_user')
                : data?.username}
            </div>
          </div>
        </div>
      </div>

      <div className="middle">
        <Input
          placeholder="alterar usuário"
          classes="no-margin"
          type="text"
          value={newUsername}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.currentTarget.value)}
        />
        <Button text="Atualizar" classes="default bold rad-md" onClick={updateUser} />
      </div>

      {isModalActive && (
        <div className="modal">
          <div className="modal-content">
            <div className="title">Sua foto de perfil ficará assim</div>

            <div className="preview">
              <img src={`${previewPfp && previewPfp}`} />
            </div>

            <div className="controls">
              <Button
                text={'Fechar'}
                classes="w-90 py-sm gray bold"
                style={{ marginBlockEnd: 10 }}
                textCenter={true}
                onClick={() => setIsModalActive(false)}
              />
              <Button
                text={'Atualizar'}
                classes="w-90 py-sm default bold"
                style={{ marginBlockEnd: 10 }}
                textCenter={true}
                onClick={updatePfp}
              />
            </div>
          </div>
        </div>
      )}
    </ProfileTabSection>
  )
}

export default ProfileTab
