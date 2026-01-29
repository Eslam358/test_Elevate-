export interface Todos {
  userId:number,
  id:number,
  title:string,
  completed:false | true
  }
export interface Post {
  userId:number,
  id:number,
  title:string,
  body:string,
  completed?:false | true
  }

 export interface Author {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": string,
      "geo": {
        "lat": number,
        "lng": number
      }
    },
    "phone": string,
    "website":string,
    "company": {
      "name": string,
      "catchPhrase": string,
      "bs": string,
    }
  }
