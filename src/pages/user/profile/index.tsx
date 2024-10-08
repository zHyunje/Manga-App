import React, { useEffect, useState } from 'react'
import { User } from '../../../stuff/interfaces'
import getToken from '../../../stuff/getToken'
import request from '../../../stuff/api/request'

// style
import { ProfileSection } from './style'

// components
import Navbar from '../../../components/navbar'

// tab pages
import ProfileTab from './tabs/tab_profile'
import HistoryTab from './tabs/tab_history'
import LikedTab from './tabs/tab_liked'
import SettingsTab from './tabs/tab_settings'

// icons
import { FaUserAlt, FaBookOpen } from 'react-icons/fa'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { FaHeart, FaGear } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [userInfos, setUserInfos] = useState<User>()
  const [sendUser, setSendUser] = useState<{ username: string; avatar: string; createdAt: Date }>()
  const [curTab, setCurTab] = useState<number>(0)
  const tabs = [
    { name: 'Seu perfil', icon: <FaUserAlt className="icon" /> },
    { name: 'Histórico', icon: <RxCounterClockwiseClock className="icon" /> },
    { name: 'Curtidos', icon: <FaHeart className="icon" /> },
    { name: 'Minha lista', icon: <FaBookOpen className="icon" /> },
    { name: 'Configurações', icon: <FaGear className="icon" /> },
  ]

  useEffect(() => {
    if (userInfos) {
      setSendUser({
        username: userInfos.username,
        avatar: userInfos.avatar,
        createdAt: userInfos.createdAt,
      })
    }
  }, [userInfos])

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
  }, [])

  return (
    <ProfileSection>
      <Navbar userInfos={userInfos} />

      <div className="content">
        <div className="item">
          {tabs &&
            tabs.map((item, index) =>
              index !== 3 ? (
                <div
                  className={`tab ${curTab === index ? 'tab active' : 'tab'}`}
                  onClick={() => setCurTab(index)}
                  key={index}
                >
                  {item.icon}
                  <div className="text">{item.name}</div>
                </div>
              ) : (
                <Link to={'/user/my-list'} key={index} className="tab">
                  {item.icon}
                  <div className="text">{item.name}</div>
                  <FiExternalLink className="ext-icon" />
                </Link>
              )
            )}
        </div>
        <div className="item">
          {curTab === 0 && (
            <ProfileTab
              data={{
                username: sendUser?.username,
                avatar: sendUser?.avatar,
                createdAt: sendUser?.createdAt,
              }}
            />
          )}
          {curTab === 1 && <HistoryTab />}
          {curTab === 2 && <LikedTab />}
          {curTab === 4 && <SettingsTab />}
        </div>
      </div>
    </ProfileSection>
  )
}

export default Profile
