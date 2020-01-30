import React, { Component } from "react";

import TeamGameChart from "./TeamGameChart";
import TeamGameLog from "./TeamGameLog";

class GameInfoContainer extends Component {
	constructor() {
		super();
		this.state = {
			selectedGame: [],
			isTeamLog: false,
			isTeamChart: true
		};
		this.toggleTeamChart = this.toggleTeamChart.bind(this);
		this.toggleTeamGameLog = this.toggleTeamGameLog.bind(this);
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

	toggleTeamChart() {
		if (!this.state.isTeamLog)
			this.setState(prevState => ({
				isTeamLog: !prevState.isTeamLog,
				isTeamChart: !prevState.isTeamChart
			}));
	}

	toggleTeamGameLog() {
		if (!this.state.isTeamChart)
			this.setState(prevState => ({
				isTeamLog: !prevState.isTeamLog,
				isTeamChart: !prevState.isTeamChart
			}));
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

		const teamLog = (
			<TeamGameLog
				awayTeam={awayTeam}
				homeTeam={homeTeam}
				homeTeamRoster={homeTeamRoster}
				awayTeamRoster={awayTeamRoster}
			/>
		);

		const chartOrLog = this.state.isTeamLog ? teamChart : teamLog;

		const statSwitch = (
			<div>
				<h3 onClick={this.toggleTeamGameLog}>Team Game Log</h3>
				<h3 onClick={this.toggleTeamChart}>Team Comparison</h3>
			</div>
		);

		return (
			<div>
				{statSwitch}
				{chartOrLog}
			</div>
		);
	}
}

export default GameInfoContainer;
