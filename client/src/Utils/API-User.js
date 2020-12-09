import axios from "axios";

export default {
    signup: function(newUser) {
        return axios.post("api/users/signup", newUser);
    },

    login: function(user) {
        return axios.post("api/users/login", user);
    },

    isAuthenticated: function (id) {
        return axios.get(`api/users/${id}`);
    }





};