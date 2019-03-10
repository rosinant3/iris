'use strict';

import React from 'react';

const e = React.createElement;

export default function LoadingScreen(props) {

    let clas;

    if (props.loading === "done") {

        clas = "loadmain done";

    }

    if (props.loading === "loading") {

        clas = "loadmain loading";

    }
    
    return (

        e("div", {className: clas})

    )
}