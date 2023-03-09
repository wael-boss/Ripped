import { useContext, useEffect} from 'react'
import DataContext from '../context/DataContext'
import '../css/Home.css'
import {TbSocial} from 'react-icons/tb'
import {GiStrong ,GiProgression} from 'react-icons/gi'
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
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting
      if(intersecting){
        entry.target.classList.replace('observed' ,'visible')
      }
      // enable for elements to keep toggeling on and off
      // else{
      //   entry.target.classList.replace('visible' ,'observed')
      // }
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
      <section id='columnsSection'>
        <h1 className='sectionHeader'>how we benefit you</h1>
        <div id='columnsContainer'>
          <div className='column'>
            <div className='imageSide observed'>
              <img className='circularSlogan' src='images/circular-slogan.png'/>
              <img className='columnImg' src='images/connectivity.png'/>
            </div>
            <div className='textSide observed'>
              <span className='columnNum observed'>1</span>
              <h2>- Connectivity</h2>
              <p>Connecting with others who share similar interests and goals is an important aspect of achieving success in any area of life, including fitness. At Ripped, we understand the importance of community and support when it comes to fitness, which is why we've created a platform that allows users to socialize and connect with others who are working towards similar goals.</p>
              <p>Our website includes features such as a user profile network, where users can view each other's progress and offer support and encouragement. We also have a forum where users can connect with one another, share their experiences, and ask questions. Additionally, we host events, challenges, and competitions that allow users to connect and compete with one another, fostering a sense of community and motivation.</p>
            </div> 
          </div>
          {/*  */}
          <div className='column'>
            <div className='textSide observed'>
              <span className='columnNum observed'>2</span>
              <h2>- Get In Shape</h2>
              <p>Are you looking to get in shape and improve your overall fitness? At Ripped, we're here to help. Our website is designed to provide you with everything you need to achieve your fitness goals and get in the best shape of your life.</p>
              <p>We offer a wide range of exercises and workout routines, each designed to target different muscle groups and help you build strength, endurance, and flexibility. Our exercises come with detailed instructions and images, so you can be sure you're doing them correctly and safely.</p>
              <p>In addition to our exercises, we also offer a calendar feature that allows you to plan your workouts and track your progress over time. You can easily add exercises to your calendar at a day of your choice and keep track of your performance to see how far you've come.</p>
            </div>
            <div className='imageSide observed'>
              <img className='columnImg' src='images/bothgendersinshape.png'/>
              <img className='circularSlogan' src='images/circular-slogan.png'/>
            </div>
          </div>
          {/*  */}
          <div className='column'>
            <div className='imageSide observed'>
              <img className='circularSlogan' src='images/circular-slogan.png'/>
              <img className='columnImg' src='images/timefix.png'/>
            </div>
            <div className='textSide observed'>
            <span className='columnNum observed'>3</span>
              <h2>- save time</h2>
              <p>We understand that time is precious, and that's why we've designed Ripped to help you get the most out of your workouts in the shortest amount of time possible.</p>
              <p>Our exercises are designed to be efficient and effective, so you can get a full-body workout in just a few minutes. We offer exercises that target multiple muscle groups at once, allowing you to get the most out of each movement and save time in the process.</p>
              <p>And with our calendar feature, you can easily plan your workouts ahead of time and schedule them at a time that works best for you. You can also track your progress over time and see how much you've accomplished in just a few short minutes each day.</p>
              <p>In addition to our time-saving exercises and calendar feature, we also offer a user profile network where you can connect with other users who are working towards similar goals. This allows you to share your experiences, get tips and advice, and receive support and encouragement from a community of like-minded individuals, all while saving time and getting in shape.</p>
            </div>
          </div>
          {/*  */}
        </div>
      </section>
    </main>
  )
}

export default Home