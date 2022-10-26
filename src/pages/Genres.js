import React from 'react';
import {Link} from "react-router-dom";

const genres = [
    {url: "DRILL", img: 'https://i.ibb.co/jL4KtKX/drill.jpg', title: "DRILL"},
    {url: "DETROIT_RAP", img: 'https://i.ibb.co/yg05vXP/detroit.jpg', title: "Detroit"},
    {url: "HOOKAH_RAP", img: 'https://i.ibb.co/BPm00y1/hookah-rap.jpg', title: "Кальянный рэп"},
    {url: "POP", img: 'https://i.ibb.co/QkrMYx3/pop.jpg', title: "Поп"},
    {url: "POP_RAP", img: 'https://i.ibb.co/ZVDnBvq/pop-rap.jpg', title: "Поп-Рэп"},
    {url: "POP_ROCK", img: 'https://i.ibb.co/Fw2gnRf/pop-rock.jpg', title: "Поп-Рок"},
    {url: "RAP", img: 'https://i.ibb.co/ngwQwqm/rap.jpg', title: "Рэп"},
    {url: "ROCK", img: 'https://i.ibb.co/WxNsTCR/rock.jpg', title: "Рок"},
    {url: "REGGAE", img: 'https://i.ibb.co/VBFbhhv/reggae.jpg', title: "Рэгги"},
    {url: "HIP_HOP", img: 'https://i.ibb.co/q5nf1G2/hip-hop.jpg', title: "Хип-хоп"},
    {url: "HYPERPOP", img: 'https://i.ibb.co/SVJDwJk/hyperpop.jpg', title: "Hyperpop"},
]

const Genres = () => (
    <div>
        <div className="wrapper">
            <div className="container">

                <div className="title">
                    <h2>Жанры</h2>
                </div>

                <div className="grid-genres">

                    {genres.map((genre, index) => (
                        <div className="grid-genres-item" key={index}>
                            <Link to={"/genre/" + genre.url} className="inl-blk genre-img trs ho">
                                <img className="slide-img-genre" src={genre.img} alt={genre.title}/>
                            </Link>

                            <div>
                                <Link to={"/genre/" + genre.url} className="hu fw500 fs14 wnohte">
                                    {genre.title}
                                </Link>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

        <div className="footer">
            <div className="wrapper" style={{paddingTop: 0, paddingBottom: 0}}>
                <div className="container">
                    <div className="flex-c-sb" style={{width: "100%"}}>
                        <span className="fs12 fw300">© 2022 BeatStore • Created by <a href="https://github.com/zivoru"
                                                                                      target="_blank"
                                                                                      className="hu">zivo</a></span>
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

export default Genres;