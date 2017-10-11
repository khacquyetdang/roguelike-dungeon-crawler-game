import React, {
    Component
} from 'react';
import { connect } from 'react-redux';

class Toolsbar extends Component {

    getPlayerName()
    {
        if (this.props.games.player !== null)
        {
            return this.props.games.player.getName();
        }
        return "";
    }
    render() {
        return (<div
            className="Toolsbar">
            <div className="Health">Health : {this.props.games.health + "   "} &nbsp; </div>
            <div className="Weapon"> Weapon :stick &nbsp;</div>
            <div className="Attack"> Attack : 7 &nbsp;</div>
            <div className="Hero">  You are: {this.getPlayerName() }&nbsp;</div>
            <div className="Experience"> Experience : { this.props.games.experience } &nbsp;</div>
            <div className="Dungeon"> Dungeon : 1 &nbsp;</div>
        </div>)
    }
}
function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, null)(Toolsbar);