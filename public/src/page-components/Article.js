'use strict';

import React from 'react';
import ArticleHeader from './article-component/article-header';
import ArticleBody from './article-component/article-body';
import Footer from './common/footer';

const e = React.createElement;

export default class Article extends React.Component {

    constructor(props) {

        super(props);

    }
    
  componentDidMount() {

    window.scrollTo(0, 0);

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth"
                });
            });
    });

       
    }

    render() {

            return  e("div", {className: "container-fluid container2"},
            e(ArticleHeader),
            e(ArticleBody, {param: this.props.match.params.id}),
            e(Footer))

    }

}