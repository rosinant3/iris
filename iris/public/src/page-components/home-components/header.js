'use strict';

import React from 'react';
import Headline from './headline';
import { Link } from 'react-browser-router';

const e = React.createElement;

export default class Header extends React.Component {

    constructor(props) {

        super(props);
        this.headline = React.createRef();

    }

    render() {
      return e("header",   { className:"row" },
        e("div", {className:"col-12 background"},
        e( "nav",   { className:"fixed" },
            e(  Link,    { className:"logo", to:"/", style:{float: "left"}},
                "Iris"
              ),
            e(  "a",    { className:"imtiredok", href:"#observer"},
              "Projects"
            ),
            e(  Link,    { to:"/notes"},
                "Notes"
              ),
            e(  "a",    { className:"contact mar contact4", href:"#contact"},
                "Contact"
              ),
          ),
        e("div", {className:"headline"},
            e(Headline, {loading: this.props.loading})
        
        )
        )
      );
    }
}
