import { useState } from 'react';
import { LinksCard } from './components/';
import { HelloCard } from './components/';
import { getRepos } from './helpers/getRepos';
import { Project } from './components/';
import { useForm } from './hooks/useForm';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const title = "Enzo Cazenave";

const initialState = {
    name: '',
    email: '',
    message: ''
}

export const PortfolioApp = () => {

    const [section, setSection] = useState("home");
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { name, email, message, onInputChange, formState, onResetForm } = useForm(initialState);
    const [error, setError] = useState(''); 
    const [aboutSection, setAboutSection] = useState("about-me");

    const onSection = (section) => {
        if (section == 'projects') {
            setIsLoading(true);
            getRepos().then((res) => {
                setProjects(res);
                setIsLoading(false);
            });
        }
        setSection(section);
    }

    const onAboutSection = (section) => {
        setAboutSection(section)
    }

    const onSendButton = (e) => {
        e.preventDefault();

        if (name.length < 2) return setError("Debes completar todos los campos");
        if (message.length < 2) return setError("Debes completar todos los campos");
        if (email.length < 2) return setError("Debe completar todos los campos");

        onResetForm();
        setError('');

        emailjs.sendForm('service_vegbsz5', 'template_jhtitz2', e.target, '7udVIrNmsK1Tmz1WL').then(() => {
            Swal.fire({
                position: 'top-start',
                title: 'Gracias! Te responderé lo antes posible.',
                width: 600,
                padding: '3em',
                color: '#716add',
                backdrop: `
                  rgba(0,0,0,0.4)
                  url("https://gist.githubusercontent.com/s-shivangi/7b54ec766cf446cafeb83882b590174d/raw/8957088c2e31dba6d72ce86c615cb3c7bb7f0b0c/nyan-cat.gif")
                  top
                  no-repeat
                `
            });
        }).catch(error => console.log(error));  
        
    }

    return (
        <div className="page">
            <div className="navbar">
                <h2>{title}</h2>

                <div>
                    <button id={ (section == 'home') ? 'selected-navitem' : '' } onClick={ () => onSection("home") }>Inicio</button>
                    <button id={ (section == 'about') ? 'selected-navitem' : '' } onClick={ () => onSection("about") }>Sobre mi</button>
                    <button id={ (section == 'projects') ? 'selected-navitem' : '' } onClick={ () => onSection("projects") }>Proyectos</button>
                    <button id={ (section == 'contact') ? 'selected-navitem' : '' } onClick={ () => onSection("contact") }>Contáctame</button>
                </div>
            </div>

            {
                (section == 'home') &&
                    <div className="page-item">
                        <HelloCard />
                        <LinksCard />
                        <footer className="animate__animated animate__fadeIn animate__slower">
                            <p>Desarrollado con React JS</p>
                            <p> Enzo Cazenave &copy;</p>
                        </footer>
                    </div>
            }
            {
                (section == 'about') &&
                    <div className="about-item">
                        <div className="about-container animate__animated animate__fadeIn">
                            <nav>
                                <button onClick={() => onAboutSection('about-me')} id={ (aboutSection == 'about-me') ? 'selected-aboutnavitem' : '' }>Sobre Mi</button>
                                <button onClick={() => onAboutSection('study')} id={ (aboutSection == 'study') ? 'selected-aboutnavitem' : '' }>Mis estudios</button>
                                <button onClick={() => onAboutSection('skills')} id={ (aboutSection == 'skills') ? 'selected-aboutnavitem' : '' }>Habilidades</button>
                                <button onClick={() => onAboutSection('aptitudes')} id={ (aboutSection == 'aptitudes') ? 'selected-aboutnavitem' : '' }>Aptitutes</button>
                            </nav>
                            {
                                (aboutSection == 'about-me') &&
                                    <p className="animate__animated animate__fadeIn">
                                        Soy <span>Enzo</span>, un soñador de 18 años, que desde chico le encanta el mundo de la tecnologia.<br/><br/>
                                        A la edad de los 15 empecé en la programación con un lenguaje llamado Lua, el mismo lo utilizaba para desarrollar
                                        servidores de FiveM, un juego que estaba muy de moda en ese momento. Ese mismo año me puse el objetivo
                                        de aprender para poder dar lo mejor a mis usuarios. Aprendí HTML, CSS y JS para poder desarrollar interfaces
                                        para el servidor que mejoren la experiencia del jugador (usuario).<br/><br/>
                                        Gracias a tanto esfuerzo y dedicación, llegué a tener una media de 170 usuarios diarios en el servidor. 
                                        <br/><br/>
                                        Todo lo mencionado anteriormente, hizo que me diera cuenta a que me quería dedicar. Por eso al finalizar el colegio,
                                        comencé a estudiar Ingeniería en Informática en UADE (Universidad Argentina de la Empresa).
                                    </p>
                            }
                            {
                                (aboutSection == 'study') &&
                                   <p className="animate__animated animate__fadeIn">
                                        <h3>Ingeniería en informática</h3>
                                        <ul>Cursando actualmente el segundo cuatrimestre de primer año en UADE.</ul>
                                        <h3>Cursos</h3>
                                        <div>
                                            <img src="https://cdn.discordapp.com/attachments/1008885821027405958/1009965182224699502/UC-6bb1154d-99cb-4a38-847f-a6c90dae55a5.jpg"/>
                                            <img src="https://cdn.discordapp.com/attachments/1008885821027405958/1009965181973037157/UC-4b8818e0-1f26-442b-85da-d15247c3f22f.jpg"/>
                                        </div>
                                   </p>
                            }
                            
                        </div>
                    </div>
            }
            {
                (section == 'projects') &&
                    <div className="page-item">
                        <h1 className="project-title animate__animated animate__fadeIn">Proyectos</h1>
                        <div className="projects-container">
                            { 
                                (!isLoading)
                                ?
                                    projects.map(project => (
                                        <Project key={ project.id } {...project} />
                                    ))
                                : 
                                    <i className="fas fa-spinner" id="loading-spinner"></i>
                                
                            }
                        </div>
                    </div>
            }
            {
                (section == 'contact') &&
                    <div className="contact-item animate__animated animate__fadeIn">
                        <div>
                            <a target="blank" href="https://wa.me/5491145280608" className="whatsapp">
                                <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-3-1.png"/>
                                <p>+54 9 11 4528 0608</p>
                            </a>

                            <a target="blank" href="https://www.instagram.com/chikicazenave_/" className="whatsapp">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"/>
                                <p>@chikicazenave_</p>
                            </a>

                            <a target="blank" href="https://github.com/enzocazenave" className="whatsapp">
                                <img src="https://cdn.discordapp.com/attachments/1008885821027405958/1009268135603486790/pngegg.png"/>
                                <p>enzocazenave</p>
                            </a>

                            <a target="blank" href="https://www.linkedin.com/in/enzo-cazenave/" className="whatsapp">
                                <img src="https://cdn.discordapp.com/attachments/1008885821027405958/1009269308771270816/linkedin.png"/>
                                <p>enzo-cazenave</p>
                            </a>
                        </div>

                        <form className="form-container" onSubmit={ onSendButton }>
                            <h2>Contáctame por e-mail</h2>
                            <input 
                                type="text" 
                                placeholder="Nombre" 
                                name="name"
                                onChange={ onInputChange }
                                value={ name }
                            />

                            <input 
                                type="email" 
                                placeholder="Correo electrónico" 
                                name="email"
                                onChange={ onInputChange }
                                value={ email }
                            />

                            <textarea 
                                placeholder="Mensaje" 
                                name="message"
                                onChange={ onInputChange }
                                value={ message }
                            />

                            {
                                (error != '') &&
                                    <p className="error-text">{error}</p>
                            }
                            
                            <button 
                                type="submit"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
            }
        </div>
    )
}
