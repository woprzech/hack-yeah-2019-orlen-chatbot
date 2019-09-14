import uuid from "uuid";
import axios from "axios"

export default class RasaHttp {

    sender = uuid.v1();

    ask = text => {
        return axios.post('http://175c7689.ngrok.io/webhooks/rest/webhook', {
            message: text,
            sender: this.sender
        })
            .then((response) => {
                console.log("Response data: ", response.data[0].custom);
                return response.data[0].custom
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

}