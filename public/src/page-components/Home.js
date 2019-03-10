'use strict';

import React from 'react';
import { Link } from 'react-browser-router';
import Header from './home-components/header';
import Point from './home-components/point';
import Projects from './home-components/scroll-projects';
import QuickNotes from './home-components/quick-notes';
import Footer from './common/footer';

const e = React.createElement;

export default class Home extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            projects: [],
            notes: [],
            loading: "loading"

        }

        this.generateKey = this.generateKey.bind(this);

    }

    componentDidMount() {

        let myHeaders = new Headers();
        let myThis = this;

        fetch("/homep", {

            method: 'GET',
            headers: myHeaders
          
        }).then((res) => res.json())
        .then((data) =>  {

            let a = JSON.parse(data);

            this.setState({
                
                projects: a.projects,
                notes: a.notes,
       
            });

           
        }).then((data) => {

            this.setState({loading: "done"});

        })
        .catch((err)=>console.log(err))

        document.querySelectorAll("a[href^='#']").forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth"
                });
            });
        });

        document.title = "Iris - Home";
        window.scrollTo(0, 0);

    }

    generateKey(pre) {

        return `${ pre }_${ new Date().getTime() }`;

    }

    render() {

        return  e("div", {className: "container-fluid container2"},
                    e(Header, {loading: this.state.loading}),
                    e(Point),
                    e("section", { id:"projects", className: "row row-no-padding",
            
                        children: this.state.projects.map((data, index) => {

                            let key = this.generateKey(index);
                            let counter = index + 1;
                            let flexclass;
                            let observer;

                            if (counter % 2 === 0) {

                                flexclass = "content r";

                            }

                            else {

                                if (counter === 1) {

                                    observer = "observer";

                                }

                                else {

                                    observer = "";

                                }

                                flexclass = "content";

                            }

    
                            return e(Projects, {
  
                                key: key,
                                title: data.title,
                                description: data.description,
                                preview: data.preview,
                                flex: flexclass,
                                observer: observer,
                                url: data.url
  
                            })})}),

                    e("h1", {className: "badthinking"}, 
                        'Latest from our ', e(Link, {to:"/notes"}, `Notes`)),

                    e("section", {className: "row row-padding sectionmargin",
            
                        children: this.state.notes.map((data, index) => {

                            let key = this.generateKey(index);
    
                            return e(QuickNotes, {
      
                                key: key,
                                title: data.title,
                                description: data.description,
                                preview: data.preview,
                                url: data.url,
                                date: data.date
      
                            })})
                    }),

                    e(Footer, {loading: this.state.loading})
                )
            }
}
