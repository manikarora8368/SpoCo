import Cookie from 'js-cookie';

const login=()=>{
    const client_id='487e5f69b3c049b3b191a0644ce47a49';
    const scopes=['playlist-read-private','playlist-read-collaborative','user-read-email','user-read-private','user-follow-modify','user-follow-read','playlist-modify-public','playlist-modify-private'];
    const hashed_state=Cookie.get('hashed_state');
    const redirect_uri='http://localhost:3000/auth'
    window.location.href=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&state=${hashed_state}&scope=${scopes.join('%20')}&show_dialog=false&redirect_uri=${redirect_uri}`
}

export default login;