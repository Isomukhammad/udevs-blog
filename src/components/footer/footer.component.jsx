import Logo from '../logo/logo.component';
import { Link } from 'react-router-dom';

import './footer.styles.scss';

const Footer = () => {
    return(
        <div className='footer-container'>
            <div className='footer-logo-container'>
                <Logo/>               
                <div className='footer-logo-information'>
                    Помощник в публикации статей, журналов. Список популярных международных конференций. Всё для студентов и преподавателей.
                </div>
            </div>

            <div>
                <div className='footer-title'>Ресурсы</div>
                <Link to = '/'>Статьи</Link>
                <Link to = '/'>Журналы</Link>
                <Link to = '/'>Газеты</Link>
                <Link to = '/'>Диплом</Link>
            </div>

            <div>
                <div className='footer-title'>О нас</div>
                <Link to = '/'>Контакты</Link>
                <Link to = '/'>Помощь</Link>
                <Link to = '/'>Заявки</Link>
                <Link to = '/'>Политика</Link>
            </div>

            <div>
                <div className='footer-title'>Помошь</div>
                <Link to = '/'>Часто задаевые вопросы</Link>
            </div>
        </div>
    )
}

export default Footer;