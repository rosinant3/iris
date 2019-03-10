'use strict';

import React from 'react';
import { Link } from 'react-browser-router';
import _ from 'underscore';

const e = React.createElement;

export default class Projectz extends React.Component {

    constructor(props) {

        super(props);
        
        this.element = React.createRef();
        this.isElementInViewPort = this.isElementInViewPort.bind(this);
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        this.throttle = _.throttle;

    }

    
    componentDidMount() {

        let target = this.element.current;
        let realThis = this;

        if (this.isElementInViewPort(target)) {

            if ((window.innerWidth || document.documentElement.clientWidth) < 770) {

                target.style.webkitClipPath = "polygon(1% 42%, 100% 30%, 100% 72%, 0 56%)";
                target.style.clipPath = "polygon(1% 42%, 100% 30%, 100% 72%, 0 56%)";
                
            }
        
            else {

                target.style.webkitClipPath = "polygon(1% 42%, 100% 30%, 100% 72%, 0 56%)";
                target.style.clipPath = "polygon(1% 42%, 100% 30%, 100% 72%, 0 56%)";

            }
        
        }

        let allin = this.throttle.call(this, this.onVisibilityChange(target, function() {

            if ((window.innerWidth || document.documentElement.clientWidth) < 770) {
        
                target.style.webkitClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
                target.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
                window.removeEventListener("scroll", allin);
                window.removeEventListener("resize", allin);

            }
        
            else {
        
                target.style.webkitClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
                target.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
                window.removeEventListener("scroll", allin);
                window.removeEventListener("resize", allin);

            }}, 
            
        realThis), 350);

        window.addEventListener("scroll", allin, false);
        window.addEventListener("resize", allin, false);
    
    };


    onVisibilityChange(el, callback, realThis) {
       
        return function () {

            var visible = realThis.isElementInViewPort(el);

            if (visible) {
                
                if (typeof callback == 'function') {

                    callback();

                }
            }

        }

    };

    isElementInViewPort(el) {

        var rect = el.getBoundingClientRect();
        let innHT;
        let innHB;

        if ((window.innerWidth || document.documentElement.clientWidth) <= 900) {

            innHT = -130;
            innHB = (window.innerHeight || document.documentElement.clientHeight) + 120;

        }

        if ((window.innerWidth || document.documentElement.clientWidth) > 900) {

            innHT = -210;
            innHB = (window.innerHeight || document.documentElement.clientHeight) + 240;
   
        }

        return (

            rect.top >= innHT &&
            rect.left >= 0 &&
            rect.bottom <= innHB && 
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) 

        );
    };


   render() { return e("article", {className:"col-12 entry2 fixed2"},
                        e("div", {className: "text2 positioner", ref: this.element},
                            e(Link, {to: this.props.url}, 
                                e("img", {className:"pres", src: this.props.preview})),
                                e(Link, {to: this.props.url, className:"date"}, this.props.date),
                            e(Link, {className:"overlay", to: this.props.url}),
                            e("h4", {id:"messiah"}, 
                            e(Link, {to: this.props.url}, this.props.title)),
                            e(Link, {to: this.props.url}, this.props.description)
                        )
                    )
            }
}