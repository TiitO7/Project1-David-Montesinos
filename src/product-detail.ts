import * as mapboxgl from 'mapbox-gl';
import { accessToken } from 'mapbox-gl';
import { Product } from './classes/product.class';
import { MAPBOX_TOKEN } from './constants';
import { ProductResponse } from './interfaces/responses';

let mapDiv: HTMLDivElement = null;
let map: mapboxgl.Map = null;
let productDetailsForm : HTMLFormElement = null;
let productDetails : HTMLDivElement = null;
let id : any;
let lngLat : any;
let pos:any;
(mapboxgl.accessToken as string) = MAPBOX_TOKEN;

function getMyPosition(): Promise<Position> {
    return new Promise((resolve, _reject) => {
        navigator.geolocation.getCurrentPosition(pos =>
            resolve(pos));  
    });
}
function createMarker(color: string, lngLat: mapboxgl.LngLatLike) : any {
    new mapboxgl.Marker({color}).setLngLat(lngLat).addTo(map);
}

async function loadMap() : Promise<any>{
    mapDiv = document.getElementById('map') as HTMLDivElement;
    pos = await getMyPosition();   
   
    return map = new mapboxgl.Map(
        {
            container: mapDiv,style: 'mapbox://styles/mapbox/streets-v11',
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 14,   
        });
   
}
async function loadProductContainer(id : number) : Promise<void> {
    productDetails = document.getElementById('productContainer') as HTMLDivElement;
    const promiseProduct : ProductResponse = await Product.getProduct(id);
    let product : Product = new Product(promiseProduct.product);
    productDetails.appendChild(product.toHTML());
}


window.addEventListener('DOMContentLoaded', () => {
    id = location.search.split('=')[1];

    productDetailsForm = document.getElementById('container mt-4') as HTMLFormElement;
    loadProductContainer(id);
    loadMap(); 
    lngLat = new mapboxgl.LngLat(pos.coords.longitude, pos.coords.latitude);           
    createMarker('green', lngLat);

    
});
