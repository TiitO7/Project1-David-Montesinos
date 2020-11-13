import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { Product } from './classes/product.class';
import { User } from './classes/user.class';
import { MAPBOX_TOKEN } from './constants';
import { IProduct } from './interfaces/iproduct';
import { IUser } from './interfaces/iuser';
import { ProductResponse } from './interfaces/responses';

let mapDiv: HTMLDivElement = null;
let map: mapboxgl.Map = null;
let userDetailsForm : HTMLFormElement = null;
let userDetails : HTMLDivElement = null;
let id : number;
(mapboxgl.accessToken as string) = MAPBOX_TOKEN;

function createMap(user : User) : void{
    map = new mapboxgl.Map({
        container: mapDiv,
        style:'mapbox://styles/mapbox/streets-v11',
        center:[user.lng,user.lat],
        zoom: 14
    });
}

function createMarker(color: string, user : User) : void {
    new mapboxgl.Marker({color})
        .setLngLat(new mapboxgl.LngLat(user.lng,user.lat))
        .addTo(map);

}

function loadUserContainer(id : number) : void {  
    userDetails = document.getElementById('profile') as HTMLDivElement;                
    User.getProfile(id).then(e =>{
        const user  = new User();
        user.name = e.user.name;
        user.email = e.user.email;
        user.photo = e.user.photo;
        user.me = e.user.me;
        user.lng = e.user.lng;
        user.lat = e.user.lat;
        userDetails.appendChild(user.toHTML());

        createMap(user);
        createMarker('green',user);
        
 
    }).catch(err =>{
        Swal.fire({
            icon:'error',
            title:'Register Error',
            text: err
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {

    mapDiv = document.getElementById('map') as HTMLDivElement;
    userDetailsForm = document.getElementById('container') as HTMLFormElement;
    id = parseInt(location.search.split('=')[1]);    
    loadUserContainer(id);
    
    
});
