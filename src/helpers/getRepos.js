export const getRepos = async() => {
    const endpoint = 'https://api.github.com/users/enzocazenave/repos';
    const info = await fetch(endpoint).then(res => res.json()).catch(err => console.error(err));
    return info;
}