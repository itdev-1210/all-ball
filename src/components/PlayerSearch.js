import React, { Component } from "react";

import PlayerSearchResults from "./PlayerSearchResults";
import PlayerStats from "./PlayerStats";
import PlayerGameLogs from "./PlayerGameLogs";
import SelectedPlayer from "./SelectedPlayer";
import styled from "styled-components";

const PlayerOuterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

class PlayerSearch extends Component {
	constructor() {
		super();
		this.state = {
			allPlayers: [],
			input: "",
			loading: false,
			playerDetails: [],
			playerStats: [],
			playerGameLogs: [],
			isGameLog: false,
			isSeasonAverage: true
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handlePlayerClick = this.handlePlayerClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggleSeasonAverage = this.toggleSeasonAverage.bind(this);
		this.toggleGameLog = this.toggleGameLog.bind(this);
	}

	handlePlayerClick(value) {
		this.setState({
			allPlayers: [],
			playerDetails: [value]
		});
		fetch(
			`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${value.id}`
		)
			.then(response => response.json())
			.then(data => {
				this.setState({
					playerStats: data.data
				});
			});
		fetch(
			`https://www.balldontlie.io/api/v1/stats?seasons[]=2019&player_ids[]=${value.id}&per_page=100`
		)
			.then(response => response.json())
			.then(data => {
				this.setState({
					playerGameLogs: data.data
				});
			});
	}

	handleChange(event) {
		this.setState({
			input: event.target.value
		});
	}

	handleSearch(event) {
		event.preventDefault();
		this.setState({
			allPlayers: [],
			playerDetails: [],
			playerStats: [],
			playerGameLogs: []
		});
		if (this.state.input.length > 2) {
			fetch(
				`https://www.balldontlie.io/api/v1/players?search=${this.state.input}&per_page=100`
			)
				.then(response => response.json())
				.then(data => {
					this.setState({
						loading: true
					});
					let currentPage = data.meta.current_page;
					let totalPages = data.meta.total_pages;
					for (let i = currentPage; i <= totalPages; i++) {
						fetch(
							`https://www.balldontlie.io/api/v1/players?search=${this.state.input}&per_page=100&page=` +
								i
						)
							.then(response => response.json())
							.then(data => {
								this.setState({
									allPlayers: this.state.allPlayers.concat(data.data),
									loading: false
								});
							});
					}
				});
		}
	}

	toggleSeasonAverage() {
		if (!this.state.isGameLog)
			this.setState(prevState => ({
				isGameLog: !prevState.isGameLog,
				isSeasonAverage: !prevState.isSeasonAverage
			}));
	}

	toggleGameLog() {
		if (!this.state.isSeasonAverage)
			this.setState(prevState => ({
				isGameLog: !prevState.isGameLog,
				isSeasonAverage: !prevState.isSeasonAverage
			}));
	}

	render() {
		const searchedPlayers = this.state.loading ? (
			<p> LOADING </p>
		) : (
			this.state.allPlayers.map((players, id) => (
				<PlayerSearchResults
					key={id}
					onClick={() => {
						this.handlePlayerClick(players);
					}}
					players={players}
				/>
			))
		);

		const chosenPlayer = this.state.playerDetails.map((player, id) => (
			<SelectedPlayer key={id} player={player} />
		));

		const seasonAverages =
			this.state.playerDetails.length !== 0 ? (
				<PlayerStats seasonStats={this.state.playerStats} />
			) : null;

		const gameLogs =
			this.state.playerDetails.length !== 0 ? (
				<PlayerGameLogs logs={this.state.playerGameLogs} />
			) : null;

		const statSwitch = this.state.isGameLog ? seasonAverages : gameLogs;

		const toggleStatsButton =
			this.state.playerDetails.length !== 0 ? (
				<div>
					<h3 onClick={this.toggleGameLog}>Game Logs</h3>
					<h3 onClick={this.toggleSeasonAverage}>Seaon Average</h3>
				</div>
			) : null;
		return (
			<div>
				<FormContainer>
					<Form onSubmit={this.handleSearch}>
						<Input
							type="text"
							name="input"
							value={this.state.input}
							onChange={this.handleChange}
						></Input>
						<button>Search</button>
					</Form>
				</FormContainer>

				<PlayerOuterContainer>{searchedPlayers}</PlayerOuterContainer>
				<div>{toggleStatsButton}</div>
				{chosenPlayer}
				<div>{statSwitch}</div>
			</div>
		);
	}
}

export default PlayerSearch;
