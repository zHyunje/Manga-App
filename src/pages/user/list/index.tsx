import React, { ChangeEvent, useEffect, useState } from 'react'
import request from '../../../stuff/api/request'
import getToken from '../../../stuff/getToken'
import { User } from '../../../stuff/interfaces'

// style
import { ListSection } from './style'

// components
import Navbar from '../../../components/navbar'
import Input from '../../../components/input'
import Button from '../../../components/button'

// icons
import { FaTrashAlt, FaSortAlphaDown, FaSortNumericDown } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Loading from '../../../components/loading'

export type MyList = {
  list: ListProps[]
}

export type ListProps = {
  mangaid: string
  mangaName: string
  mangaCover: string
  addedAt: Date
  summary: string
}

const UserList = () => {
  const [userInfos, setUserInfos] = useState<User>()
  const [list, setList] = useState<ListProps[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const filteredItems = list.filter((item) =>
    item.mangaName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (getToken()) {
      const fetchData = async () => {
        const res = await request<{ username: string; avatar: string; createdAt: Date }>({
          method: 'GET',
          url: '/profile',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        setUserInfos(res)
      }

      const fetchList = async () => {
        try {
          setIsLoading(true)
          const res = await request<MyList>({
            method: 'GET',
            url: '/my-list',
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })

          setList(res.list)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
      fetchList()
    }
  }, [])

  return (
    <ListSection>
      <Navbar curPage="Minha Lista" userInfos={userInfos} />

      {isLoading && <Loading isLoading={true} />}

      <div className="content">
        <div className="item">
          <div className="header">Sua lista ({filteredItems.length})</div>

          <div className="list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div className="list-item" key={index}>
                  <div className="image">
                    <img src={item.mangaCover} alt={item.mangaName} />
                  </div>

                  <div className="infos">
                    <div className="name" title={item.mangaName}>
                      {item.mangaName}
                    </div>
                    <div className="added">
                      <span>Adicionado em: </span>
                      <span>
                        {new Date(item.addedAt)
                          .toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                          .split(' ')
                          .map((word, index) =>
                            index === 2 ? word.charAt(0).toUpperCase() + word.slice(1) : word
                          )
                          .join(' ')}
                      </span>
                    </div>

                    <div className="summary">{item.summary.slice(0, 150)}...</div>
                  </div>
                </div>
              ))
            ) : (
              <div>Nenhum item encontrado.</div>
            )}
          </div>
        </div>
        <div className="item">
          <div className="header">Buscar Títulos</div>
          <div className="input-box">
            <Input
              type="text"
              placeholder="é só digitar e ver a mágica"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.currentTarget.value)
              }}
            />
          </div>

          <div className="controllers">
            <div className="control-item" onClick={() => setIsModalActive(true)}>
              <FaTrashAlt className="icon" />
              <div className="text">Limpar toda a lista</div>
            </div>
            <div className="control-item">
              <FaSortNumericDown className="icon" />
              <div className="text">Ordenar por data</div>
            </div>
            <div className="control-item">
              <FaSortAlphaDown className="icon" />
              <div className="text">Ordenar por nome</div>
            </div>
          </div>
        </div>

        <div className={isModalActive ? 'modal active' : 'modal'}>
          <div className="modal-content">
            <div className="title">tem certeza de que quer fazer isso?</div>
            <div className="desc">
              fazendo isso todo os títulos salvos serão removidos da sua lista.
            </div>

            <div className="controls">
              <Button text="sim" classes="no-radius gray" textCenter={true} />
              <Button
                text="fechar"
                classes="default no-radius"
                textCenter={true}
                onClick={() => setIsModalActive(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </ListSection>
  )
}

export default UserList
