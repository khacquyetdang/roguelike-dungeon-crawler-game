import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../generated/components/styles/ConsoleLog.css';
//import _ from 'lodash';
class ConsoleLog extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);
    }
    render() {
        var messageToShow = 20;
        var beginIndex = Math.max(0, this.props.messages.length - messageToShow);
        var messageList = <div></div>;
        if (this.props.messages.length > 0)
        {
            messageList = this.props.messages.slice(beginIndex).reverse().map((message, index) => {
                return <div key={index} className="messageItem">{message}</div>;
            });
        }
        return (
                <div
                    className="messageList" >
                    {messageList}
                </div>
        )
    }
}

function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps, null)(ConsoleLog);
