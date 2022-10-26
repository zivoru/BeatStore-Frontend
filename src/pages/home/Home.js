import React, {Component} from 'react';
import HomeGenres from './components/HomeGenres';
import {RecommendedUsers} from './components/RecommendedUsers';
import {TrendBeats} from './components/TrendBeats';
import {RecommendedPlaylists} from './components/RecommendedPlaylists';
import {Link} from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {playlists: []};
    }

    render() {
        document.title = 'BeatStore | Музыкальный маркетплейс для покупки и продажи битов';

        return (
            <div>

                <div className="header-home">
                    <img src="https://i.ibb.co/VqzMKq3/back.png" alt="background"
                         style={{width: "100%", height: "100%", objectFit: "cover", opacity: 0.5}}/>

                    <div className="back-gradient"></div>

                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: "100%",
                        zIndex: 30,
                        transform: "translateY(-50%)"
                    }}>
                        <div className="wrapper" style={{paddingTop: 100}}>
                            <div className="container" style={{display: "flex", justifyContent: "center"}}>
                                <div className="header-home-title">
                                    <h1>Музыкальный маркетплейс для покупки и продажи битов</h1>

                                    <a href="/oauth2/authorization/google" className="btn-primary btn-login mt32"
                                       target="_blank" style={{padding: "9px 35px"}}>
                                        <div style={{width: 24, height: 24}} className="mr16">
                                            <img src={"https://i.ibb.co/z27ySqh/google.png"} alt="google" width="24px"/>
                                        </div>
                                        Начать с Google
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper" style={{paddingTop: 0}}>
                    <div className="container">

                        <div className="title">
                            <Link to="/genres" className="hu">Популярные жанры</Link>
                            <Link to="/genres" className="color-or hu fs12 fw400">См. все</Link>
                        </div>
                        <HomeGenres/>


                        <div className="title">
                            <Link to="/top-charts" className="hu">Трендовые биты</Link>
                            <Link to="/top-charts" className="color-or hu fs12 fw400">См. все</Link>
                        </div>
                        <div style={{height: 296}}>

                            <TrendBeats homeTrendBeats={this.props.homeTrendBeats}
                                        setAudio={this.props.setAudio}
                                        btnPause={this.props.btnPause}
                                        btnPlay={this.props.btnPlay}
                                        playback={this.props.playback}
                                        playBeatId={this.props.playBeatId}/>
                        </div>

                        <div className="title">
                            <Link to="/playlists" className="hu">Рекомендуемые плейлисты</Link>
                            <Link to="/playlists" className="color-or hu fs12 fw400">См. все</Link>
                        </div>
                        <div style={{height: 310}}>

                            <RecommendedPlaylists homeRecommendedPlaylists={this.props.homeRecommendedPlaylists}/>
                        </div>
                    </div>
                </div>

                <div className="header-home" style={{height: 720}}>
                    <img src="https://i.ibb.co/3YwSCVD/back2.png" alt="background"
                         style={{width: "100%", height: "100%", objectFit: "cover", opacity: 0.5}}/>

                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: "100%",
                        zIndex: 30,
                        transform: "translateY(-50%)"
                    }}>
                        <div className="wrapper" style={{paddingTop: 100}}>
                            <div className="container" style={{display: "flex", justifyContent: "center"}}>
                                <div className="header-home-title">
                                    <h1>Более 10000 музыкантов уже продают свою музыку</h1>

                                    <a href="/oauth2/authorization/google" className="btn-primary btn-login mt32"
                                       target="_blank" style={{padding: "9px 35px"}}>
                                        <div style={{width: 24, height: 24}} className="mr16">
                                            <img src={"https://i.ibb.co/z27ySqh/google.png"} alt="google" width="24px"/>
                                        </div>
                                        Начать с Google
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper" style={{paddingTop: 0}}>
                    <div className="container">

                        <div className="title">
                            <Link to="/beatmakers" className="hu">Рекомендуемые битмейкеры</Link>
                            <Link to="/beatmakers" className="color-or hu fs12 fw400">См. все</Link>
                        </div>
                        <div style={{height: 210}}>

                            <RecommendedUsers homeRecommendedUsers={this.props.homeRecommendedUsers}/>
                        </div>


                        <div className="title">
                            <Link to="/free-beats" className="hu">Бесплатные биты</Link>
                            <Link to="/free-beats" className="color-or hu fs12 fw400">См. все</Link>
                        </div>
                        <div style={{height: 296}}>

                            <TrendBeats homeTrendBeats={this.props.homeFreeBeats}
                                        setAudio={this.props.setAudio}
                                        btnPause={this.props.btnPause}
                                        btnPlay={this.props.btnPlay}
                                        playback={this.props.playback}
                                        playBeatId={this.props.playBeatId}/>
                        </div>
                    </div>
                </div>


                <div className="footer">
                    <div className="wrapper" style={{paddingTop: 0, paddingBottom: 0}}>
                        <div className="container">
                            <div className="flex-c-sb" style={{width: "100%"}}>
                                <span className="fs12 fw300">© 2022 BeatStore • Created by <a
                                    href="https://github.com/zivoru" target="_blank" className="hu">zivo</a></span>
                                <a href={"https://github.com/zivoru/beatstore"}
                                   target="_blank" className="item-social">
                                    GitHub
                                    <img src={'https://i.ibb.co/Kr035wK/github.png'}
                                         alt="github" width="18px" className="ml10"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {Home}