import React, { useEffect, useState } from 'react'
import Grid from 'material-ui/Grid'
import Search from '../components/Search';
import PopularList from "../components/PopularList";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import History from "../components/History";

const Home = withRouter(({ history, currUser, setCurrUser}) => {
    const classes = {
        root: {
            flexGrow: 1,
            margin: 30,
        }
    };
    const [state, setState] = useState({
        suggestionTitle: "Popular Products",
        suggestions: [],
        categories: [],
        histories: [],
    });
    useEffect(() => {
        axios
            .get(`https://api.bestbuy.com/beta/products/mostViewed?apiKey=0j7iapqW9cMtP87GqDaxc2Um`)
            .then(data1 => {
                console.log(data1.data.results);
                axios
                    .get(`https://api.bestbuy.com/v1/categories(id=abcat*)?apiKey=0j7iapqW9cMtP87GqDaxc2Um&pageSize=20&show=id,name&format=json`)
                    .then(data => {
                        console.log(data.data.categories);
                        if (history.location.pathname.includes("/user")) {
                            console.log(queryString.parse(history.location.search));
                            const user_id = queryString.parse(history.location.search).id;
                            axios.get(`../api/users/${user_id}`)
                                .then(userInfo => {
                                    console.log(userInfo.data);
                                    setState({ ...state, suggestions: data1.data.results, categories: data.data.categories, histories: userInfo.data.histories })
                                })
                        } else {
                            setState({ ...state, suggestions: data1.data.results, categories: data.data.categories })
                        }
                    })
            })
    }, [state]);

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={8} sm={8}>
                    <Search categories={state.categories} currUser={currUser} setCurrUser={setCurrUser} />
                    {/* {history.location.pathname.includes("/user") && <History items={state.histories}/>} */}
                </Grid>
                <Grid item xs={4} sm={4}>
                    <PopularList products={state.suggestions} title={state.suggestionTitle} currUser={currUser} setCurrUser={setCurrUser}/>
                </Grid>
            </Grid>
        </div>
    )


});

export default Home;
