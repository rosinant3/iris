'use strict';

import React from 'react';

const e = React.createElement;

export default function Point() {


      return e("section",   { className:"row wrap2" },
                e("div", {className:"col-12"},
                    e("h2", {className:"introduction"},
                        `We make beautiful and engaging websites that create significant, 
                        constructive change for our clients.`)
                ),
            );

}
