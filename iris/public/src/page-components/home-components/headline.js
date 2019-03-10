'use strict';

import React from 'react';

const e = React.createElement;

export default function Headline(props) {

    let transform;
    let opacity;

    if (props.loading === "done") {

        transform = "scale(0.8)";
        opacity = 1;

    }

    return (

        e("h1", {className: "title", style: { opacity: opacity, transform: transform}}, 
        
            "Everything at a glance.")
    )
}