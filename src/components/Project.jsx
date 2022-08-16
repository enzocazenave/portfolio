export const Project = ({name, description, svn_url}) => {
    return (
        <a target="blank" href={ svn_url } className="project-container animate__animated animate__fadeIn">
            <i className="fab fa-github"></i>
            <div>
                <h4>{ name }</h4>
                <p>{ description }</p>
            </div>
        </a>
    )
}
