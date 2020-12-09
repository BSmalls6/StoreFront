import React, { useState } from 'react'
import { createMuiTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Link } from 'react-router-dom'
import AddToCart from "../AddToCart";



const History = (props) => {
    const theme = createMuiTheme();
    const classes = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'auto',
            background: theme.palette.background.paper,
            textAlign: 'left',
            padding: '0 8px',
            maxHeight: "800px"
        },
        container: {
            minWidth: '100%',
            paddingBottom: '14px'
        },
        gridList: {
            width: '100%',
            minHeight: 200,
            padding: '16px 0 10px'
        },
        title: {
            padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
            color: theme.palette.openTitle,
            width: '100%'
        },
        tile: {
            textAlign: 'center'
        },
        image: {
            height: '100%'
        },
        tileBar: {
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            textAlign: 'left'
        },
        tileTitle: {
            fontSize: '1.1em',
            marginBottom: '5px',
            color: 'rgb(189, 222, 219)',
            display: 'block'
        }
    };

    return (
        <div style={classes.root}>
            <h2>View History:</h2>
            {props.items.length > 0 ?
                (<div style={classes.container}>
                    <GridList cellHeight={200} style={classes.gridList} cols={3}>
                        {props.items.map((product, i) => (
                            <GridListTile key={i} style={classes.tile}>
                                <a href={product.links.web} target="_blank"><img style={classes.image} src={product.images.standard} alt={product.names.title} /></a>
                                <GridListTileBar style={classes.tileBar}
                                    title={<a href={product.links.web} style={classes.tileTitle} target="_blank">{product.names.title}</a>}
                                    subtitle={<span>$ {product.prices.current}</span>}
                                    actionIcon={
                                        <AddToCart item={product} />
                                    }
                                />
                            </GridListTile>

                        ))}
                    </GridList></div>) : (<Typography type="subheading" component="h4" style={classes.title}>No History Found! :(</Typography>)}
        </div>
    )
}


export default History;