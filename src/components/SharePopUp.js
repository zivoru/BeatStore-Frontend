import React from 'react';

let shareLink = document.location.protocol + "//" + document.location.host + "/beat/"

function myFunction() {
    let copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}

const SharePopUp = (props) => (
    <div className="sharePopUp pop-up trs">
        <div className="pop-up-header">
            Поделиться
            <img src={'https://i.ibb.co/FnGGGTx/close.png'} alt="close"
                 width="18px" onClick={props.closePopUps}/>
        </div>
        <div className="share-link flex-c">
            <img src={'https://i.ibb.co/rsL0r6P/share.png'} width="14px" alt="share"/>

            <input id={"myInput"} value={shareLink + props.beat.id} readOnly className="wnohte"/>

            <button className="color-bl hu fs14 fw400 ml10" onClick={myFunction}
                    style={{backgroundColor: "transparent"}}
            >Копировать
            </button>
        </div>
    </div>
);

export default SharePopUp;