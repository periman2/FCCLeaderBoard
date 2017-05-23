var React = require("react");
var axios = require("axios");

var API_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/";
var FCC_URL = "https://www.freecodecamp.com/";

class LeaderBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {campers: [], columns: ["#", 'Camper Name', 'Points in Past 30 Days', 'Alltime Points']};
        this.fetchCampers = this.fetchCampers.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.fetchCampers('recent');
    }
    fetchCampers(camper){
        var URL = API_URL + camper;
        
        axios.get(URL)
        .then(function(res){
            this.setState({
                campers: this.formatCampers(res.data)
            });
        }.bind(this));
    }
    handle
    formatCampers(campers) {
        return campers.map(function(camper, index){
            var username = "<img alt='" 
            + camper.username + 
            "' src='" + 
            camper.img + 
            "'/><a href='" + FCC_URL + camper.username + "' target='_blank'>" 
            + camper.username + 
            "</a>";
            return {
                "index": index + 1,
                'Name': username,
                'Recent': camper.recent,
                'Alltime': camper.alltime
            }
        })
    }
    handleClick(event){
        var value  = event.target.getAttribute('value');
        this.fetchCampers(value);
    }
    render() {
        var columns = [];
        var rows = [];
        var cols = this.state.columns;
        for(var i = 0; i < cols.length; i ++) {
            console.log("IM IN")
            if(cols[i] === "Points in Past 30 Days") { 
                columns.push(<th key={i} value="recent" onClick={this.handleClick}>{cols[i]}</th>);
            } else if (cols[i] ===  'Alltime Points') {
                columns.push(<th key={i} value="alltime" onClick={this.handleClick}>{cols[i]}</th>);  
            } else {
                columns.push(<th key={i} >{cols[i]}</th>);
            }
        }
        this.state.campers.forEach(function(camper, index){
            rows.push(
            <tr key={index}>
                <td>{camper.index}</td>
                <td className="names" dangerouslySetInnerHTML={{__html: camper.Name}}></td>
                <td>{camper.Recent}</td>
                <td>{camper.Alltime}</td>
            </tr>
            )
        })
        return(
            <table>
                <tbody>
                    <caption>Leaderboard</caption>
                    <tr>
                        {columns}
                    </tr>
                    {rows}
                </tbody>
            </table>
        )
    }
}

module.exports = LeaderBoard;