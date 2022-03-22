import Header from './Header.js';
import Stopwatch from './stopwatch.js';
import Countdown from './countdown.js';
import React from 'react';

class App extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            showTimer:false,
            showCountDown:false,
        }
    }
    handleClick=  (value) => {
        if(value === "stopwatch"){
            this.setState((prev) => {
                return {
                    showTimer: !prev.showTimer,
                }
                })
        }
        if(value === "countDown"){
            this.setState((prev) => {
                return {
                    showCountDown: !prev.showCountDown,
                }
                })
        }
    }
        render(){
            return (
                <>
                    <Header />
                    <div className='both-btns'>
                        {
                            (this.state.showTimer ? <Stopwatch handleClick={(value) => this.handleClick(value)} /> : <button onClick={() => this.handleClick("stopwatch")} className='stopwatch-btn' >Show stopwatch</button> )
                        }
                        {
                            (this.state.showCountDown ? <Countdown  handleClick={(value) => this.handleClick(value)} /> : <button  onClick={() => this.handleClick("countDown")} className='countdown-btn' >Show countdown</button> )
                        }
                    </div>
            </>
        )
    }
}

export default App;