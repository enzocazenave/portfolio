import { useEffect, useState } from 'react';
import { LinksCard } from './components/';
import { HelloCard } from './components/';
import { getRepos } from './helpers/getRepos';
import { Project } from './components/';

const title = "Enzo Cazenave";

export const PortfolioApp = () => {

    const [section, setSection] = useState("home");
    const [projects, setProjects] = useState([]);

    const onSection = (section) => {
        if (section == 'projects') {
            getRepos().then(res => setProjects(res));
        }
        setSection(section);
    }

    return (
        <div className="page">
            <div className="navbar">
                <h2>{title}</h2>

                <div>
                    <button id={ (section == 'home') && 'selected-navitem' } onClick={ () => onSection("home") }>Inicio</button>
                    <button id={ (section == 'about') && 'selected-navitem' } onClick={ () => onSection("about") }>Sobre mi</button>
                    <button id={ (section == 'projects') && 'selected-navitem' } onClick={ () => onSection("projects") }>Proyectos</button>
                    <button id={ (section == 'contact') && 'selected-navitem' } onClick={ () => onSection("contact") }>Contáctame</button>
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
                                projects.map(project => (
                                    <Project {...project} />
                                ))
                            }
                        </div>
                    </div>
            } 
        </div>
    )
}
