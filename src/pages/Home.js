import { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import '../css/Home.css'

const Home = () => {
  const {navigator}=useContext(DataContext)
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
    console.log(entries)
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting
      if(intersecting){
        console.log(entry.target)
      }
    })
  })
  useEffect(()=>{
    const container = document.getElementById('heroSection');
    observer.observe(container)
  },[])
  const randomQuoteFunc=()=>{
    const rndmNum=Math.floor(Math.random()*quotes.length)
    return(
      <>
        <h2>{quotes[rndmNum].quote}</h2>
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
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
      <section className='invisible'>
      <p>Section</p>
      </section>
    </main>
  )
}

export default Home