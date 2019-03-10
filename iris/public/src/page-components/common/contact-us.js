'use strict';

import React from 'react';

const e = React.createElement;

export default function ContactUs() {

    return  e("div", { className:"contactus" },
                e("div", { className: "contact-small" }, 
                    e("span", null, "We live the code. So if there’s something interesting on your mind or you just want to introduce yourself, "),
                    e("span", null, "contact us."),
                    e("span", null, " We’re always happy to chat...")),
             )    
    }