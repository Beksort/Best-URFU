import React, {useContext} from 'react';
import Context from "../Context/context";
import yDiskImage from '../img/auth1.png'
import '../css/auth.css'

function Auth(){
    let {disk} = useContext(Context);
    return <div className="auth col-md-12">
        <div className="auth__img-container auth__row row">
            <img className="auth__img" src={yDiskImage} alt=""/>
        </div>
        <div className="auth__info auth__row row">
            <span className="auth__text auth__text_bold col-md-8">Для использования приложения необходимо пройти аутентификацию!</span>
        </div>
        <div className="auth__control auth__row row">
            <button className="auth__btn btn btn-primary col-md-8" onClick={() => {disk.OAuth()}}>Вход</button>
        </div>
    </div>
}

export default Auth