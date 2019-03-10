'use strict';

import React from 'react';
import ShareButtons from '../common/share-buttons';
import LoadingScreen from '../common/loading-screen';

const e = React.createElement;

export default class ArticleBody extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            loading: "loading"

        };

        this.headline = React.createRef();

    }

    componentDidMount() {

        let urlparameters = `url=${this.props.param}`;
        let myThis = this;

        fetch("/article", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlparameters,
        }).then((res) => res.json())
        .then((data) =>  {

            let a = JSON.parse(data);

            this.setState({

                title: a.title, 
                description: a.description,
                date: a.date,
                category: a.category,
                author: a.author,
                body: a.articlebody

            });

            document.title = `Iris - ${a.title}`;

        }).then((data) => {

            this.setState({loading: "done"});

        })
        .catch((err)=>console.log(err))  }


    render() {
      return e("section", { className: "row row-no-padding" },
                e('div', { className: "col-12" },
                    e("article", { className: "articlewrap"},
                        e("div", { className: "text5"},
                        
                            e("span", null, this.state.category),
                            e("h1", null, this.state.title),
                            e("p", null, this.state.description),
                            e("span", null, this.state.author),
                            e("span", null, this.state.date),
                            e(ShareButtons)

                        ),
                    e("div", { className: "body" },
                        e("div", { dangerouslySetInnerHTML: { __html: this.state.body }, className: 'bodytext' }),
                        e(LoadingScreen, { loading: this.state.loading })
                    ))
                )
            )
            }

}