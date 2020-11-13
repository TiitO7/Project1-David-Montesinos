import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { Product } from './classes/product.class';
import { MAPBOX_TOKEN } from './constants';
import { IProduct } from './interfaces/iproduct';
import { IUser } from './interfaces/iuser';
import { ProductResponse } from './interfaces/responses';

let mapDiv: HTMLDivElement = null;
let map: mapboxgl.Map = null;
let productDetailsForm : HTMLFormElement = null;
let productDetails : HTMLDivElement = null;
let id : any;
(mapboxgl.accessToken as string) = MAPBOX_TOKEN;

function createMap(prod : Product) : void{
    map = new mapboxgl.Map({
        container: mapDiv,
        style:'mapbox://styles/mapbox/streets-v11',
        center:[prod.owner.lng,prod.owner.lat],
        zoom: 14
    });
}

function createMarker(color: string, product : Product) : void {
    new mapboxgl.Marker({color})
        .setLngLat(new mapboxgl.LngLat(product.owner.lng,product.owner.lat))
        .addTo(map);

}

function loadProductContainer(id : number) : void {  
    productDetails = document.getElementById('productContainer') as HTMLDivElement;                
    Product.getProduct(id).then(e =>{
        
        const product  = new Product(e.product);
        createMap(product);
        createMarker('red',product);
        productDetails.appendChild(product.toHTML());
 
    }).catch(err =>{
        Swal.fire({
            icon:'error',
            title:'Register Error',
            text: err
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    id = location.search.split('=')[1];
    mapDiv = document.getElementById('map') as HTMLDivElement;
    productDetailsForm = document.getElementById('productContainer') as HTMLFormElement;
    
    loadProductContainer(id);

    
});
