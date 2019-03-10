'use strict';

import React from 'react';
import { Link } from 'react-browser-router';

const e = React.createElement;

export default function QuickNotes(props) {

        return e("article", { className:"col-md-6 entry2 fixed2" },
                    e("div", { className: "text2" },
                        e(Link, { to: props.url }, 
                            e("img", { className:"pres", src: props.preview })),

                        e(Link, { to: props.url, className:"date" }, props.date),

                        e(Link, {className:"overlay", to: props.url}),
                            e("h4", {id:"messiah"}, 
                                e(Link, { to: props.url }, props.title)),
                        e(Link, { to: props.url }, props.description)
                    )
                )    
}