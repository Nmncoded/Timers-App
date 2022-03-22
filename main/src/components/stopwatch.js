import React from 'react';

class Stopwatch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isActive:false,
            isPaused:false,
            milliSec:0,
            seconds: 0,
            minutes: 0,
            hours: 0,
        }
        this.count = 0;
        this.timerID = null;
    }
    
    handleBtnsClick = (value) => {
        if(value === "start"){

            this.setState((prev) => {
                return{
                    isActive: !prev.isActive,
                }
            })
        }
        if(value === "pause" || value === "resume"){
            this.setState((prev) => {
                return{
                    isActive: !prev.isActive,
                    isPaused: !prev.isPaused,
                }
            })
        }
        if(value === "reset"){
            this.count = 0;
            this.setState((prev) => {
                return{
                    isActive: false,
                    isPaused: false,
                    milliSec:0,
                    seconds:0,
                    minutes:0,
                    hours:0,
                }
            })
        }
    }
    componentDidUpdate(){
        if(this.state.isActive && !this.state.isPaused){
            this.getTime()
        }
        if(!this.state.isActive && this.state.isPaused){
            this.clearTime()
        }
    }
    componentWillUnmount(){
        this.setState({
            milliSec:0,
            seconds:0,
            minutes:0,
            hours:0,
            isActive:false,
            isPaused:false,
        })
    }
    getTime = () => {
        
        if(this.count === 0){
            this.timerID = setInterval(() => {
                // console.log(this.state.milliSec);
                this.setState({
                    milliSec: this.state.milliSec <= 99 ? this.state.milliSec + 1 : 0, 
                    seconds: (this.state.milliSec ===100 && this.state.seconds <= 59 ) ? this.state.seconds + 1: this.state.seconds === 60 ? 0 : this.state.seconds,
                    minutes: this.state.seconds === 60 ? this.state.minutes + 1 : this.state.minutes,
                    hours: this.state.minutes === 60 ? this.state.hours + 1 : this.state.hours,
                })
            }, 10);
        }
        this.count++;
    }
    clearTime = () => {
        clearInterval(this.timerID);
        this.count = 0;
    }
    getBtns = () => {
        if(this.state.isActive){
            return <button onClick={() => this.handleBtnsClick("pause")} >Pause</button>
        }
        if(this.state.isPaused){
            return <>
                <button onClick={() => this.handleBtnsClick("resume")} >Resume</button>
                <button onClick={() => this.handleBtnsClick("reset")} >Reset</button>
                </>
        }
        if(!this.state.isActive){
            return <button onClick={() => this.handleBtnsClick("start")} >Start</button>
        }
    }
    render(){
        return (
            <section className='main-stopwatch'>
                <span onClick={() => this.props.handleClick("stopwatch")} className='cross-btn'>X</span>
                <h1>Stopwatch</h1>
                <div className='stop-watch'>
                    <span>{`0${this.state.hours}`.slice(-2)}</span> : <span>{`0${this.state.minutes}`.slice(-2)}</span> : <span>{`0${this.state.seconds}`.slice(-2)}</span> : <span>{`0${this.state.milliSec}`.slice(-2)}</span>
                </div>
                <div className='all-btns'>
                {
                    (this.getBtns())
                }
                </div>
            </section>
        )
    }
}

export default Stopwatch;
