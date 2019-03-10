'use strict';

import React from 'react';
import { Link } from 'react-browser-router';

const e = React.createElement;

export default class ArticleHeader extends React.Component {

    constructor(props) {

        super(props);
        this.headline = React.createRef();
        this.state = { mounted: false }

    }

    render() {
      return e("header",   { className:"row" },
                e("div", { className:"col-12"},
                e( "nav",   { className:"fixed5" },
                    e(  Link,    { className:"logo", to:"/", style:{float: "left"}},
                        "Iris"
                    ),
                    e(  Link,    {to:"/"},
                        "Home"
                    ),
                    e(  Link,    { to:"/notes"},
                        "Notes"
                    ),
                    e(  "a",    { className:"contact mar contact4 imtiredok", href:"#contact" },
                        "Contact"
                    ),
                ),
                )
            ) 
        }
}
