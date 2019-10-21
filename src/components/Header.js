import React from 'react'

export default function Header ({ img, username }) {
  return (
    <div className="bg-dark-gray">
      <div className="mw8 center">
        <div className="flex items-center">
          <img className="br-100 user-img" alt="user" src={img}/>
          <div className="pl3">
            <p className="b white f4 ma0 pb1 pt2">{username}</p>
            <p className="white f5 ma0 pb2">MyFeeds account</p>
          </div>
        </div>
      </div>
    </div>
  )
}
