class Song {
    constructor() {
        this.itemLi = document.createElement('li');
        this.itemGroupName = document.createElement('a');
        this.itemSongTitle = document.createElement('a');
        this.listeners = document.createElement('div');
    }

    setItemLi() {
        this.itemLi.setAttribute('class', 'far fa-play-circle');
    }
    setItemGroupName(group, url) {
        this.itemGroupName.setAttribute('class', 'group-name');
        this.itemGroupName.setAttribute('title', 'Ir al Grupo');
        this.itemGroupName.setAttribute('href', url);
        this.itemGroupName.innerText = group;
    }
    setItemSongTitle(title) {
        this.itemSongTitle.setAttribute('class', 'song-title');
        this.itemSongTitle.innerText = title;
    }
    setListeners(listeners) {
        this.listeners.setAttribute('class', 'listeners');
        this.listeners.innerText = listeners;
    }
    getNewElement(group, url, title, listeners) {
        this.setItemLi();
        this.setItemGroupName(group, url);
        this.setItemSongTitle(title);
        this.setListeners(listeners);
        let contenedor = this.itemLi;
        contenedor.appendChild(this.itemGroupName);
        contenedor.appendChild(this.itemSongTitle);
        contenedor.appendChild(this.listeners);
        return contenedor;
    }
}

const loadSongs = (mArray) => {
    let element;
    let contenedor = document.getElementsByClassName('lista');
    contenedor[0].innerHTML = "";
    mArray.forEach(e => {
        let mySong = new Song;
        let elementsLi = mySong.getNewElement(e.artist.name, e.artist.url, e.name, e.listeners);
        contenedor[0].appendChild(elementsLi);
    });
}

const loadOverview = (e) => {
    document.getElementsByClassName('menu-item-selected')[0].innerHTML = "Overview";
    loadSongs(tracks);
}

const loadTenListened = () => {
    document.getElementsByClassName('menu-item-selected')[0].innerHTML = "Top Tem Listened";
    let ordenedArray = tracks.slice();
    ordenedArray.sort((a, b) => b.listeners - a.listeners);
    loadSongs(ordenedArray.slice(0, 10));
};

const loadBiggest = (e) => {
    document.getElementsByClassName('menu-item-selected')[0].innerHTML = "The Biggest";
    let ordenedArray = tracks.slice();
    // Ordenamos el array por nombres de artista para la agrupaci�n
    ordenedArray.sort((a, b) => {
        if (a.artist.name > b.artist.name) {
            return 1;
        }
        if (a.artist.name < b.artist.name) {
            return -1;
        }
    });
    // Obtenemos un representante de cada artista y hacemos un sumatorio de listeners
    let agrupedArray = [];
    let i = 1;
    let contListeners = parseInt(ordenedArray[i-1].listeners);
    while (i < ordenedArray.length) {
        if (ordenedArray[i-1].artist.mbid !== ordenedArray[i].artist.mbid) {
            objContListeners = { agrupedListeners: contListeners };
            let newObject = Object.assign({}, ordenedArray[i - 1], objContListeners);
            agrupedArray.push(newObject);
            contListeners = 0;
        }
        contListeners+= parseInt(ordenedArray[i].listeners);
        i++;
    };
    // Ordenamos en una array por agrupedListeners
    let ordenedArrayFinal = agrupedArray.slice();
    ordenedArrayFinal.sort((a, b) => b.agrupedListeners - a.agrupedListeners);
    // Filtramos el array tracks por el artista
    let biggestArrayFinal = tracks.filter(element => element.artist.mbid == ordenedArrayFinal[0].artist.mbid);
    loadSongs(biggestArrayFinal);
}

function loadGenre(e) {
    document.getElementsByClassName('menu-item-selected')[0].innerHTML = e.target.text;
    let genreArray = tracks.filter(element => element.genre == e.target.text);
    loadSongs(genreArray);

}

const init = () => {
    document.getElementsByClassName('menu-item-selected')[0].innerHTML = "Overview";

    loadSongs(tracks);

    let overview = document.getElementById('overview');
    overview.addEventListener('click', loadOverview);
    overview.children[0].focus();

    let tenListened = document.getElementById('ten-listened');
    tenListened.addEventListener('click', loadTenListened);

    let biggest = document.getElementById('biggest');
    biggest.addEventListener('click', loadBiggest);

    let listRock = document.getElementsByClassName('estilo1');
    listRock[0].addEventListener('click',loadGenre);
    let listHipHop = document.getElementsByClassName('estilo2');
    listHipHop[0].addEventListener('click',loadGenre);
    let listIndie = document.getElementsByClassName('estilo3');
    listIndie[0].addEventListener('click',loadGenre);
    let listJazz = document.getElementsByClassName('estilo4');
    listJazz[0].addEventListener('click',loadGenre);
    let listReggae = document.getElementsByClassName('estilo5');
    listReggae[0].addEventListener('click',loadGenre);

}

window.onload = init;

