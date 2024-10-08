import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import getToken from '../../stuff/getToken'
import request from '../../stuff/api/request'

// styles
import { MangaSection } from './style'

// icons
import { CiCirclePlus } from 'react-icons/ci'
import { GoBook } from 'react-icons/go'
import { TiWarning } from 'react-icons/ti'
import { BsSortNumericDown, BsSortNumericUp } from 'react-icons/bs'

// components
import Navbar from '../../components/navbar'
import Breadcrumb from '../../components/breadcrumb'
import Button from '../../components/button'
import Input from '../../components/input'

interface User {
  username: string
  avatar: string
  createdAt: Date
}

type MangaInfos = {
  scrapId: string
  title: string
  author: string
  summary: string
  status: string
  release: number
  image: string
  genres: GenreProps[]
  chapters: ChapterProps[]
}

type GenreProps = {
  id: string
  title: string
}

type ChapterProps = {
  id: string
  title: string
  release: string
  images: ChapterImages[]
}

type ChapterImages = {
  id: string
  image: string
}

const Manga = () => {
  const [userInfos, setUserInfos] = useState<User>()
  const [mangaInfos, setMangaInfos] = useState<MangaInfos>()
  const [filter, setFilter] = useState<string>('')
  const dropRef = useRef<HTMLDivElement | null>(null)
  const [isDropActive, setIsDropActive] = useState<boolean>(false)
  const { term } = useParams<{ term: string }>()
  const [orderBy, setOrderBy] = useState<number>(0)
  const pages = [
    {
      page: 'Início',
      path: '/',
    },
    {
      page: 'Mangas',
      path: '',
    },
    {
      page: `${mangaInfos?.title}`,
      path: '',
    },
  ]

  const filteredItems = mangaInfos?.chapters?.filter((item) => {
    return item.title.toLowerCase().includes(filter.toLowerCase())
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        if (isDropActive) {
          setIsDropActive(false)
        }
      }
    }

    if (dropRef.current) {
      window.addEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropRef, isDropActive])

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

      fetchData()
    }
  }, [getToken])

  useEffect(() => {
    if (term) {
      const fetchData = async () => {
        const res = await request<MangaInfos>({
          method: 'GET',
          url: `/manga/info/${term}`,
        })

        // console.log(res)
        return setMangaInfos(res)
      }

      fetchData()
    }
  }, [term])

  return (
    <MangaSection>
      <Navbar userInfos={userInfos} />
      <div className="content">
        <Breadcrumb pages={pages} />

        {mangaInfos && (
          <div className="grid-content">
            <div className="item">
              <img src={mangaInfos.image} alt={`${mangaInfos.title}'s image`} />
            </div>

            <div className="item">
              <div className="item-content">
                <div className="release">{mangaInfos.release}</div>
                <div className="title">{mangaInfos.title}</div>
                <div className="genres">
                  {mangaInfos.genres.map((item, index) => (
                    <div className="genre" key={index}>
                      {item.title}
                    </div>
                  ))}
                </div>
                <div className="author">
                  {mangaInfos.author ? (
                    <>
                      por: <span>{mangaInfos.author}</span>
                    </>
                  ) : (
                    <>
                      <TiWarning className="icon" />
                      <span className="not-found">Autor não encontrado</span>
                    </>
                  )}
                </div>
                <div className="summary">
                  {mangaInfos.summary.length > 650
                    ? mangaInfos.summary.slice(0, 650)
                    : mangaInfos.summary}
                </div>
              </div>

              <div className="controls">
                <Button
                  text="Começar leitura"
                  classes="default bold py-md"
                  iconProps={{ icon: GoBook }}
                />
                <Button
                  text="Salvar na lista"
                  classes="no-bg"
                  iconProps={{ icon: CiCirclePlus, size: 34, opacity: 0.4 }}
                />
              </div>
            </div>

            <div className="item">ad here</div>

            <div className="item">
              <div className="header">
                <div className="header-content">
                  <div className="header-item">Capítulos</div>
                  <div className="header-item">
                    <Input
                      type="text"
                      classes="no-margin py-sm"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFilter(e.currentTarget.value)
                      }
                      placeholder="buscar capítulo"
                    />
                  </div>
                </div>

                <div className="header-item" ref={dropRef}>
                  <div
                    className={isDropActive ? 'opener active' : 'opener'}
                    onClick={() => setIsDropActive(!isDropActive)}
                  >
                    Ordenar
                  </div>

                  <div className={isDropActive ? 'dropdown-content active' : 'dropdown-content'}>
                    <div
                      className="option"
                      onClick={() => {
                        setIsDropActive(!isDropActive)
                        setOrderBy(0)
                      }}
                    >
                      <BsSortNumericDown className="icon" />
                      <span>Crescente</span>
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        setIsDropActive(!isDropActive)
                        setOrderBy(1)
                      }}
                    >
                      <BsSortNumericUp className="icon" />
                      <span>Decrescente</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chapters">
                {filter.length > 0 ? (
                  <>
                    {filteredItems?.map((item, index) => (
                      <div className="chapter" key={index}>
                        {item.title}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {mangaInfos?.chapters?.map((item, index) => (
                      <div className="chapter" key={index}>
                        {item.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="similar"></div>
      </div>
    </MangaSection>
  )
}

export default Manga
