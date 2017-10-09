import React, {
    Component
} from 'react';
class Toolsbar extends Component {

    render() {
        return (<div
            className="Toolsbar">
            <div className="Health">Health : 100 </div>
            <div className="Weapon"> Weapon :stick </div>
            <div className="Attack"> Attack : 7 </div>
            <div className="Level"> Level : 0 </div>
            <div className="Next Level"> Next Level : 100 </div>
            <div className="Dungeon"> Dungeon : 0 </div>
        </div>)
    }
}

export default Toolsbar;