import React, { Component } from 'react';

class TopPlayers extends Component {
    constructor() {
        super()
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        let date = new Date();
        let currentYear = date.getFullYear();
        let longYesterday = (function (d) { d.setDate(d.getDate() - 1); return d })(new Date())
        let shortYesterday = longYesterday.toISOString().split('T')[0];
        fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=${currentYear}&dates[]=${shortYesterday}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                console.log(currentPage)
                let totalPages = data.meta.total_pages
                console.log(totalPages)
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=${currentYear}&dates[]=${shortYesterday}&per_page=100&page=` + i)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                players: this.state.players.concat(data.data)
                            })
                        })
                }
            })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default TopPlayers;