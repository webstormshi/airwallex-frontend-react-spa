import axios from 'axios';

export const postRegister = (data) => 
    axios.post("https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth", data);