import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Beats from "./components/Beats";

const types = [
    {url: "/top-charts", img: 'https://i.ibb.co/6gdRtYf/1.png', title: "Топ чарт", opacity: 0.1},
    {url: "/free-beats", img: 'https://i.ibb.co/5xs76Th/2.png', title: 'Бесплатные биты', opacity: 1},
    {url: "/playlists", img: 'https://i.ibb.co/9r2fTy6/3.png', title: "Плейлисты", opacity: 0.1},
    {url: "/beatmakers", img: 'https://i.ibb.co/GRxMh45/4.png', title: "Битмейкеры", opacity: 0.1},
]

class FreeBeats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            beats: null,
            size: 12,
            totalPages: null,
            tags: [],
            tagsNameFilter: null,
            filterGenres: false,
            genre: "",
            genreName: null,
            filterMoods: false,
            mood: "",
            moodName: null,
            filterKeys: false,
            key: "",
            keyName: null,
            filterBpm: false,
            bpmMin: 0,
            bpmMax: 999,
            nameFilter: "",
            position: 200,
            loading: false,
            loadingSize: false
        };
    }

    componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})

        this.setState({user: this.props.user})

        this.addBeatsToState("");
        this.loading();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) this.setState({user: this.props.user})

        if (prevState.size !== this.state.size) {
            let filters = "";

            if (this.state.genre !== "") {
                filters = "genre=" + this.state.genre + "&"
            }

            if (this.state.key !== "") {
                filters = filters + "key=" + this.state.key + "&"
            }

            if (this.state.mood !== "") {
                filters = filters + "mood=" + this.state.mood + "&"
            }

            if (this.state.nameFilter !== "") {
                filters = filters + "nameFilter=" + this.state.nameFilter + "&"
            }

            filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + this.state.bpmMax + "&"

            this.addBeatsToState(filters);
            this.loadingSize();
        }
    }

    addBeatsToState = (filters) => {
        axios.get("/api/v1/beats/top-charts?priceMin=0&priceMax=0&" + filters + "page=0&size=" + this.state.size).then(res => {
            this.setState({
                beats: res.data.totalElements === 0 ? "empty" : res.data.content,
                totalPages: res.data.totalPages,
            })
        }).catch(() => {
            this.setState({beats: "empty"})
        })
    }

    loading() {
        this.setState({loading: true})
        setTimeout(() => this.setState({loading: false}), 500)
    }

    loadingSize() {
        this.setState({loadingSize: true})
        setTimeout(() => this.setState({loadingSize: false}), 500)
    }

    filterGenre = (genre, name) => {
        this.setState({filterGenres: false})
        this.setState({genre: genre})
        this.setState({genreName: name})


        let filters = "";

        if (genre !== "") {
            filters = "genre=" + genre + "&"
        }

        if (this.state.key !== "") {
            filters = filters + "key=" + this.state.key + "&"
        }

        if (this.state.mood !== "") {
            filters = filters + "mood=" + this.state.mood + "&"
        }

        if (this.state.nameFilter !== "") {
            filters = filters + "nameFilter=" + this.state.nameFilter + "&"
        }

        filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + this.state.bpmMax + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    filterMood = (mood, name) => {
        this.setState({filterMoods: false})
        this.setState({mood: mood})
        this.setState({moodName: name})


        let filters = "";

        if (this.state.genre !== "") {
            filters = "genre=" + this.state.genre + "&"
        }

        if (this.state.key !== "") {
            filters = filters + "key=" + this.state.key + "&"
        }

        if (mood !== "") {
            filters = filters + "mood=" + mood + "&"
        }

        if (this.state.nameFilter !== "") {
            filters = filters + "nameFilter=" + this.state.nameFilter + "&"
        }

        filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + this.state.bpmMax + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    filterKey = (key, name) => {
        this.setState({filterKeys: false})
        this.setState({key: key})
        this.setState({keyName: name})

        let filters = "";

        if (this.state.genre !== "") {
            filters = "genre=" + this.state.genre + "&"
        }

        if (key !== "") {
            filters = filters + "key=" + key + "&"
        }

        if (this.state.mood !== "") {
            filters = filters + "mood=" + this.state.mood + "&"
        }

        if (this.state.nameFilter !== "") {
            filters = filters + "nameFilter=" + this.state.nameFilter + "&"
        }

        filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + this.state.bpmMax + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    filterMinBpm = (event) => {
        this.setState({bpmMin: event.target.value})

        let filters = "";

        if (this.state.genre !== "") {
            filters = "genre=" + this.state.genre + "&"
        }

        if (this.state.key !== "") {
            filters = filters + "key=" + this.state.key + "&"
        }

        if (this.state.mood !== "") {
            filters = filters + "mood=" + this.state.mood + "&"
        }

        if (this.state.nameFilter !== "") {
            filters = filters + "nameFilter=" + this.state.nameFilter + "&"
        }

        filters = filters + "bpmMin=" + event.target.value + "&bpmMax=" + this.state.bpmMax + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    filterMaxBpm = (event) => {
        this.setState({bpmMax: event.target.value})

        let filters = "";

        if (this.state.genre !== "") {
            filters = "genre=" + this.state.genre + "&"
        }

        if (this.state.key !== "") {
            filters = filters + "key=" + this.state.key + "&"
        }

        if (this.state.mood !== "") {
            filters = filters + "mood=" + this.state.mood + "&"
        }

        if (this.state.nameFilter !== "") {
            filters = filters + "nameFilter=" + this.state.nameFilter + "&"
        }

        filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + event.target.value + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    changeFilterName = (event) => {
        this.setState({nameFilter: event.target.value})

        let filters = "";

        if (this.state.genre !== "") {
            filters = "genre=" + this.state.genre + "&"
        }

        if (this.state.key !== "") {
            filters = filters + "key=" + this.state.key + "&"
        }

        if (this.state.mood !== "") {
            filters = filters + "mood=" + this.state.mood + "&"
        }

        if (event.target.value !== "") {
            filters = filters + "nameFilter=" + event.target.value + "&"
        }

        filters = filters + "bpmMin=" + this.state.bpmMin + "&bpmMax=" + this.state.bpmMax + "&"

        this.addBeatsToState(filters);

        this.loading();
    }

    render() {

        window.onscroll = () => {
            const scrollTopPosition = document.documentElement.scrollTop;
            if (scrollTopPosition > this.state.position) {
                this.setState({
                    size: this.state.size + 12,
                    position: this.state.position + 500
                })
            }
        }

        let state = this.state;

        document.title = "Бесплатные биты | BeatStore"

        let beats;

        if (state.beats !== null && state.beats !== "empty") {
            beats =
                <div className="wrapper" style={{paddingTop: 32, paddingBottom: 0}}>
                    <div className="container" style={{paddingBottom: 150, position: "relative"}}>

                        <Beats beats={state.beats}
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
                </div>
        } else if (state.beats === "empty") {
            beats =
                <div className="wrapper" style={{paddingTop: 32}}>
                    <div className="container">
                        <div className="empty">
                            <img src={"https://i.ibb.co/X81cS7L/inbox.png"} alt="inbox" width="70"/>
                        </div>
                    </div>
                </div>
        }

        return (
            <div>
                <div className="wrapper" style={{paddingBottom: 0}}>

                    <div className="container flex-c filters mb16">
                        <div className="title">
                            <h1>Бесплатные биты</h1>
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

                    <div className="container flex-c-sb filters">

                        <div className="flex-c filters">
                            <div className="filter-cont">
                                <button className="filter flex-c-c"
                                        style={state.genreName !== null ? {color: "white"} : null}
                                        onClick={() => this.setState({filterGenres: !state.filterGenres})}>

                                    {state.genreName === null ? "Все жанры" : state.genreName}

                                    <img src={'https://i.ibb.co/1MwbwJb/arrow.png'} width="8px"
                                         className="filter-arrow" alt="arrow"/>
                                </button>

                                {state.filterGenres ?
                                    <div className="pop-up-container">
                                        <div className="pop-up-filter">
                                            <button onClick={this.filterGenre.bind(this, "", "Все жанры")}
                                                    style={state.genreName === "Все жанры"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Все жанры
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "RAP", "Рэп")}
                                                    style={state.genreName === "Рэп"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Рэп
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "HIP_HOP", "Хип-хоп")}
                                                    style={state.genreName === "Хип-хоп"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Хип-хоп
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "POP", "Поп")}
                                                    style={state.genreName === "Поп"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Поп
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "POP_RAP", "Поп-рэп")}
                                                    style={state.genreName === "Поп-рэп"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Поп-рэп
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "HOOKAH_RAP", "Кальянный рэп")}
                                                    style={state.genreName === "Кальянный рэп"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Кальянный рэп
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "HYPERPOP", "HYPERPOP")}
                                                    style={state.genreName === "Hyperpop"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Hyperpop
                                            </button>
                                            <button
                                                onClick={this.filterGenre.bind(this, "DETROIT_RAP", "DETROIT_RAP")}
                                                style={state.genreName === "Detroit"
                                                    ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                    : null}>Detroit
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "ROCK", "Рок")}
                                                    style={state.genreName === "Рок"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Рок
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "POP_ROCK", "Поп-рок")}
                                                    style={state.genreName === "Поп-рок"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Поп-рок
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "DRILL", "DRILL")}
                                                    style={state.genreName === "DRILL"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>DRILL
                                            </button>
                                            <button onClick={this.filterGenre.bind(this, "REGGAE", "Рэгги")}
                                                    style={state.genreName === "Рэгги"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>Рэгги
                                            </button>
                                        </div>
                                    </div>
                                    : null}
                            </div>

                            <div className="filter-cont">
                                <button className="filter flex-c-c"
                                        style={state.bpmMin !== 0 || state.bpmMax !== 999 ? {color: "white"} : null}
                                        onClick={() => this.setState({filterBpm: !state.filterBpm})}>
                                    BPM
                                    <img src={'https://i.ibb.co/1MwbwJb/arrow.png'} width="8px"
                                         className="filter-arrow" alt="arrow"/>
                                </button>

                                {state.filterBpm ?
                                    <div className="pop-up-container" style={{padding: "16px 0", height: "initial"}}>
                                        <div className="pop-up-filter" style={{padding: 0}}>

                                            <label htmlFor="bpm-min" className="ml10 fs12 fw400"
                                                   style={{color: "#959595"}}>
                                                мин. BPM
                                            </label>

                                            <input id="bpm-min" type="number" value={this.state.bpmMin}
                                                   onChange={this.filterMinBpm}/>

                                            <label htmlFor="bpm-max" className="ml10 fs12 fw400"
                                                   style={{color: "#959595"}}>
                                                макс. BPM
                                            </label>

                                            <input id="bpm-max" type="number" value={this.state.bpmMax}
                                                   onChange={this.filterMaxBpm}/>

                                        </div>
                                    </div>
                                    : null}
                            </div>

                            <div className="filter-cont">
                                <button className="filter flex-c-c"
                                        style={state.keyName !== null ? {color: "white"} : null}
                                        onClick={() => this.setState({filterKeys: !state.filterKeys})}>

                                    {state.keyName === null ? "Тональность" : state.keyName}
                                    <img src={'https://i.ibb.co/1MwbwJb/arrow.png'} width="8px"
                                         className="filter-arrow" alt="arrow"/>
                                </button>

                                {state.filterKeys ?
                                    <div className="pop-up-container right-pop-up">
                                        <div className="pop-up-filter">
                                            <button onClick={this.filterKey.bind(this, "", "Все Тональности")}
                                                    style={state.keyName === "Все Тональности"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Все Тональности
                                            </button>

                                            <button onClick={this.filterKey.bind(this, "CMJ", "До мажор")}
                                                    style={state.keyName === "До мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                До мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "FMJ", "Фа мажор")}
                                                    style={state.keyName === "Фа мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Фа мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "DMJ", "Ре мажор")}
                                                    style={state.keyName === "Ре мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ре мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "BBMJ", "Си бемоль мажор")}
                                                    style={state.keyName === "Си бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Си бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "AMJ", "Ля мажор")}
                                                    style={state.keyName === "Ля мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ля мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "EBMJ", "Ми бемоль мажор")}
                                                    style={state.keyName === "Ми бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ми бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "EMJ", "Ми мажор")}
                                                    style={state.keyName === "Ми мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ми мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "ABMJ", "Ля бемоль мажор")}
                                                    style={state.keyName === "Ля бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ля бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "HMJ", "Си мажор")}
                                                    style={state.keyName === "Си мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Си мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "DBMJ", "Ре бемоль мажор")}
                                                    style={state.keyName === "Ре бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Ре бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "FDMJ", "Фа# мажор")}
                                                    style={state.keyName === "Фа# мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Фа# мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "GBMJ", "Соль бемоль мажор")}
                                                    style={state.keyName === "Соль бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Соль бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "CDMJ", "До# мажор")}
                                                    style={state.keyName === "До# мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                До# мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "CBMJ", "До бемоль мажор")}
                                                    style={state.keyName === "До бемоль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                До бемоль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "GMJ", "Соль мажор")}
                                                    style={state.keyName === "Соль мажор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Соль мажор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "AM", "ля минор")}
                                                    style={state.keyName === "ля минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ля минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "GM", "соль минор")}
                                                    style={state.keyName === "соль минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                соль минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "HM", "си минор")}
                                                    style={state.keyName === "си минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                си минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "CM", "до минор")}
                                                    style={state.keyName === "до минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                до минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "FDM", "фа# минор")}
                                                    style={state.keyName === "фа# минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                фа# минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "FM", "фа минор")}
                                                    style={state.keyName === "фа минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                фа минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "CDM", "до# минор")}
                                                    style={state.keyName === "до# минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                до# минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "BBM", "си бемоль минор")}
                                                    style={state.keyName === "си бемоль минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                си бемоль минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "GDM", "соль# минор")}
                                                    style={state.keyName === "соль# минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                соль# минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "EBM", "ми бемоль минор")}
                                                    style={state.keyName === "ми бемоль минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ми бемоль минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "DDM", "ре# минор")}
                                                    style={state.keyName === "ре# минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ре# минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "ABM", "ля бемоль минор")}
                                                    style={state.keyName === "ля бемоль минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ля бемоль минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "ADM", "ля# минор")}
                                                    style={state.keyName === "ля# минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ля# минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "EM", "ми минор")}
                                                    style={state.keyName === "ми минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ми минор
                                            </button>
                                            <button onClick={this.filterKey.bind(this, "DM", "ре минор")}
                                                    style={state.keyName === "ре минор"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                ре минор
                                            </button>
                                        </div>
                                    </div>
                                    : null}
                            </div>

                            <div className="filter-cont">
                                <button className="filter flex-c-c"
                                        style={state.moodName !== null ? {color: "white"} : null}
                                        onClick={() => this.setState({filterMoods: !state.filterMoods})}>

                                    {state.moodName === null ? "Настроение" : state.moodName}
                                    <img src={'https://i.ibb.co/1MwbwJb/arrow.png'} width="8px"
                                         className="filter-arrow" alt="arrow"/>
                                </button>

                                {state.filterMoods ?
                                    <div className="pop-up-container">
                                        <div className="pop-up-filter">
                                            <button onClick={this.filterMood.bind(this, "", "Все Настроения")}
                                                    style={state.moodName === "Все Настроения"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Все Настроения
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "ACCOMPLISHED", "Удавшийся")}
                                                    style={state.moodName === "Удавшийся"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Удавшийся
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "ADORED", "Обожаемый")}
                                                    style={state.moodName === "Обожаемый"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Обожаемый
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "ANGRY", "Злой")}
                                                    style={state.moodName === "Злой"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Злой
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "ANXIOUS", "Тревожный")}
                                                    style={state.moodName === "Тревожный"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Тревожный
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "BOUNCY", "Бодрый")}
                                                    style={state.moodName === "Бодрый"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Бодрый
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "CALM", "Спокойный")}
                                                    style={state.moodName === "Спокойный"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Спокойный
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "CONFIDENT", "Уверенный")}
                                                    style={state.moodName === "Уверенный"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Уверенный
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "CRAZY", "Сумасшедший")}
                                                    style={state.moodName === "Сумасшедший"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Сумасшедший
                                            </button>
                                            <button onClick={this.filterMood.bind(this, "HAPPY", "Весёлый")}
                                                    style={state.moodName === "Весёлый"
                                                        ? {color: "white", backgroundColor: "rgba(60, 60, 60, 0.5)"}
                                                        : null}>
                                                Весёлый
                                            </button>

                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>

                        <form className="dsdsewe" style={{margin: 0}}>
                            <img src={'https://i.ibb.co/KrWXzJ1/search.png'}
                                 width="17px" alt="search" className="df_ge__ewe"/>

                            <input type="text" className="__dfdfo-kji_" placeholder="Введите название бита"
                                   onChange={this.changeFilterName}/>
                        </form>
                    </div>

                </div>

                {this.state.loading
                    ? <div className="top-charts-loading-container">
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
                    : beats}

                {state.filterGenres || state.filterBpm || state.filterPrice || state.filterKeys || state.filterMoods
                    ? <div className="edit-back" style={{zIndex: 5}}
                           onClick={() => this.setState({
                               filterGenres: false,
                               filterBpm: false,
                               filterPrice: false,
                               filterKeys: false,
                               filterMoods: false
                           })}></div>
                    : null}
            </div>
        );
    }
}

export {FreeBeats}