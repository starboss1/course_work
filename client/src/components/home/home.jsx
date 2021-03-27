import React, { useState, useEffect } from 'react';

import './home.css';

import UserService from '../../services/user.service.js';

import homePageImg from '../../assets/home-page.png'
import cloudImg from '../../assets/cloud.svg';
import collaborativeImg from '../../assets/collaborative.svg';
import forkImg from '../../assets/fork.svg';
import secureImg from '../../assets/secure.svg';
import textEditorImg from '../../assets/text_editor.svg';
import undoImg from '../../assets/undo.svg';
import documentService from '../../services/document.service';

const Home = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();

                setContent(_content);
            }
        );
    }, []);

    const handleClick = (e) => {
        documentService.createDocument()
            .then((response) => {
                props.history.push("/profile");
                window.location.reload();
            })
            .catch((err) => {
                if(err.message.includes('Request failed with status code 403')){
                    props.history.push('/login');
                    window.location.reload();
                }
                console.log('error', err);
            });
    }

    return (
        <div>
            <div className="home-head text-center">
                <h2 className="home-head-name">KMADOC</h2>
                <h4 className="home-head-description">KMADOC допомагає зручно і швидко працювати з документами в одному місці</h4>
                <button type="button" onClick={handleClick} className="btn btn-primary btn block mt-5 create-document">Створити документ</button>
                

                <img className="mt-5" src={homePageImg} alt={'Home page'}/>
            </div>
            <div>
            <div className="container home-main-container">
                <h3 className="mb-5 text-center display-4">Чому KMADOC</h3>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={cloudImg} alt="Ніяких файлів"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Ніяких файлів</div>
                        <div className="t-description">Більше ніяких електронних листів з вкладеними файлами. Всі версії документу знаходяться в одному місці.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={textEditorImg} alt="Зручний текствовий редактор"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Зручний текствовий редактор</div>
                        <div className="t-description">KMADOC - це редактор тексту. Ви можете писати на будь-якій мові. Текст може бути відформатований жирним шрифтом, курсивом, підкресленням, можлива зміна розміру тексту, міжстрокового інтервалу і багато іншого.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={forkImg} alt="Просте поширення"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Просте поширення</div>
                        <div className="t-description">Поділитися документом з іншою людиною можна відравивши URL адресу. Співавтори можуть легко отримати доступ до редагування документу.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={collaborativeImg} alt="Співпраця"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Співпраця</div>
                        <div className="t-description">Декілька користувачів можуть працювати одночасно. Зміни в докумені бачать всі автори та читачі в режимі реального часу.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={undoImg} alt="Збережена історія"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Збережена історія</div>
                        <div className="t-description">Вся історія змін документу зберігається на сервері і вона доступна в будь-який момент часу.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
                <div className="t-col t-prefix_2 t-col_8">
                    <div className="t-cell">
                        <img className="t-img" src={secureImg} alt="Безпека"/>
                    </div>
                    <div className="t-cell pl-4">
                        <div className="t-name">Безпека</div>
                        <div className="t-description">Доступ до ваших документів мають лише ті, кому ви надасте доступ.</div>
                    </div>
                </div>
                <div className="t-separator"></div>
            </div>
            </div>
        </div>
    )
}

export default Home;
