import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Toolsbar from './Toolsbar';
import Game from './Game';
import '../generated/components/styles/App.css';
import {
    generateNextLevel
} from '../actions';

class App extends Component {

    constructor() {
        super();
    }





    componentDidMount() {
        this.props.generateNextLevel();
    }


    render() {

        //console.log("map BSPTree", map);

        return (
            <div className="App">
                <Toolsbar />
                <Game ref="games" />
            </div>
        );
    }

}


export default connect(null,
    {       
        generateNextLevel
    }
)(App);