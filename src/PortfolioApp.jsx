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
    subject: '',
    message: ''
}

export const PortfolioApp = () => {

    const [section, setSection] = useState("home");
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { subject, message, onInputChange, formState, onResetForm } = useForm(initialState);
    const [error, setError] = useState('');

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

    const onSendButton = (e) => {
        e.preventDefault();

        if (subject.length < 2) return setError("Debes completar todos los campos");
        if (message.length < 2) return setError("Debes completar todos los campos");

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
                    </div>
            }
            {
                (section == 'about') &&
                    <div className="page-item">
                            
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
                                placeholder="Asunto" 
                                name="subject"
                                onChange={ onInputChange }
                                value={ subject }
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
