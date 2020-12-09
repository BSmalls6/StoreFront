import React, { useState } from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'
import API from "../../Utils/API";
import { createMuiTheme } from 'material-ui/styles'
import Products from "../Products";
import axios from "axios";


const Search = ({categories,currUser, setCurrUser}) => {
    const theme = createMuiTheme();
    const classes = {
        card: {
            margin: 'auto',
            textAlign: 'center',
            paddingTop: 10,
            backgroundColor: '#80808024'
        },
        menu: {
            width: 200,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 130,
            verticalAlign: 'bottom',
            marginBottom: '20px'
        },
        searchField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 300,
            marginBottom: '20px'
        },
        searchButton: {
            minWidth: '20px',
            height: '30px',
            padding: '0 8px'
        }
    };

    const [state, setState] = useState({
        category: '',
        search: '',
        results: [],
        searched: false,
        type: "all"
    });

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        })
    };

    const search = () => {
        if (state.search) {
            axios
                .get(
                    `https://api.bestbuy.com/v1/products(longDescription=${
                    state.search
                    }*)?format=json&apiKey=0j7iapqW9cMtP87GqDaxc2Um`
                )
                .then(results => {
                    console.log(results.data.products);
                    setState({ ...state, results: results.data.products, searched: true, type:"simple"})
                })
                .catch(err => console.log(err));
        } else if (state.category && state.category != "All") {
            axios
                .get(`https://api.bestbuy.com/v1/products((categoryPath.id=${state.category}))?apiKey=0j7iapqW9cMtP87GqDaxc2Um&pageSize=20&format=json`)

                .then((data) => {
                    console.log(data.data.products);
                    setState({...state, results: data.data.products, searched: true, type: "simple"})
                })
                .catch(err => console.log(err));
        } else {
            axios
                .get(`https://api.bestbuy.com/beta/products/trendingViewed?apiKey=0j7iapqW9cMtP87GqDaxc2Um`)
                .then(data => {
                    console.log(data.data.results);
                    setState({...state, results: data.data.results, searched: true })
                })
                .catch(err => console.log(err));
        }
    };

    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search();
        }
    };

    return (
        <div >
            <Card style={classes.card}>
                <TextField
                    id="select-category"
                    select
                    label="Select category"
                    style={classes.textField}
                    value={state.category}
                    onChange={handleChange('category')}
                    SelectProps={{
                        MenuProps: {
                            style: classes.menu,
                        },
                    }}
                    margin="normal">
                    <MenuItem value="All">
                        All
                    </MenuItem>
                    {categories.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="search"
                    label="Search products"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('search')}
                    style={classes.searchField}
                    margin="normal"
                />
                <Button variant="raised" color={'primary'} style={classes.searchButton} onClick={search}>
                    <SearchIcon />
                </Button>
                <Divider />
                <Products type = {state.type} products={state.results} searched={state.searched} currUser={currUser} setCurrUser={setCurrUser} />
            </Card>
        </div>

    )
}


export default Search;