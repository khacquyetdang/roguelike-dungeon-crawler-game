import React, {
    Component
} from 'react';
import { connect } from 'react-redux';

class Toolsbar extends Component {

    render() {
        return (<div
            className="Toolsbar">
            <div className="Health">Health : {this.props.games.health + "   "} &nbsp; </div>
            <div className="Weapon"> Weapon :stick &nbsp;</div>
            <div className="Attack"> Attack : 7 &nbsp;</div>
            <div className="Level"> Level : 0 &nbsp;</div>
            <div className="Next Level"> Next Level : 100 &nbsp;</div>
            <div className="Dungeon"> Dungeon : 0 &nbsp;</div>
        </div>)
    }
}
function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, null)(Toolsbar);