'use strict';

import React from 'react';
import ContactUs from './contact-us';
import LoadingScreen from './loading-screen';

const e = React.createElement;

export default function Footer(props) {

    return e("footer", { className:"row last row-no-padding"}, 
                e("section", { className:"col-12 last2"},
                    e(ContactUs),
                    e("div", { className:"padddding", id:"contact"},
                        e("div", { className:"inf1"}, 
                            e("span", null, "5 Princes Buildings"),
                            e("span", null, "Bath"),
                            e("span", null, "BA1 2ED")),
                        e("div", { className:"inf2"},
                            e("a", { href:"tel:387656"}, "+387656"),
                            e("a", { href:"mailto: test@gmail.com"}, "test@gmail.com"),
                            e("a", { href:"www.twitteracc.com"}, "@twitteracc")),
                        e("div", { className:"inf3"}, 
                            e("span", null, "©2018 Our Name is Mud"),
                            e("span", null, "Company No. 8589415"),
                            e("span", {title:"We don't care about your data."}, "Privacy Policy")
                            )
                    )
                ),

                e(LoadingScreen, {loading: props.loading})
            )              
}