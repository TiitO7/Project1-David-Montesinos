import { IUser } from '../interfaces/iuser';
import { TokenResponse } from '../interfaces/responses';
import { Http } from './http.class';
import { User } from './user.class';

export class Auth {
    email: string;
    password: string;
    lat?: number;
    lng?: number;

    constructor(user:IUser){
        this.email = user.email;
        this.password = user.password;
        this.lat = user.lat;
        this.lng = user.lng;
    }

    static async login( userInfo: IUser) : Promise<void>{
        const resp = await Http.post<TokenResponse>(`$(SERVER)/auth/login`,userInfo);
        localStorage.setItem("token", resp.accessToken);
    }
    static async register(userInfo:IUser): Promise<void>{
        await Http.post(`$(SERVER)/auth/register`, userInfo);
    }
    static async checkToken() : Promise<void>{
        const token = localStorage.getItem('token');
        if(token){
            try{
                await Http.get(`$(SERVER)/auth/validate`);
                
            }catch(e){
                if(e.status && e.status === 401){
                    localStorage.removeItem('token');
                }
                throw new Error();
            }
        }else{
            throw new Error();
        }
    }

    static logout() : void{
        localStorage.removeItem('token');     
    }
}