import React, { useEffect, useState } from 'react'
import { HomeSection } from './style'
import axios from 'axios'
import { getBaseUrl } from '../../stuff/baseUrl'
import request from '../../stuff/api/request'
import { MyList } from '../user/list'

// icons
import { CiCirclePlus } from 'react-icons/ci'
import { GoBook } from 'react-icons/go'
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io'
import { IoList, IoGrid } from 'react-icons/io5'
import { FaListUl } from 'react-icons/fa'

// components
import Navbar from '../../components/navbar'
import Button from '../../components/button'
import Loading from '../../components/loading'
import Genre from './genre'

type ListProps = {
  mangaId: string
  mangaName: string
  mangaCover: string
  addedAt: Date
  summary: string
}

type Props = {
  scrapId: string
  title: string
  image: string
  summary: string
  release: number
  genres: GenreProps[]
}

type GenreProps = {
  id: string
  title: string
}

interface User {
  username: string
  avatar: string
  createdAt: Date
}

const Home: React.FC = () => {
  const [list, setList] = useState<Props[]>([])
  const [userList, setUserList] = useState<ListProps[]>([])
  const [curManga, setCurManga] = useState<number>(0)
  const [userInfos, setUserInfos] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMangaInList, setIsMangaInList] = useState(false)
  const [curGrid, setCurGrid] = useState<number>(0)
  const getToken = localStorage.getItem('@token')
  const items = [
    {
      title: 'Ação',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Aventura',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Comédia',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Drama',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Escolar',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Fantasia',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Romance',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Sci-Fi',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
    {
      title: 'Terror',
      bg: 'https://res.cloudinary.com/dex3quunx/image/upload/v1722096277/artify/v6zown5oaipmvcgwg2mz.jpg',
    },
  ]

  useEffect(() => {
    if (getToken) {
      const fetchList = async () => {
        try {
          setIsLoading(true)
          const res = await request<{ list: ListProps[] }>({
            method: 'GET',
            url: '/my-list',
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })

          setUserList(res.list)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchList()
    }
  }, [getToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get<Props[]>(`${getBaseUrl()}/list`)
        setList(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (list.length > 0 && userList.length > 0 && list[curManga]) {
      const mangaExists = userList.some((item) => item.mangaId === list[curManga].scrapId)
      setIsMangaInList(!!mangaExists)
    }
  }, [curManga, userList, list])

  useEffect(() => {
    if (getToken) {
      const fetchData = async () => {
        const res = await request<{ username: string; avatar: string; createdAt: Date }>({
          method: 'GET',
          url: '/profile',
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })

        setUserInfos(res)
      }

      fetchData()
    }
  }, [getToken])

  const addToList = async (manga: Props) => {
    const res = await request<{ mangaId: string; mangaName: string; mangaCover: string }>({
      method: 'POST',
      url: '/update-list',
      data: {
        mangaId: manga.scrapId,
        mangaName: manga.title,
        mangaCover: manga.image,
      },
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
  }

  const handleManga = (type: 'next' | 'prev' | undefined) => {
    if (!list || list.length === 0) return

    const listLength = list.length

    switch (type) {
      case 'next':
        if (curManga < listLength - 1) {
          const next = curManga + 1
          setCurManga(next)
        } else {
          setCurManga(0)
        }
        break
      case 'prev':
        if (curManga > 0) {
          const prev = curManga - 1
          setCurManga(prev)
        } else {
          setCurManga(listLength - 1)
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleManga('next')
    }, 5000)

    return () => clearInterval(interval)
  }, [list, curManga])

  return (
    <HomeSection>
      <Navbar curPage="Início" userInfos={userInfos} />
      <Loading isLoading={isLoading} />

      {!isLoading && (
        <>
          <div className="content-image">
            <img src={list && list[curManga]?.image} alt="" />
          </div>

          <div className="content">
            {list && list[curManga] && (
              <>
                <div className="item">
                  <div className="header">
                    <div className="header-item">{list && list[curManga].release}</div>
                    <div className="header-item">{list && list[curManga].title}</div>
                    <div className="header-item">
                      {list[curManga].genres?.slice(0, 3).map((item, index) => (
                        <div className="genre" key={index}>
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="summary">{list[curManga].summary.slice(0, 350)}...</div>

                  <div className="controls">
                    <Button
                      text="Ler Agora"
                      classes="default wg-md font-md py-sm"
                      iconProps={{ icon: GoBook, size: 16 }}
                      style={{ marginRight: '20px' }}
                      href={`/manga/info/${list[curManga].scrapId}`}
                    />
                    <Button
                      text={isMangaInList ? 'Remover da lista' : 'Salvar na Lista'}
                      classes="no-bg wg-md font-md"
                      iconProps={{
                        icon: CiCirclePlus,
                        size: 34,
                        opacity: 0.4,
                        rotate: isMangaInList ? 45 : 0,
                      }}
                      onClick={() => addToList(list[curManga])}
                    />
                  </div>
                </div>
                <div className="item">
                  <img src={list && list[curManga].image} alt="" />
                </div>
              </>
            )}

            <div className="carousel-controllers">
              <Button
                iconProps={{ icon: IoMdArrowRoundBack, noMargin: true, center: true, size: 17 }}
                onClick={() => handleManga('prev')}
                classes="control gray no-padding"
              />
              <Button
                iconProps={{ icon: IoMdArrowRoundForward, noMargin: true, center: true, size: 17 }}
                onClick={() => handleManga('next')}
                classes="control gray no-padding"
              />
            </div>
          </div>

          <div className="wrapper">
            <div className="categories">
              <div className="header">
                <div className="title">Principais Categorias</div>
                <div className="subtitle">Ver tudo</div>
              </div>

              <div className="category-list">
                {items.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="title">{item.title}</div>
                    <div className="item-bg">
                      <img src={item.bg} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="listing">
              <div className="header">
                <div className="title">Um pouco de tudo</div>
                <div className="grid">
                  <div
                    onClick={() => setCurGrid(1)}
                    className={curGrid === 1 ? 'grid-item active' : 'grid-item'}
                  >
                    <FaListUl />
                  </div>
                  <div
                    onClick={() => setCurGrid(0)}
                    className={curGrid === 0 ? 'grid-item active' : 'grid-item'}
                  >
                    <IoGrid />
                  </div>
                </div>
              </div>
            </div>
            {/* <Genre genre="acao" />
        <Genre genre="drama" />
        <Genre genre="fantasia" />
        <Genre genre="escolar" /> */}
          </div>
        </>
      )}
    </HomeSection>
  )
}

export default Home
