import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import ViewIcon from 'material-ui-icons/Visibility'
import Divider from 'material-ui/Divider'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import AddToCart from '../AddToCart/index'
import testpic from "../../assets/images/profile-pic.png";
import { createMuiTheme} from 'material-ui/styles';




const PopList = (props) => {

    const theme = createMuiTheme();

    const classes = {
        root: theme.mixins.gutters({
            padding: theme.spacing.unit,
            paddingBottom: 24,
            backgroundColor: '#80808024'
        }),
        title: {
            margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
            color: theme.palette.openTitle,
            fontSize: '1.1em'
        },
        viewButton: {
            verticalAlign: 'middle'
        },
        card: {
            width: '100%',
            display: 'inline-flex'
        },
        details: {
            display: 'inline-block',
            width: "100%"
        },
        content: {
            flex: '1 0 auto',
            padding: '16px 8px 0px'
        },
        cover: {
            width: '65%',
            height: 130,
            margin: '8px'
        },
        controls: {
            marginTop: '8px'
        },
        date: {
            color: 'rgba(0, 0, 0, 0.4)'
        },
        icon: {
            verticalAlign: 'sub'
        },
        iconButton: {
            width: '28px',
            height: '28px'
        },
        productTitle: {
            fontSize: '1.15em',
            marginBottom: '5px'
        },
        subheading: {
            color: 'rgba(88, 114, 128, 0.67)'
        },
        actions: {
            float: 'right',
            marginRight: '6px'
        },
        price: {
            display: 'inline',
            lineHeight: '3',
            paddingLeft: '8px',
            color: theme.palette.text.secondary
        }
    };
    
    return (
        <div style={{overflow:"auto",maxHeight:"1500px"}}>
            <Paper style={classes.root} elevation={4}>
                <Typography type="title" style={classes.title}>
                    {props.title}
                </Typography>
                {props.products.map((item, i) => {
                    return <span key={i}>
                        <Card style={classes.card}>
                            <CardMedia
                                style={classes.cover}
                                image={item.images.standard}
                                title={item.names.title}
                            />
                            <div style={classes.details}>
                                <CardContent style={classes.content}>
                                    <a href={item.links.web} target="_blank"><Typography type="title" component="h3" style={classes.productTitle} color="primary">{item.names.title}</Typography></a>
                                </CardContent>
                                <div style={classes.controls}>
                                    <Typography type="subheading" component="h3" style={classes.price} color="primary">$ {item.prices.current}</Typography>
                                    <span style={classes.actions}>
                                        <AddToCart item={{sku:item.sku,name:item.names.title,link:item.links.web,image:item.images.standard,price:item.prices.current, quantity:1}} currUser={props.currUser} setCurrUser={props.setCurrUser} />
                                    </span>
                                </div>
                            </div>
                        </Card>
                        <Divider />
                    </span>
                })
                }
            </Paper>
        </div>
    )
}


export default PopList;