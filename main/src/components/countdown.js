import React from 'react';



class Countdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isCountActiv:false,
            isCountPaused:false,
            seconds: 0,
            minutes: 0,
            hours: 0,
        }
        this.count = 0;
        this.timerID = null;

    };

    handleCountBtnsClick = (value) => {
        if(value === "start"){
            this.setState((prev) => {
                return{
                    isCountActiv: !prev.isCountActiv,
                }
            })
        }
        if(value === "pause" || value === "resume"){
            this.setState((prev) => {
                return{
                    isCountActiv: !prev.isCountActiv,
                    isCountPaused: !prev.isCountPaused,
                }
            })
        }
        if(value === "reset"){
            this.count = 0;
            this.setState((prev) => {
                return{
                    isCountActiv: false,
                    isCountPaused: false,
                    seconds:0,
                    minutes:0,
                    hours:0,
                }
            })
        }
    };
    handleIncDecClick = (value) => {
        // if(this.state.seconds && this.state.minutes && this.state.seconds){
        if(value === "incHour"){
            this.setState((prev) => {
                return {
                    hours:prev.hours + 1,
                }
            })
        }
        if(value === "decHour"){
            this.setState((prev) => {
                return {
                    hours:prev.hours >= 1 ? prev.hours - 1 : prev.hours,
                }
            })
        }
        if(value === "incMin"){
            this.setState((prev) => {
                return {
                    minutes:prev.minutes <=58 ? prev.minutes + 1 : 0,
                    hours: prev.minutes === 59 ? prev.hours + 1 : prev.hours,
                }
            })
        }
        if(value === "decMin"){
            this.setState((prev) => {
                return {
                    minutes: prev.minutes >= 1 ? prev.minutes - 1 : prev.hours >= 1 ? 59 : prev.minutes,
                    hours: (prev.hours >= 1 && prev.minutes === 0) ? prev.hours - 1 : prev.hours,
                }
            })
        }
        if(value === "incSec"){
            this.setState((prev) => {
                return {
                    seconds:prev.seconds <=58 ? prev.seconds + 1 : 0,
                    minutes: prev.seconds === 59 && prev.minutes <= 58 ? prev.minutes + 1 : 0, //bug
                    hours: prev.minutes === 59   && prev.seconds === 59 ? prev.hours + 1 : prev.hours,
                }
            })
        }
        if(value === "decSec"){
            this.setState((prev) => {
                return {
                    seconds:prev.seconds >= 1 ? prev.seconds - 1 : (prev.hours >= 1 || prev.minutes >=1) ? 59 : 0,
                    minutes: (prev.minutes >= 1 && prev.seconds === 0) ? prev.minutes - 1 : prev.hours >= 1 ? 59 : 0,
                    hours: (prev.hours >= 1 && prev.minutes === 0) ? prev.hours - 1 : 0,
                }
            })
        }
    // }
    }

    getCountBtns = () => {
        if(this.state.isCountActiv){
            return <button onClick={() => this.handleCountBtnsClick("pause")} >Pause</button>
        }
        if(this.state.isCountPaused){
            return <>
                <button onClick={() => this.handleCountBtnsClick("resume")} >Resume</button>
                <button onClick={() => this.handleCountBtnsClick("reset")} >Reset</button>
                </>
        }
        if(!this.state.isCountActiv){
            return <button onClick={() => this.handleCountBtnsClick("start")} >Start</button>
        };
    }
    render(){
        return (
            <section className='main-countdown'>
                <span onClick={() => this.props.handleClick("countDown")} className='cross-btn'>X</span>
                <h2>Countdown</h2>
                <div className='count-down'>
                    <div className='c-hours'>
                        Hours
                        <button onClick={()=> this.handleIncDecClick("incHour")} >⬆</button>
                        <span>{`0${this.state.hours}`.slice(-2)}</span>
                        <button onClick={()=> this.handleIncDecClick("decHour")} >⬇</button>
                    </div>
                    :
                    <div className='c-minutes'>
                        Minutes
                        <button onClick={()=> this.handleIncDecClick("incMin")} >⬆</button>
                        <span>{`0${this.state.minutes}`.slice(-2)}</span>
                        <button onClick={()=> this.handleIncDecClick("decMin")} >⬇</button>
                    </div>
                    :
                    <div className='c-sec'>
                        Seconds
                        <button onClick={()=> this.handleIncDecClick("incSec")} >⬆</button>
                        <span>{`0${this.state.seconds}`.slice(-2)}</span>
                        <button onClick={()=> this.handleIncDecClick("decSec")} >⬇</button>
                    </div>
                    
                </div>
                <div className='all-btns'>
                {
                    (this.getCountBtns())
                }
                </div>
            </section>
        )
    }
}

export default Countdown;