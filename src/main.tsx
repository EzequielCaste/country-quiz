import React from 'react'
import ReactDOM from 'react-dom/client'
import QuizApp from './QuizApp'
import {Route} from 'wouter'

import CapitalGame from './components/CapitalGame'
import FlagGame from './components/FlagGame'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Route path="/" component={QuizApp} />    
    <Route path="/capital" component={CapitalGame} />
    <Route path="/flag" component={FlagGame} />
  </React.StrictMode>
)
