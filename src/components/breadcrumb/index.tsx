import React from 'react'
import { Bread } from './style'
import { Link } from 'react-router-dom'

// icons
import { IoChevronForwardOutline } from 'react-icons/io5'

type Page = {
  page: string
  path: string
}

type BreadProps = {
  pages?: Page[]
}

const Breadcrumb: React.FC<BreadProps> = ({ pages }) => {
  return (
    <Bread>
      {pages &&
        pages.map((item, index) => {
          const isLast = index === pages.length - 1

          return (
            <div className="bread-content" key={index}>
              {item.path ? (
                <div className={isLast ? 'bread-item active' : 'bread-item'}>
                  <Link to={item.path} className="title">
                    {item.page}
                  </Link>
                  {!isLast && <IoChevronForwardOutline className="icon" />}
                </div>
              ) : (
                <div className={isLast ? 'bread-item active' : 'bread-item'}>
                  <div className="title">{item.page}</div>
                  {!isLast && <IoChevronForwardOutline className="icon" />}
                </div>
              )}
            </div>
          )
        })}
    </Bread>
  )
}

export default Breadcrumb
