import React, {Component} from "react";
import axios from "axios";
import Beats from "./components/Beats";
import {Link} from "react-router-dom";

class Tag extends Component {
    state = {
        user: null,
        tags: [],
        tag: null,
        beats: null,
        page: 0,
        totalPages: null,
        size: 14,
        position: 50,
    }

    componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})
        this.setState({user: this.props.user})
        this.addBeatsToState()

        axios.get("/api/v1/tags?page=0&size=28").then(res => {
            this.setState({tags: res.data.totalElements === 0 ? "empty" : res.data.content})
        }).catch(() => {
            this.setState({tags: "empty"})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) this.setState({user: this.props.user});
        if (prevProps.tagId !== this.props.tagId) this.addBeatsToState();
        if (prevState.size !== this.state.size) {
            this.addBeatsToState();
            this.loadingSize();
        }
    }

    searchTags = (event) => {
        if (event.target.value !== null) {
            axios.get("/api/v1/tags?nameFilter=" + event.target.value + "&page=0&size=28").then(response => {
                this.setState({
                    tags: response.data.totalElements === 0 ? "empty" : response.data.content
                })
            })
        } else {
            axios.get("/api/v1/tags?page=0&size=28").then(response => {
                this.setState({
                    tags: response.data.content
                })
            })
        }
    }

    loadingSize() {
        this.setState({loadingSize: true})
        setTimeout(() => this.setState({loadingSize: false}), 500)
    }

    addBeatsToState = () => {
        axios.get("/api/v1/beats/findAllByTag/" + this.props.tagId + "?page=0&size=" + this.state.size).then(res => {
            this.setState({
                beats: res.data.totalElements === 0 ? "empty" : res.data.content,
                totalPages: res.data.totalPages
            })
        }).catch(() => {
            this.setState({beats: "empty"})
        })

        axios.get("/api/v1/tags/" + this.props.tagId).then(res => {
            this.setState({tag: res.data})
        }).catch(() => {
            this.setState({tag: "empty"})
        })
    }

    render() {

        let nameGenre;

        if (this.state.tag !== null && this.state.tag !== "empty") {
            nameGenre = this.state.tag.name;
        }
        document.title = nameGenre + " | BeatStore"


        window.onscroll = () => {
            const scrollTopPosition = document.documentElement.scrollTop;
            if (scrollTopPosition > this.state.position) {
                this.setState({
                    size: this.state.size + 12,
                    position: this.state.position + 500
                })
            }
        }


        let beats;

        if (this.state.beats !== null && this.state.beats !== "empty") {
            beats =
                <div style={{paddingBottom: 150, position: "relative"}}>


                    <Beats beats={this.state.beats}
                           openLicenses={this.props.openLicenses}
                           setAudio={this.props.setAudio}
                           openDownload={this.props.openDownload}
                           user={this.props.user}
                           btnPause={this.props.btnPause}
                           btnPlay={this.props.btnPlay}
                           playback={this.props.playback}
                           playBeatId={this.props.playBeatId}
                    />

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
        } else if (this.state.beats === "empty") {
            beats = <div className="qwe-null"></div>
        }

        return (
            <div>

                <div className="wrapper" style={{paddingBottom: 0}}>
                    <div className="container">
                        <h1 className="qwe1-title">
                            #{nameGenre}
                            <span className="fs14 fw300 color-g1">все биты с этим тегом</span>
                        </h1>
                    </div>
                </div>

                <div className="vfs34fhr">
                    <div className="top-tags">

                        <div className="sdfsdvs">
                            <form className="dsdsewe">
                                <img src={'https://i.ibb.co/KrWXzJ1/search.png'}
                                     width="17px" alt="search" className="df_ge__ewe"/>

                                <input type="text" className="__dfdfo-kji_" placeholder="Поиск по тегам"
                                       onChange={this.searchTags}/>
                            </form>
                            {this.state.tags !== "empty" ? this.state.tags.map((tag, index) => {
                                return (<Link to={"/tag/" + tag.id} className="n3lxs45" key={index}>{tag.name}</Link>)
                            }) : null}
                        </div>
                    </div>
                </div>

                <div className="wrapper" style={{paddingBottom: 0}}>
                    <div className="container">
                        {beats}
                    </div>
                </div>

            </div>
        );
    }
}

export {Tag}