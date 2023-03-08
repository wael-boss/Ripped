import { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import '../css/Home.css'
import {TbSocial} from 'react-icons/tb'
import {GiStrong ,GiProgression} from 'react-icons/gi'
import GymShark from '../api/GymShark'
import { set } from 'firebase/database'
const Home = () => {
  const {navigator ,errorOccurred}=useContext(DataContext)
  const quotes=[
    {author:"Ronnie Coleman",quote:"The real workout starts when you want to stop."},
    {author:"Dwayne ‘The Rock’ Johnson",quote:"Wake up determined. Go to bed satisfied."},
    {author:"A wise man",quote:"The body achieves what the mind believes."},
    {author:"Franco Columbu",quote:"Winners do what they fear."},
    {author:"Abraham Lincoln",quote:"The best way to predict the future is to create it."},
    {author:"Michael John Bobak",quote:"All progress takes place outside the comfort zone."},
    {author:"Wayne Dyer",quote:"Go the extra mile. It’s never crowded."},
    {author:"Sean Patrick Flanery",quote:"Do something today that your future self will thank you for."}
  ]
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting
      if(intersecting){
        entry.target.classList.replace('observed' ,'visible')
      }else{
        entry.target.classList.replace('visible' ,'observed')
      }
    })
  })

  useEffect(()=>{
    const containers = document.querySelectorAll('.observed');
    containers.forEach(container=>observer.observe(container))
  },[])
  const randomQuoteFunc=()=>{
    const rndmNum=Math.floor(Math.random()*quotes.length)
    const Quote=quotes[rndmNum].quote.split('')
    let i=0.00
    return(
      <>
        <h2 id='quoteHeader'>{Quote.map(letter=>{
          i=i+0.01
          return(
            <span key={i} style={{transitionDelay:`${i}s`}} className='observed'>{letter}</span>
          )
        })}</h2>
        <p>- {quotes[rndmNum].author}</p>
      </>
    )
  }
  return (
    <main>
      <section id='heroSection'>
        <div id='heroContent'>
          <p className='slogan'>lift to get ripped</p>
          <div id='quotesContainer'>
            {randomQuoteFunc()}
          </div>
          <div id='heroButtonContainer'>
            <button className='btnStyle1' onClick={()=>{
              navigator('/profile')
            }}>my profile</button>
            <button className='btnStyle1' onClick={()=>{
              navigator('/peaple')
            }}>find a friend</button>
          </div>
        </div>
        <div id='heroImage'>
          <img src='/images/hero1.png'/>
        </div>
      </section>
      <section id='introSection'>
          <h1 className='sectionHeader'>our services</h1>
          <div id='introBlocks'>
            <div className='introBlock observed'>
              <div className='imageContainer'>
                <TbSocial/>
                <h2>Socializing</h2>
              </div>
              <div className='textContainer'>
                <p>Ripped's fitness-focused community connects like-minded individuals to share progress, join challenges, and attend virtual events.</p>
              </div>
            </div>
            <div className='introBlock observed'>
              <div className='imageContainer'>
                <GiStrong/>
                <h2>Get Ripped</h2>
              </div>
              <div className='textContainer'>
                <p>Ripped provides access to expert guidance, workout routines, challenges, and a supportive community to achieve fitness goals.</p>
              </div>
            </div>
            <div className='introBlock observed'>
              <div className='imageContainer'>
                <GiProgression/>
                <h2>Progress</h2>
              </div>
              <div className='textContainer'>
                <p>Ripped offers a range of resources, from workout routines to challenges, to help you progress on your fitness journey with the support of a vibrant community.</p>
              </div>
            </div>
          </div>
      </section>
      <section id='productsSetcion'>
        <h1 className='sectionHeader'>Gym Equipment</h1>
      </section>
    </main>
  )
}

export default Home