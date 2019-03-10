'use strict';

import React from 'react';
import Projectz from './projects';
import Notez from './notes';

const e = React.createElement;

export default class ProNotes extends React.Component {

    constructor(props) {

        super(props);

        this.generateKey = this.generateKey.bind(this);
        this.key = this.generateKey("zend");
        this.key2 = this.generateKey("secret");

    }

    generateKey(pre) {

        return `${ pre }_${ new Date().getTime() }`;

    }
    

    render() {
      return e("section",   {className:"row row-padding sectionmargin"},
                e("div", {className: "col-md-6 pronotes",
            
                children: [e("h1", {className:"projH", key: this.key}, "Notes"),

                    this.props.notes.map((data, index) => {

                    let key = this.generateKey(index);
                    let arrowdown;
                    
                    if (index === 0) {

                        arrowdown = "arrowdown";

                    }

                    return e(Notez, {
    
                    key: key,
                    title: data.title,
                    description: data.description,
                    preview: data.preview,
                    url: data.url,
                    date: data.date,
                    id: arrowdown
    
                    })})]}),

                e("div", {className:"col-md-6 pronotes",
            
                    children: [e("h1", {className:"projH", key: this.key2}, "Projects"),
                
                        this.props.projects.map((data, index) => {

                        let key = this.generateKey(index);

                        return e(Projectz, {

                            key: key,
                            title: data.title,
                            description: data.description,
                            preview: data.preview,
                            url: data.url,
                            date: data.date
        
                        })})
                    ]}
                )
            )     
        }
}