'use strict';

import React from 'react';
import { Link } from 'react-browser-router';

const e = React.createElement;

export default function News(props) {

    let headline;
    let news2;

    if (props.latest.length > 0 && props.loading === "done") {

        headline = props.headline;
        news2 = props.news2;

    }

    else {

        headline = {};
        news2 = {}

    }
       
    return  e("div", {className:"headline2"},
            e("h1", {className:"title2", style: headline}, "News, views and opinions"),
            e("div", {className:"news2", style: news2,
    
            children: [
            
            e("h6", {key: "unique"}, "Latest:"),
            
                props.latest.map((data, index) => {

                let key = props.generateKey(index);

                return e(Link, {

            
                            to: data.url,
                            key: key

                        },

                            data.title
            
                        )})]
            }),
            e("a", {href:"#arrowdown"}, e("i", {className:"fas fa-caret-down arrowz", style: headline}))
        )

}