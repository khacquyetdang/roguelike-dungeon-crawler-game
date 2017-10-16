import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';
import Slider from 'react-rangeslider';
import { toggleSound, setVolume } from '../actions';
// To include the default styles
import 'react-rangeslider/lib/index.css';

class Toolsbar extends Component {

    getPlayerName() {
        if (this.props.games.player !== undefined && this.props.games.player !== null) {
            return this.props.games.player.getName();
        }
        return "";
    }
    toggleSound = () => {
        this.props.toggleSound();
    }

    handleChange = value => {
        this.props.setVolume(value);
    };

    getAttack = () => {
        if (this.props.games.player !== undefined && this.props.games.player !== null) {
            return this.props.games.player.attack; 
        }
        return 0;
    }

    render() {
        return (<div
            className="Toolsbar">
            <div className="Health">Health : {this.props.games.health + "   "} &nbsp; </div>
            <div className="Weapon"> Weapon :stick &nbsp;</div>
            <div className="Attack"> Attack : { this.getAttack() } &nbsp;</div>
            <div className="Hero">  You are: {this.getPlayerName()}&nbsp;</div>
            <div className="Experience"> Experience : {this.props.games.experience} &nbsp;</div>
            <div className="Dungeon"> Dungeon : {this.props.games.level} &nbsp;</div>
            <div className="Sound slider-horizontal"> Sound : &nbsp;
            <Slider
                className="soundSlider"
                    min={0}
                    max={100}
                    value={this.props.games.volume}
                    onChange={this.handleChange}
                />
                &nbsp;</div>
        </div>)
    }
}
function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, { toggleSound, setVolume })(Toolsbar);