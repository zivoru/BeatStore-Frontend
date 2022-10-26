import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const types = [
    {url: "/top-charts", img: 'https://i.ibb.co/6gdRtYf/1.png', title: "Топ чарт", opacity: 0.1},
    {url: "/free-beats", img: 'https://i.ibb.co/5xs76Th/2.png', title: 'Бесплатные биты', opacity: 0.2},
    {url: "/playlists", img: 'https://i.ibb.co/9r2fTy6/3.png', title: "Плейлисты", opacity: 0.1},
    {url: "/beatmakers", img: 'https://i.ibb.co/GRxMh45/4.png', title: "Битмейкеры", opacity: 1},
]

class Beatmakers extends Component {
    state = {
        users: null,
        nameFilter: "",
        size: 12,
        position: 100,
        loading: false
    }

    componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.getUsers("");
        this.loading();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.size !== this.state.size) {

            let filters;
            if (this.state.nameFilter !== null && this.state.nameFilter !== "") {
                filters = "nameFilter=" + this.state.nameFilter + "&"
            }

            this.getUsers(filters);
            this.loadingSize();
        }
    }

    loading() {
        this.setState({loading: true})
        setTimeout(() => this.setState({loading: false}), 500)
    }

    loadingSize() {
        this.setState({loadingSize: true})
        setTimeout(() => this.setState({loadingSize: false}), 500)
    }

    getUsers = (filters) => {
        axios.get("/api/v1/users/findAll?" + filters + "page=0&size=" + this.state.size).then(res => {
            this.setState({users: res.data.totalElements === 0 ? "empty" : res.data.content})
        }).catch(() => {
            this.setState({users: "empty"})
        })
    }

    changeFilterName = (event) => {
        this.setState({nameFilter: event.target.value})
        this.getUsers(event.target.value !== "" ? "nameFilter=" + event.target.value + "&" : "");
        this.loading();
    }

    render() {

        document.title = "Битмейкеры | BeatStore"

        window.onscroll = () => {
            const scrollTopPosition = document.documentElement.scrollTop;
            if (scrollTopPosition > this.state.position) {
                this.setState({
                    size: this.state.size + 12,
                    position: this.state.position + 500
                })
            }
        }

        let beatmakers;

        if (this.state.users !== null && this.state.users !== "empty") {
            beatmakers =
                <div>
                    <div className="grid-users" style={{paddingBottom: 150, position: "relative"}}>
                        {this.state.users.map((user, index) => {
                            return (
                                <div className="grid-users-item" key={index}>
                                    <Link to={"/" + user.username} className="inl-blk user-img-container b-r999 trs ho">
                                        <img className="user-img"
                                             src={user.profile.imageName !== null && user.profile.imageName !== "" ?
                                                 `/resources/user-${user.id}/profile/${user.profile.imageName}`
                                                 : 'https://i.ibb.co/KXhBMsx/default-avatar.webp'} alt="avatar"/>
                                    </Link>

                                    <div className="grid-item">
                                        <div className="flex-jc mt16 w126">
                                            <Link to={"/" + user.username} className="fw400 fs14 hu wnohte"
                                                  title={user.profile.displayName}>
                                                {user.profile.displayName}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {this.state.loadingSize
                            ? <div className="top-charts-loading-size">
                                <div className="lds-spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
        } else if (this.state.playlists === "empty") {
            beatmakers = <div className="qwe-null"></div>
        }

        return (
            <div>

                <div className="wrapper" style={{paddingBottom: 0}}>

                    <div className="container flex-c filters mb16">
                        <div className="title">
                            <h1>Битмейкеры</h1>
                        </div>
                    </div>

                    <div className="container mb16">
                        <div className="grid-genres" style={{gridAutoRows: 100}}>

                            {types.map((type, index) => (
                                <div className="grid-genres-item" key={index}>
                                    <Link to={type.url} className="inl-blk genre-img trs"
                                          style={{height: "100%", position: "relative"}}>
                                        <img className="slide-img-genre" src={type.img}
                                             alt={type.title} style={{opacity: type.opacity}}/>

                                        <h3 className="type fs20 fw500">{type.title}</h3>
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="container flex-c-sb filters mb10">
                        <form className="dsdsewe" style={{margin: 0}}>
                            <img src={'https://i.ibb.co/KrWXzJ1/search.png'}
                                 width="17px" alt="search" className="df_ge__ewe"/>

                            <input type="text" className="__dfdfo-kji_" placeholder="Введите никнейм"
                                   onChange={this.changeFilterName}/>
                        </form>
                    </div>

                    <div className="container">
                        {this.state.loading
                            ? <div className="top-charts-loading-container" style={{position: "initial"}}>
                                <div className="lds-spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            : beatmakers}
                    </div>
                </div>

            </div>
        );
    }
}

export {Beatmakers}