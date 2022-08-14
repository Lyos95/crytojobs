import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Landing from './landingpage'
import JobDetails from './jobDetails'
import JobPost from './jobPost'

const Home: NextPage = () => {
  return (
    <Landing/>
  )
}

export default Home
