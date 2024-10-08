import React, { useEffect, useState } from 'react'
import getToken from '../../../stuff/getToken'
import request from '../../../stuff/api/request'
import { GenreSection } from './style'
import genres from '../../../stuff/genres.json'

type Props = {
  genre: string
}

type Manga = {
  scrapId: string
  title: string
  image: string
}

const Genre: React.FC<Props> = ({ genre }) => {
  const [manga, setManga] = useState<Manga[] | null>(null)
  const [curGenre, setCurGenre] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    if (genre) {
      for (const item of genres) {
        if (genre === item.id) {
          setCurGenre(item)
        }
      }
    }
  }, [genre])

  useEffect(() => {
    if (getToken()) {
      const fetchData = async () => {
        const res = await request({
          method: 'GET',
          url: `/genre/${genre}`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        setManga(res as Manga[])
      }

      fetchData()
    }
  }, [])

  return (
    <GenreSection>
      <div className="title">Principais escolhas para {curGenre && curGenre.title}</div>

      <div className={manga && manga.length > 9 ? 'list scroll' : 'list'}>
        {manga &&
          manga.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.image} />
            </div>
          ))}
      </div>
    </GenreSection>
  )
}

export default Genre
