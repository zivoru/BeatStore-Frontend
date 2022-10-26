import React from 'react';
import {Link} from 'react-router-dom';

const li = [
    {url: '/genres', title: 'Все жанры'},
    {url: '/genre/RAP', title: 'Рэп'},
    {url: '/genre/HIP_HOP', title: 'Хип-хоп'},
    {url: '/genre/POP', title: 'Поп'},
    {url: '/genre/POP_RAP', title: 'Поп-рэп'},
]

const HeaderGenres = (props) => (
    <div className="mt16">
        <span className="fw400 fs14">Жанры</span>
        <ul>
            {li.map((li, index) => (
                <li key={index}>
                    <Link to={li.url} onClick={props.click}>
                        {li.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

export default HeaderGenres;