export class ServiceApi {
    getListApi = () => {
        let promise = axios ({
            url: "https://64bb72405e0670a501d7082f.mockapi.io/Products",
            method: "GET",
        })
        return promise;
    };
    getProductByID = (id) => {
        let promise = axios ({
            url : `https://64bb72405e0670a501d7082f.mockapi.io/Products/${id}`,
            method: "GET"
        })
        return promise;
    }
} 
    
