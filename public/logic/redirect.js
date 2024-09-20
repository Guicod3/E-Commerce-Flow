import { itemCount } from './createAndRemoveSpace.js';

document.getElementById('Descrição').addEventListener('click', () =>{
    window.location.assign(`/description`)
})

document.getElementById('Anuncios').addEventListener('click', () =>{
    window.location.assign(`/ads`)
})

document.getElementById('search').addEventListener('click', () =>{
    const titles = itemCount
    const content = document.getElementById('inputTitle').value
    window.location.assign(`/ads/posts/:${titles}/:${content}`)
})