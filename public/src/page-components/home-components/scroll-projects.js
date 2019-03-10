'use strict';

import React from 'react';
import { Link } from 'react-browser-router';
import _ from 'underscore';

const e = React.createElement;

export default class Projects extends React.Component {

    constructor(props) {
        
        super(props);

        this.constantFrame = {

            WebkitClipPath: `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)`,
            ClipPath: `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)`,
            WillChange: `clip-path`,
            transition: `clip-path 500ms ease 0s; -webkit-clip-path 500ms ease 0s`

        };

        this.text = React.createRef();
        this.element = React.createRef();
        this.element2 = React.createRef();
        this.state = {

            loaded: false,
            notLoaded: false,
            attriSet: false,
            shape: {

                WebkitClipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)",
                ClipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)",
                WillChange: "clip-path",
                Transition: "clip-path 500ms ease 0s; -webkit-clip-path 500ms ease 0s"

            }

            
        };
        
        this.isElementInViewPort = this.isElementInViewPort.bind(this);
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.generateKeyframe = this.generateKeyframe.bind(this);
        this.messiah = this.messiah.bind(this);
        this.throttle = _.throttle(this.messiah, 250);

    }

    componentWillUnmount() {

        window.removeEventListener("scroll", this.throttle, false)
        window.removeEventListener("resize", this.throttle, false)

    }

    messiah() {
        
        let target = this.element.current;
        let txt = this.text.current;
        let elementFix = this.element2.current;
        let realThis = this;

        this.onVisibilityChange(target, function() {

            if ((window.innerWidth || document.documentElement.clientWidth) < 770) {

                elementFix.style.webkitClipPath = realThis.constantFrame.WebkitClipPath;
                elementFix.style.clipPath = realThis.constantFrame.ClipPath;
                txt.style.opacity = 1;
                realThis.setState({attriSet: false})
                realThis.setState({notLoaded:true});

            }
        
            else {

                elementFix.style.webkitClipPath = realThis.constantFrame.WebkitClipPath;
                elementFix.style.clipPath = realThis.constantFrame.ClipPath;
                txt.style.opacity = 1;
                realThis.setState({attriSet: false})
                realThis.setState({notLoaded: true})

            }
            
            
        
        }, function() { 
       
        if (realThis.state.notLoaded === true && realThis.state.attriSet === false) {

            let newShape = realThis.generateKeyframe(); 
            elementFix.style.webkitClipPath = newShape.WebkitClipPath;
            elementFix.style.clipPath = newShape.ClipPath;
            txt.style.opacity = 0;
            realThis.setState({notLoaded: true})
            realThis.setState({attriSet: true})
            
        }
        
        if (realThis.state.attriSet === false && realThis.state.loaded === true) {
    
            let newShape = realThis.generateKeyframe(); 
            elementFix.style.webkitClipPath = newShape.WebkitClipPath;
            elementFix.style.clipPath = newShape.ClipPath;
            txt.style.opacity = 0;
            realThis.setState({attriSet: true});
        
        }
        
        
        else {
        
            return;
        
        }

    }, realThis)

    }
    

    componentDidMount() {

        let txt = this.text.current;
        let realThis = this;
        let elementFix = this.element2.current;

        if (this.isElementInViewPort(txt)) {

            if ((window.innerWidth || document.documentElement.clientWidth) < 770) {

                realThis.setState({loaded: true});
                txt.style.opacity = 1;
                elementFix.style.webkitClipPath = realThis.constantFrame.WebkitClipPath;
                elementFix.style.clipPath = realThis.constantFrame.ClipPath;
                   
            }
        
            else {
        
                realThis.setState({loaded: true});
                txt.style.opacity = 1;
                elementFix.style.webkitClipPath = realThis.constantFrame.WebkitClipPath;
                elementFix.style.clipPath = realThis.constantFrame.ClipPath;

            }
        
        }
        
        if (!(this.isElementInViewPort(txt))) {

            let newShape = this.generateKeyframe();
            elementFix.style.WebkitClipPath = newShape.WebkitClipPath;
            elementFix.style.ClipPath = newShape.ClipPath;

        }

        window.addEventListener("scroll", this.throttle, false)
        window.addEventListener("resize", this.throttle, false)
    
    
    };

    generateKeyframe() {

        let point1x = 50;
        let point1y = Math.floor(this.getRandomNumber(0, 40));
        let point2x = Math.floor(this.getRandomNumber(60, 100));
        let point2y = Math.floor(this.getRandomNumber(0, 40));
        let point3x = Math.floor(this.getRandomNumber(60, 100));
        let point3y = Math.floor(this.getRandomNumber(60, 100));
        let point4x = Math.floor(this.getRandomNumber(0, 40));
        let point4y = Math.floor(this.getRandomNumber(60, 100));
        let point5x = Math.floor(this.getRandomNumber(0, 40));
        let point5y = Math.floor(this.getRandomNumber(0, 40));
        
        let keyFrames = {

            WebkitClipPath: `polygon(${point1x}% ${point1y}%, ${point2x}% ${point2y}%, ${point3x}% ${point3y}%, ${point4x}% ${point4y}%, ${point5x}% ${point5y}%)`,
            ClipPath: `polygon(${point1x}% ${point1y}%, ${point2x}% ${point2y}%, ${point3x}% ${point3y}%, ${point4x}% ${point4y}%, ${point5x}% ${point5y}%)`,
            WillChange: "clip-path",
            Transition: "clip-path 500ms ease 0s: -webkit-clip-path 500ms ease 0s",

        };

    return keyFrames;
    
    };

    getRandomNumber(min, max) {

    return Math.random() * (max - min) + min;
        
    };

    onVisibilityChange(el, callback, callback2, realThis) {

        let visible = realThis.isElementInViewPort(el);
  
            if (visible) {
                
                if (typeof callback == "function") {

                    callback();

                }
            }

            else {

                if (typeof callback == "function") {

                    callback2();

                }
            }
    };

    isElementInViewPort(el) {
     
        let rect = el.getBoundingClientRect();
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

    render() {
      return e("div", {id: this.props.observer, className:"col-12"},
                e("div", {className: this.props.flex},
                    e("div", {className: "inSight flexe", ref: this.element2},
                        e(Link, {to:this.props.url},
                            e("img", {className:"saveme", ref: this.element, src: this.props.preview}))),
                    e("div", {className:"text", ref: this.text},
                        e("h2", {}, 
                        e(Link, {to:this.props.url}, this.props.title)),
                    e("p", {className:"hideptext"}, this.props.description),
                    e(Link, {className:"box", to:this.props.url},
                        e("span", {className:"line"}),
                        e("span", {className:"view", href:this.props.url}, "View Project"))
                    )
                )
            ) 
    }
};