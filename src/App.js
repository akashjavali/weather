import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';


class App extends Component {
  constructor() {
    super();
    this.fetch();
    this.state = {
      searchfield: '',
      weather: null,
    }
  }

  fetch = () => {}

  onSearchChange = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchfield}&APPID=6f7a3366cf4aee22be9cdcbee81f0b47&units=metric`)
    .then(response=> response.json())
    .then(data => {if (data.cod === 200) {
      this.setState({
        weather:data
      })
    }
    }).catch(err => {
      console.log('err', err)
    }) 
  
  }

  render() {
    return (
      
      <div className='body'>
       <div className = 'top'>
        <h3 className='tb'>Weather</h3>
        <form>
        <input className='tb'type='Search' placeholder='Search Location' id="mySearch" name="q" required autoComplete="on" onChange= {(event)=> 
          this.setState({searchfield: event.target.value})}/>
          </form>
          <button disabled={this.state.searchfield === '' ? true : false} className='tb' onClick={()=>this.onSearchChange()}
          
            >Search</button>
  
            </div>
           {this.state.weather === null ? null :
           <div className='main'>
           <p className='name'> {this.state.weather.name}</p>
           <p className='disc'> {this.state.weather.weather["0"].description}</p>
           <img alt='' src={`http://openweathermap.org/img/w/${this.state.weather.weather["0"].icon}.png`}/>
           <p className='temp'  >{Math.round(this.state.weather.main.temp)}&deg;C</p> 
           <p className='speed'>Speed: {this.state.weather.wind.speed} mph</p>
           <p className='hum'>Humidity: {this.state.weather.main.humidity}%</p>
           
           </div>
           }
           <Particles className='parti'
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "red",
            					blur: 5
            				}
            			}
            		}
            	}}
            />
      </div>
    );
  }
}

export default App;
