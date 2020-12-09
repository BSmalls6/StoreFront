import React, { useEffect, useState } from 'react'
import IconButton from 'material-ui/IconButton'
import AddCartIcon from 'material-ui-icons/AddShoppingCart'
import DisabledCartIcon from 'material-ui-icons/RemoveShoppingCart'
import API from "../../Utils/API";
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import axios from "axios"



const AddToCart = withRouter(({ history, item, currUser, setCurrUser}) => {
    console.log(currUser);
    const classes = {
        iconButton: {
            width: '28px',
            height: '28px'
        },
        disabledIconButton: {
            color: '#7f7563',
            width: '28px',
            height: '28px'
        }
    };

    const [state, setState] = useState({
        redirect: false
    });

    // const [currUser, setCurrUser] = useState({
    //     id:'',
    //     cart:[],
    //     orders:[],
    //     histories:[],
    //     name:'',
    //     email:'',
    //     createDate:''
    // });


    // useEffect(() => {
    //     if (history.location.pathname.includes("/user")) {
    //         console.log(queryString.parse(history.location.search));
    //         const user_id = queryString.parse(history.location.search).id;
    //         axios.get(`../api/users/${user_id}`)
    //             .then(userInfo => {
    //                 console.log(userInfo.data);
    //                 setCurrUser({
    //                     ...currUser,
    //                     id: userInfo.data._id,
    //                     name: userInfo.data.name,
    //                     email: userInfo.data.email,
    //                     createDate: userInfo.data.createAt,
    //                     cart: userInfo.data.cart,
    //                     orders: userInfo.data.orders,
    //                     histories: userInfo.data.histories
    //                 })
    //             })
    //     }
    // }, [history.location])

    const updateCurrUser = (updateObj) =>{
        console.log(currUser);
        axios.put(`../api/users/update/${currUser.id}`, updateObj)
        .then(result =>{
            console.log(result);
            setCurrUser({ ...currUser, updateObj});
            history.push(`/cart/?id=${currUser.id}`)
        })
    }
 
    const addToCart = () => {
        let currUserCart = currUser.cart;
        let currUserHistory = currUser.histories;
        if (!checkExsisting(currUserHistory,item)) currUserHistory.push(item);
        let flag = false;
        let newCurrUserCart;
        if (currUserCart) {
            currUserCart.map(obj => {
                if (obj.sku === item.sku) {
                    obj.quantity += 1;
                    flag = true;
                }
            });
            newCurrUserCart = currUserCart;
        }
        if (!flag) newCurrUserCart.push(item);

        console.log(newCurrUserCart);
        let updateObj = {cart: newCurrUserCart, histories: currUserHistory};
        console.log(updateObj);
        updateCurrUser(updateObj);
    };

    const checkExsisting = (array, obj) => {
        if (array.some(element => element.sku===obj.sku)) return true;
        else return false;
    }

    return (
        <span>
            {history.location.pathname.includes("/user") ?
                (<IconButton color="secondary" dense="dense" onClick={addToCart}>
                    <AddCartIcon style={classes.iconButton} />
                </IconButton>) :
                (<IconButton disabled={true} color="secondary" dense="dense">
                    <AddCartIcon style={classes.disabledIconButton} />
                </IconButton>)}
        </span>
    )
})


export default AddToCart;
