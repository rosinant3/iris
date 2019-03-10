'use strict';

import React from 'react';
import HQHeader from './hq-components/hq-header';
import ProNotes from './hq-components/pro-notes';
import Footer from './common/footer';

const e = React.createElement;

export default class HQ extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

                projects: [],
                notes: [],
                latest: [],
                loading: "loading"
  
        }

    }

    componentDidMount() {

        let myHeaders = new Headers();
        let myThis = this;

        fetch("/alldataget", {

            method: "GET",
            headers: myHeaders

        }).then((res) => res.json())
        .then((data) =>  {

            let a = JSON.parse(data);

            this.setState({

                projects: a.projects,
                notes: a.notes,
                latest: a.latest
              
            });

            
          
        })
        .then((data) => {

            this.setState({loading: "done"});

        })
        .catch((err)=>console.log(err))

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

        return  e("div", {className:"container-fluid container2"},
                e(HQHeader, { latest: this.state.latest, loading: this.state.loading }),
                e(ProNotes, { notes: this.state.notes, projects: this.state.projects }),
                e(Footer, { loading: this.state.loading }))

            }
}
