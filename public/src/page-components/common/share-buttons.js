'use strict';

import React from 'react';

const e = React.createElement;

export default class ShareButtons extends React.Component {

    constructor(props) {

        super(props);

        this.shareOnFacebook = this.shareOnFacebook.bind(this);
        this.shareOnTwitter = this.shareOnTwitter.bind(this);
        this.shareOnLinkedIn = this.shareOnLinkedIn.bind(this);
   
        }

        shareOnFacebook() {

            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(document.URL) + "&quote=" + encodeURIComponent(document.URL))

        }

        shareOnTwitter() {

            window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) + ":%20"  + encodeURIComponent(document.URL))

        }

        shareOnLinkedIn() {

            window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(document.URL) + "&title=" +  encodeURIComponent(document.title))

        }

        render() {
      return e("ul", {className:"share-buttons"},
                e("li", null,
                    e("a", {href:"https://www.facebook.com/sharer/sharer.php?u=&quote=",
                            title:"Share on Facebook",
                            target: "blank",
                            onClick: this.shareOnFacebook},
                        e("img", {alt: "Share on Facebook",
                                src:"/images/flat_web_icon_set/inverted/Facebook.png"})
                            
                            )
                ),

                e("li", null,
                e("a", {href:"https://twitter.com/intent/tweet?source=&text=:%20",
                        title:"Tweet",
                        target: "_blank",
                        onClick: this.shareOnTwitter},
                    e("img", { alt: "Tweet",
                               src:"/images/flat_web_icon_set/inverted/Twitter.png"})
                    )
                ),


                e("li", null,
                    e("a", { href:"http://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source=",
                             title:"Share on LinkedIn",
                             target: "blank",
                             onClick: this.shareOnLinkedIn},
                    e("img", { alt: "Share on LinkedIn",
                               src:"/images/flat_web_icon_set/inverted/LinkedIn.png"})
                    )
                )

            )
        }
}
