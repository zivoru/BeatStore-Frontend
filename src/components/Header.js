import React, {Component} from "react";
import {Link} from "react-router-dom";
import Tags from "./header-components/Tags";
import HeaderProfile from "./header-components/HeaderProfile";
import Categories from "./header-components/Categories";
import HeaderGenres from "./header-components/HeaderGenres";

class Header extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            cart: []
        };
    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
            cart: this.props.cart
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) this.setState({user: this.props.user})
        if (prevProps.cart !== this.props.cart) this.setState({cart: this.props.cart})
    }

    burgerOpen = () => {
        let menuBurger = document.querySelector(".menu__burger");
        let back = document.querySelector(".back__burger");

        menuBurger.style.display = "flex"
        back.style.display = "initial"

        setTimeout(() => menuBurger.style.transform = "none", 10)
        setTimeout(() => back.style.opacity = "1", 10)
    }
    burgerClose = () => {
        let menuBurger = document.querySelector(".menu__burger");
        let back = document.querySelector(".back__burger");

        menuBurger.style.transform = "translateX(-258px)"
        back.style.opacity = "0"

        setTimeout(() => menuBurger.style.display = "none", 50)
        setTimeout(() => back.style.display = "none", 50)
    }

    imageName;
    price;

    logout = () => {
        this.props.logout();
        this.props.profilePopUpOpen();
    }

    render() {

        let cart = this.state.cart
        let user = this.state.user

        let amountCart;
        let dropCart;
        let dropCartClass = user !== null && user !== undefined && user !== "empty" ?
            "dropdown dropdown__cart trs" : "dropdown dropdown__cart trs drop-cart-right"

        if (cart.length !== 0 && cart !== "empty") {
            amountCart = <div className="cartAmount">{cart.length}</div>

            dropCart =
                <div className={dropCartClass}>
                    <span>Корзина</span>

                    <div className="cart__container">
                        {cart.map((cart, index) => {
                            return (
                                <div className="flex-c-sb mt16 fs14" key={index}>
                                    <div className="flex-c" style={{width: 175}}>

                                        <div style={{width: 50, height: 50}}>
                                            <img src={cart.beat.imageName !== null && cart.beat.imageName !== '' ?
                                                `/resources/user-${cart.beat.user.id}/beats/beat-${cart.beat.id}/${cart.beat.imageName}`
                                                :
                                                'https://i.ibb.co/ySkyssb/track-placeholder.webp'}
                                                 alt="track-placeholder"
                                                 className="beat-img"/>
                                        </div>

                                        <div className="mw100 pl16" style={{lineHeight: "17px"}}>
                                            <Link to={"/beat/" + cart.beat.id} className="beat-link hu wnohte"
                                                  onClick={this.props.cartPopUpOpen} title={cart.beat.title}>
                                                {cart.beat.title}
                                            </Link>
                                            <p className="color-g1 fw400">Бит</p>
                                        </div>
                                    </div>

                                    <div className="flex-c">
                                        <span style={{marginBottom: "20px"}}>{cart.price}₽</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Link to="/cart" className="btn-primary mw100 fs12 mt32" onClick={this.props.cartPopUpOpen}>Оформить
                        заказ</Link>
                </div>;
        } else {
            dropCart =
                <div className={dropCartClass}>
                    <div className="cart-empty flex-c-c">
                        В корзине пусто
                    </div>
                </div>
        }

        let headerRight;

        let btnDropCart =
            <div className="hdr-drop-btn flex-c trs cart NONE bag" onClick={this.props.cartPopUpOpen} title="Корзина">
                <img src={"https://i.ibb.co/8M0Ch54/bag.png"} width="21px" alt="корзина"/>
                {amountCart}
            </div>

        let btnDropCartMobile = user !== null && user !== undefined && user !== "empty" ?
            <Link className="hdr-drop-btn-mobile flex-c trs bag" to="/cart" title="Корзина">
                <img src={"https://i.ibb.co/8M0Ch54/bag.png"} width="21px" alt="корзина"/>
                {amountCart}
            </Link>
            :
            <button className="hdr-drop-btn-mobile flex-c trs bag" title="Корзина"
                    style={{backgroundColor: "inherit"}} onClick={this.props.setLoginPopUp}>
                <img src={"https://i.ibb.co/8M0Ch54/bag.png"} width="21px" alt="корзина"/>
                {amountCart}
            </button>

        let burgerFooter;

        if (user !== null && user !== undefined && user !== "empty") {

            let image = 'https://i.ibb.co/KXhBMsx/default-avatar.webp';

            if (user.profile !== null && user.profile !== undefined) {
                if (user.profile.imageName !== null && user.profile.imageName !== "") {
                    image = `/resources/user-${user.id}/profile/${user.profile.imageName}`;
                }
            }

            headerRight = <div className="flex-c header-right">
                <Link to="/upload-beat" className="btn-primary NONE"
                      style={{padding: "4px 10px", backgroundColor: "inherit"}}
                      title="Загрузить бит" onClick={this.props.closeHeaderPopUps}>
                    <img src={"https://i.ibb.co/V9HwDQy/upload.png"} width="17px" alt="upload"/>
                </Link>

                <div className="line NONE"></div>

                {btnDropCart}

                {btnDropCartMobile}

                <div className="hdr-drop-btn flex-c trs profile"
                     onClick={this.props.profilePopUpOpen}
                     style={{padding: 5}} title="Профиль"
                >
                    <img src={image} className="profile__img b-r999" alt="profile"/>
                </div>

                {this.props.cartPopUp ? dropCart : null}

                {this.props.profilePopUp
                    ? <HeaderProfile user={user} image={image} logout={this.logout}
                                     dropdownClose={this.props.profilePopUpOpen}/>
                    : null}

                {this.props.cartPopUp === true
                    ? <div className="back-dropdown" onClick={this.props.cartPopUpOpen}></div>
                    : null}

                {this.props.profilePopUp === true
                    ? <div className="back-dropdown" onClick={this.props.profilePopUpOpen}></div>
                    : null}
            </div>
        }

        if (user === "empty") {
            headerRight = <div className="flex-c header-right">

                <a href="/oauth2/authorization/google" className="mr10" style={{whiteSpace: "nowrap"}}>
                    <img src={"https://i.ibb.co/cxSmY0W/google.png"} alt="google"
                         width="18px" className="mr5"/>
                    <span className="fs14 fw300">Войти</span>
                </a>

                <div className="line"></div>

                {btnDropCart}

                {btnDropCartMobile}

                {this.props.cartPopUp ? dropCart : null}

                {this.props.cartPopUp === true
                    ? <div className="back-dropdown" onClick={this.props.cartPopUpOpen}></div>
                    : null}
            </div>

            burgerFooter = <div className="fs12 p16 mw100" style={{backgroundColor: "rgba(20,20,20,1)"}}>
                <p className="fw400 mb16">Начни монетизировать свою музыку!</p>
                <div className="flex-c">

                    <a href="/oauth2/authorization/google" className="hdr-btn" style={{padding: 0}}>
                        <img src={"https://i.ibb.co/cxSmY0W/google.png"} alt="google"
                             width="18px" className="mr5"/>
                        <span>Войти через Google</span>
                    </a>
                </div>
            </div>
        }

        return (
            <div>

                {this.props.cartPopUp === true
                    ? <div className="back-dropdown" onClick={this.props.cartPopUpOpen}></div>
                    : null}

                {this.props.profilePopUp === true
                    ? <div className="back-dropdown" onClick={this.props.profilePopUpOpen}></div>
                    : null}

                <header>
                    <div className="header__container flex-c">
                        <div className="flex-c header-left"
                             onClick={this.props.closeHeaderPopUps}>
                            <div className="burger btn-burger flex-c-c">
                                <ion-icon name="menu-outline" onClick={this.burgerOpen}></ion-icon>
                            </div>

                            <div className="mr16 NONE2">
                                <Link to="/" className="header-logo">
                                    <img src={"https://i.ibb.co/QM8NnLh/logo.png"} width="25px" alt="logo"/>
                                </Link>
                            </div>
                        </div>

                        <div className="flex-c-c header-center NONE">
                            <Link to="/top-charts" className="hdr-btn NONE">
                                <span>Топ Чарт</span>
                            </Link>

                            <Link to="/free-beats" className="hdr-btn NONE">
                                <span>Бесплатные биты</span>
                            </Link>

                            <Link to="/playlists" className="hdr-btn NONE">
                                <span>Плейлисты</span>
                            </Link>

                            <Link to="/beatmakers" className="hdr-btn NONE">
                                <span>Битмейкеры</span>
                            </Link>
                        </div>

                        {headerRight}

                    </div>
                </header>

                <div className="back__burger trs" onClick={this.burgerClose}></div>

                <div className="menu__burger trs">

                    <div className="burger__header flex-c">
                        <div className="btn-burger flex-c-c">
                            <ion-icon name="close-outline" onClick={this.burgerClose}></ion-icon>
                        </div>

                        <div className="btn-burger flex-c-c">
                            <Link to="/" onClick={this.burgerClose}>
                                <img src={"https://i.ibb.co/QM8NnLh/logo.png"} width="21px" alt="logo"/>
                            </Link>
                        </div>
                    </div>

                    <div className="burger__main">
                        <div className="menu burger__menu" style={{flexDirection: "column", padding: 0}}>

                            <Categories className="mt16" click={this.burgerClose}/>

                            <Tags className="mt16" click={this.burgerClose}/>

                            <HeaderGenres className="mt16" click={this.burgerClose} img={false}/>

                        </div>
                    </div>

                    {burgerFooter}

                </div>

            </div>
        );
    }
}

export {Header}