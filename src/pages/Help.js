import React, {Component} from 'react';

class Help extends Component {

    render() {

        document.title = 'BeatStore | Помощь';
        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <div className="empty">
                            <h1 className="fs40 fw900">В разработке</h1>
                            <span className="mt16" style={{letterSpacing: 3}}>Данный раздел находится на стадии разработки.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;