import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from "../src/components/Menu"
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Signin from "./Pages/SignIn";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import axios from "axios"

const MainRouter = withRouter(({ history }) => {
  const [currUser, setCurrUser] = useState({
    id: '',
    cart: [],
    orders: [],
    histories: [],
    name: '',
    email: '',
    createDate: ''
  });

  useEffect(() => {
    if (history.location.pathname.includes("/user") || history.location.pathname.includes("/cart") || history.location.pathname.includes("/profile")) {
      console.log(queryString.parse(history.location.search));
      const user_id = queryString.parse(history.location.search).id;
      axios.get(`../api/users/${user_id}`)
        .then(userInfo => {
          console.log(userInfo.data);
          setCurrUser({
            ...currUser,
            id: userInfo.data._id,
            name: userInfo.data.name,
            email: userInfo.data.email,
            createDate: userInfo.data.createAt,
            cart: userInfo.data.cart,
            orders: userInfo.data.orders,
            histories: userInfo.data.histories
          })
        })
    }
  }, [])



  return (
    <div>
      <Menu currUser={currUser} setCurrUser={setCurrUser} />
      <div style={{ marginLeft: "15px", marginRight: "15px" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={() => <Home currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route path="/cart" component={() => <Cart currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route path="/profile" component={() => <Profile currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </div>
    </div>
  )

})

export default MainRouter
