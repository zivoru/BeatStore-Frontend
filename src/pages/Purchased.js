import React, {Component} from "react";

class Purchased extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})
        this.setState({user: this.props.user})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) this.setState({user: this.props.user})
    }

    render() {

        if (this.state.user !== null && this.state.user !== undefined && this.state.user !== "empty") {
            document.title = this.state.user.profile.displayName + " | Купленные"
        }

        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <div className="qwe-null">
                            <h1 className="qwe1-title">
                                Купленные
                                <span className="fs14 fw300 color-g1">покупок пока что нет</span>
                                <div className="empty" style={{paddingTop: 32}}>
                                    <img src={"https://i.ibb.co/X81cS7L/inbox.png"}
                                         alt="inbox" width="70"/>
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export {Purchased}