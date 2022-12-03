import React from 'react'
import './App.css'
import Presenter from '../Presenter/Presenter'

function App() {
const [state, setState] = React.useState({colors:[],count:6,mode:'complement',seed:{hex:{value:'#FF0000', clean:'FF0000'}}})

const presenterList = state.colors.map((ele)=>{
  return <Presenter key={ele.hex.clean} info={ele} />
})

React.useEffect(()=>{

},[])

function handleApi(hex,mode,count){
  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
    .then(res=>res.json())
    .then(data=> {
      let newColors = [...data.colors]
      let nMode = data.mode;
      let nHex = data.seed.hex;
      let nSeed = {hex:nHex};

      setState((prevState)=>{
        return {...prevState, mode:nMode, colors:newColors, seed:nSeed}
      })
    })
}

function handleChange(event){
  let newValue = event.target.value;
  let newClean = event.target.value.slice(1);
  let newHex = {value:newValue, clean:newClean};
  let newSeed = state.seed;
  newSeed.hex = newHex;
  setState((prevState)=>{
    return {...prevState, seed:newSeed}
  })
}

function handleSelect(event){
  let newMode = event.target.value;
  setState((prevState)=>{
    return {...prevState, mode:newMode}
  })
}

function handleSubmit(event){
  event.preventDefault()
  console.log('handle Submit called')
  handleApi(state.seed.hex.clean,state.mode,state.count);
}


  return (
    <div className="--app-app-container">
      <div className='--app-form-container'>
        <form className='--app-form-control'>
          <div className='--form-color-container'>
              <input className='--form-color-input' type='color' style={{borderColor:state.seed.hex.value, backgroundColor:'white'}} value={state.seed.hex.value} onChange={(event)=>handleChange(event)}/>
          </div>
          <div className='--form-select-container'>
              <select className="--form-select-box" style={{borderColor:state.seed.hex.value, backgroundColor:'white'}} value={state.mode} onChange={(event)=>handleSelect(event)}>
                  <option defaultValue value="none">Make a selection</option>
                  <option value="monochrome">monochrome</option>
                  <option value="monochrome-dark">monochrome-dark</option>
                  <option value="monochrome-light">monochrome-light</option>
                  <option value="analogic">analogic</option>
                  <option value="complement">complement</option>
                  <option value="analogic-complement">analogic-complement</option>
                  <option value="triad">triad</option>
                  <option value="quad">quad</option>
              </select>
          </div>
          <div className='--form-button-container'>
              <button className='--form-button-btn' style={{borderColor:state.seed.hex.value, backgroundColor:'white'}} onClick={handleSubmit} type="submit">Get Scheme</button>
          </div>
        </form>
      </div>
      <div className='--app-presenter-container'>
        {presenterList}
      </div>  
    </div>
  )
}

export default App
