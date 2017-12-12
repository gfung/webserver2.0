import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

function WeatherCard(props) {
    return (
        <div className="card">
        {props.date}
        <hr />
        <br />
        {props.summary}
        </div>
    );
}

class Week extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           x:0,
           y:0,
           data:[]
        }
        this.postRequest = this.postRequest.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.xChange = this.xChange.bind(this)
        this.yChange = this.yChange.bind(this)
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }

    xChange(event){
        this.setState({x:event.target.value})
    }
    yChange(event){
        this.setState({y:event.target.value})
    }

    postRequest(){
        axios.post('/weather', {
            x: this.state.x,
            y: this.state.y
        })
        .then( (response)=> {
            console.log(response.data)
            this.setState({data:response.data})
        })
        .catch( (error)=> {
            console.log(error);
        });
    }
    
    renderWeatherCard(i) {
        let final=""
        let date=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-i).toLocaleDateString();;
        if(this.state.data.length){
            let temp = this.state.data[i]
            // let keys = Object.keys(temp.daily.data[0])
            date = new Date(temp.daily.data[0].time*1000 ).toLocaleDateString()
            final = temp.daily.data[0].summary
        }
        return (
            <WeatherCard
                summary={final}
                date={date}
            />
        )
    }

    render() {

        return (
            <div className="forecast">
                <div>
                    {this.renderWeatherCard(0)}
                    {this.renderWeatherCard(1)}
                    {this.renderWeatherCard(2)}
                    {this.renderWeatherCard(3)}
                    {this.renderWeatherCard(4)}
                    {this.renderWeatherCard(5)}
                    {this.renderWeatherCard(6)}
                </div>
                <form className="input" id="form" method="post" action="/weather">
                    <label>Latitude</label>
                    <input type="number" name="x" value={this.state.x} onChange={this.xChange} />
                    <label>Longitude</label>
                    <input type="number" name="y" value={this.state.y} onChange={this.yChange}/>
                    <br />
                    <button type="button" value="Submit" onClick={this.postRequest}>Submit</button>
                </form>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Week />,
    document.getElementById('root')
);