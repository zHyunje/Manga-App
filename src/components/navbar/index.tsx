import React, { useEffect, useRef, useState } from 'react'

// style
import { NavbarSection } from './style'

// icons
import { IoSearch } from 'react-icons/io5'
import { FaUserAlt } from 'react-icons/fa'
import { GoSignIn } from 'react-icons/go'

// images
import Logo from '../../stuff/images/logo.svg'
import Button from '../button'
import { Link } from 'react-router-dom'

type Props = {
  curPage?: string
  userInfos?: User
}

interface User {
  username: string
  avatar: string
  createdAt: Date
}

const Navbar: React.FC<Props> = ({ curPage, userInfos }) => {
  const list = [
    { id: '', title: 'Início', path: '/' },
    { id: '', title: 'Minha Lista', path: '/user/my-list' },
    { id: '', title: 'Popular', path: '/popular' },
    { id: '', title: 'Categorias', path: '/categories' },
  ]
  const [userData, setUserData] = useState<User | null>(null)
  const [isDropActive, setIsDropActive] = useState<boolean>(false)
  const [curTop, setCurTop] = useState(0)
  const plansSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setCurTop(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isNavbarActive =
    curTop > 1 && curTop < (plansSectionRef.current ? plansSectionRef.current.offsetTop : 99999999)

  useEffect(() => {
    if (userInfos) {
      setUserData(userInfos)
    }
  }, [userInfos])

  return (
    <NavbarSection
      className={isNavbarActive ? 'sticky' : ''}
      style={{
        width:
          curTop < 1
            ? '100%'
            : curTop <= 60
            ? `calc(100% - ${(curTop / 60) * 25}%)`
            : isNavbarActive
            ? '75%'
            : '100%',
      }}
    >
      <div className="left">
        <Link to="/" className="logo">
          <img src={`${Logo}`} alt="" />
          <span>
            <span>rti</span>fy
          </span>
        </Link>

        <div className="search">
          <input type="text" placeholder="search mangas" />
          <div className="icon">
            <IoSearch className="icon-tag" />
          </div>
        </div>
      </div>

      <ul className="menu">
        {list.map((item, index) => (
          <li className={curPage === item.title ? 'active' : ''} key={index}>
            <Link to={`${item.path}`}>{item.title}</Link>
          </li>
        ))}
        {userData ? (
          <div className="user">
            <div className="dropdown-opener" onClick={() => setIsDropActive(!isDropActive)}>
              {sessionStorage.getItem('temporary_user')
                ? sessionStorage.getItem('temporary_user')
                : userData.username}
              <img
                src={`${
                  sessionStorage.getItem('temporary_pfp')
                    ? sessionStorage.getItem('temporary_pfp')
                    : userData.avatar
                }`}
              />
            </div>

            <div className={isDropActive ? 'dropdown-content active' : 'dropdown-content'}>
              <Button
                text="Seu Perfil"
                classes="w-full gray rad-md dropdown-item"
                href="/user/profile"
                iconProps={{ icon: FaUserAlt }}
              />
              <Button
                text="Encerrar Sessão"
                classes="w-full gray py-md rad-md dropdown-item"
                iconProps={{ icon: GoSignIn }}
              />
            </div>
          </div>
        ) : (
          <Button text="Entrar" href="/sign-in" classes="default font-md bold px-lg py-sm" />
        )}
      </ul>
    </NavbarSection>
  )
}

export default Navbar
