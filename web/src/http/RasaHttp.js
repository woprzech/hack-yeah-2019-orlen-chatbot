import uuid from "uuid";
import axios from "axios"

export default class RasaHttp {

    sender = uuid.v1();

    ask = text => {
        return axios.post('http://88a8e5b8.ngrok.io/webhooks/rest/webhook', {
            message: text,
            sender: this.sender
        })
            .then((response) => {
                console.log("Response data: ", response.data);
                return response.data
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

}