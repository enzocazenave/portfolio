const profileImg = 'https://avatars.githubusercontent.com/u/102680110?v=4';

export const HelloCard = () => {
    return (
        <div className="hello-card animate__animated animate__backInLeft">
            <img className="hello-card-img" src={ profileImg } />

            <h2>
                Hola, <br/>
                Soy <span>Enzo</span>.
            </h2>
        </div>
    )
}

