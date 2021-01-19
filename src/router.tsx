import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header } from './components/header'

import { Homepage } from './pages/homepage'

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="wrapper-header">
          <Header />
        </div>

        <div className="wrapper-body">
          <div className="container">
            <Switch>
              <Route path="/" component={Homepage} exact />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
