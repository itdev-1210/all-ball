import React, { Component } from "react";

import TeamGameChart from "./TeamGameChart";

class GameInfoContainer extends Component {
	constructor() {
		super();
		this.state = {
			selectedGame: []
		};
	}

	componentDidMount() {
		fetch(
			`https://www.balldontlie.io/api/v1/stats?game_ids[]=${this.props.location.state.game}&per_page=100`
		)
			.then(response => response.json())
			.then(data => {
				this.setState({
					selectedGame: data.data
				});
			});
	}

	render() {
		const { selectedGame } = this.state;
		const teamAbbreviations = selectedGame.map(x => x.team.abbreviation);

		const awayTeam = [...new Set(teamAbbreviations)];
		const homeTeam = awayTeam.pop();

		const homeTeamRoster = selectedGame.filter(
			x => x.team.abbreviation == homeTeam
		);
		const awayTeamRoster = selectedGame.filter(
			x => x.team.abbreviation == awayTeam
		);

		const teamChart = (
			<TeamGameChart
				awayTeam={awayTeam}
				homeTeam={homeTeam}
				homeTeamRoster={homeTeamRoster}
				awayTeamRoster={awayTeamRoster}
			/>
		);

		return <div>{teamChart}</div>;
	}
}

export default GameInfoContainer;
