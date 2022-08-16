const linkedin = 'https://www.linkedin.com/in/enzo-cazenave/'; 
const github = 'https://github.com/enzocazenave';
const instagram = 'https://www.instagram.com/chikicazenave_/';
const youtube = 'https://www.youtube.com/channel/UCYB-YbAbg8p3d7YMl2XKOvw';

export const LinksCard = () => {
    return (
        <div className="links-card animate__animated animate__fadeInRightBig">
            <a target="blank" href={ linkedin }><i className="fab fa-linkedin"></i></a>
            <a target="blank" href={ github }><i className="fab fa-github"></i></a>
            <a target="blank" href={ instagram }><i className="fab fa-instagram"></i></a>
            <a target="blank" href={ youtube }><i className="fab fa-youtube"></i></a>
        </div>
    )
}
