import axios from "axios";

export default {
    findPopularItems: function () {
        return axios.get("/api/products/popular");
    },
    findTrendyItems: function () {
        return axios.get("/api/products/trendy");
    },

    findByName: function (q) {
        return axios.get(`/api/products/?${q}`);
    },

    findBySKU: function (sku) {
        return axios.get(`/api/products/${sku}`);
    },

    findAllCategories: function(){
        return axios.get(`/api/products/allcategory`);
    },

    findByCategory : function(id){
        return axios.get(`/api/products/category/${id}`);
    },

    create : function(item){
        return axios.post(`/api/products`,item);
    },

    update: function(id,newItem){
        return axios.put(`/api/products/${id}`,newItem);
    },

    remove: function(id) {
        return axios.delete(`/api/products/${id}`);
    },

    login: function (user) {
        return axios.post(`/api/users/login`,user);
    },

    signup: function (user) {
        return axios.post(`api/users/signup`,user);
    },

    findUserById: function(id) {
        return axios.get(`api/users/${id}`);
    }





};