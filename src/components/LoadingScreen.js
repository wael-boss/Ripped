import { useContext } from "react"
import DataContext from '../context/DataContext.js'
const LoadingScreen = () => {
  const {isLoading}=useContext(DataContext)
  return (
    <div id="loadingLine" style={{transform:isLoading ? 'translateY(0%)' : 'translateY(calc(100% + 10px))'}}>
        <div id='loadingLineContent'>
        <img src='/images/biking.gif'/>
        <div>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
            <span><img src='images/chaker.png'/></span>
            <span><img src='images/whey.png'/></span>
            <span><img src='images/creatine.png'/></span>
        </div>
        </div>
    </div>
  )
}

export default LoadingScreen