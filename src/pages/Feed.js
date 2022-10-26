import React, {Component} from "react";

class Feed extends Component {
    state = {}

    render() {

        document.title = "BeatStore | Лента"

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
        );
    }
}

export {Feed}