import { useContext } from "react"
import DataContext from '../context/DataContext.js'
const LoadingScreen = () => {
  const {smlLoad}=useContext(DataContext)
  return (
    <div id="loadingLine" style={{transform:smlLoad ? 'translateY(0%)' : 'translateY(100%)'}}>
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