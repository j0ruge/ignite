import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'
import { useState } from 'react';


export function App() {
  
  return (
    <>
      <Header />
      <TaskList />
    </>
  )
}