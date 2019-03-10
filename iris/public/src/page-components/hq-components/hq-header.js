'use strict';

import React from 'react';
import { Link } from 'react-browser-router';
import News from './news';

const e = React.createElement;

export default class HQHeader extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            headline: {

                transform: "",
                opacity: 0,

            },

            news2: {

                transform: "",
                opacity: 0,
                
            }

        }

        this.generateKey = this.generateKey.bind(this);

    }

    generateKey(pre) {

        return `${ pre }_${ new Date().getTime() }`;

    }

    componentDidMount() {

        let myThis = this;

        document.title = "Iris - Notes";

        setTimeout(function(){

            myThis.setState(

                {
                    headline: {
                        
                        transform: "translateY(30px)",
                        opacity: 1

                    }

                }

            )


        }, 200);

        setTimeout(function(){

            myThis.setState(

                {
                    news2: {
                        
                        transform: "translateY(30px)",
                        opacity: 1

                    }

                }

            )

        }, 250);

    }

    render() {
      return e("header",   { className:"row" },
        e("div", {className:"col-12 background2"},
        e( "nav",   { className:"fixed" },
            e(  Link,    { className:"logo", to:"/", style:{float: "left"}},
                "Iris"
              ),
            e(  Link,    { to:"/"},
              "Home"
            ),
            e(  Link,    { className:"imtiredok currentlocation", to:"/notes"},
                "Notes"
              ),
            e(  "a",    { className:"contact mar contact4", href:"#contact"},
                "Contact"
              ),
          ),
        
            e(News, {

                latest: this.props.latest,
                headline: this.state.headline,
                news2: this.state.news2,
                generateKey: this.generateKey,
                loading: this.props.loading

            })
        ),
      )
    }
}
