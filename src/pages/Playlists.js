import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const types = [
    {url: "/top-charts", img: 'https://i.ibb.co/6gdRtYf/1.png', title: "Топ чарт", opacity: 0.1},
    {url: "/free-beats", img: 'https://i.ibb.co/5xs76Th/2.png', title: 'Бесплатные биты', opacity: 0.2},
    {url: "/playlists", img: 'https://i.ibb.co/9r2fTy6/3.png', title: "Плейлисты", opacity: 1},
    {url: "/beatmakers", img: 'https://i.ibb.co/GRxMh45/4.png', title: "Битмейкеры", opacity: 0.1},
]

class Playlists extends Component {
    state = {
        playlists: null,
        nameFilter: "",
        size: 12,
        position: 100,
    }

    componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})
        this.getPlaylists("");
        this.loading();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.size !== this.state.size) {

            let filters;
            if (this.state.nameFilter !== null && this.state.nameFilter !== "") {
                filters = "nameFilter=" + this.state.nameFilter + "&"
            }

            this.getPlaylists(filters);
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

    getPlaylists = (filters) => {
        axios.get("/api/v1/playlists/findAll?" + filters + "page=0&size=" + this.state.size).then(res => {
            this.setState({playlists: res.data.totalElements === 0 ? "empty" : res.data.content,})
        }).catch(() => {
            this.setState({playlists: "empty"})
        })
    }

    changeFilterName = (event) => {
        this.setState({nameFilter: event.target.value})
        this.getPlaylists(event.target.value !== "" ? "nameFilter=" + event.target.value + "&" : "");
        this.loading();
    }

    render() {
        document.title = "Плейлисты | BeatStore"

        window.onscroll = () => {
            const scrollTopPosition = document.documentElement.scrollTop;
            if (scrollTopPosition > this.state.position) {
                this.setState({
                    size: this.state.size + 12,
                    position: this.state.position + 500
                })
            }
        }

        let playlists;

        if (this.state.playlists !== null && this.state.playlists !== "empty") {
            playlists =
                <div style={{paddingBottom: 150, position: "relative"}}>

                    <div className="grid-table">
                        {this.state.playlists.map((playlist, index) => {
                            return (
                                <div key={index}>
                                    <span className="back-layer"></span>

                                    <span className="front-layer"></span>

                                    <Link to={"/playlist/" + playlist.id}
                                          className="slide-img-container playlist-img-container">
                                        <Link to={"/playlist/" + playlist.id} className="inl-blk trs">
                                            <img className="slide-img playlist-img"
                                                 src={playlist.imageName !== null && playlist.imageName !== "" ?
                                                     `/resources/user-${playlist.user.id}/playlists/playlist-${playlist.id}/${playlist.imageName}`
                                                     : 'https://i.ibb.co/9GFppbG/photo-placeholder.png'}
                                                 alt="photo-placeholder"/>
                                        </Link>
                                    </Link>

                                    <div className="grid-item" style={{position: "relative"}}>

                                        <h5 className="fs14 fw400 color-g1">
                                            {playlist.beatCount} • {playlist.likesCount}
                                        </h5>

                                        <div className="sl-gr-it">
                                            <Link to={"/playlist/" + playlist.id}
                                                  className="fs12 fw400 hu wnohte"
                                                  title={playlist.name}>
                                                {playlist.name}
                                            </Link>
                                        </div>

                                        <div className="sl-gr-it">
                                            <Link to={"/" + playlist.user.username}
                                                  className="fs12 fw400 color-g1 mr5 hu wnohte"
                                                  title={playlist.user.profile.displayName}>
                                                {playlist.user.profile.displayName}
                                            </Link>

                                            {playlist.user.verified === true ?
                                                <img src={'https://i.ibb.co/T8GczJ3/account-verified.webp'}
                                                     alt="verified"/> : null}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

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
        } else if (this.state.playlists === "empty") {
            playlists =
                <div className="qwe-null">
                </div>
        }

        return (
            <div>

                <div className="wrapper" style={{paddingBottom: 0}}>

                    <div className="container flex-c filters mb16">
                        <div className="title">
                            <h1>Плейлисты</h1>
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

                    <div className="container flex-c-sb filters mb32">
                        <form className="dsdsewe" style={{margin: 0}}>
                            <img src={'https://i.ibb.co/KrWXzJ1/search.png'}
                                 width="17px" alt="search" className="df_ge__ewe"/>

                            <input type="text" className="__dfdfo-kji_" placeholder="Введите название плейлиста"
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
                            : playlists}
                    </div>

                </div>

            </div>
        );
    }
}

export {Playlists}