import React from "react";

import styled from "styled-components";

const NameContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	font-size: 25px;
`;

const TeamNameContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const FirstName = styled.h1`
	margin-bottom: 0px;
	margin-top: 0px;
	text-align: center;
`;

const LastName = styled.h1`
	margin-bottom: 0px;
	margin-left: 13px;
	margin-top: 0px;
	text-align: center;
`;

const ProportionContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const VerticalLine = styled.div`
	border-right: 2px solid #fefefe;
	height: 30px;
	margin-left: 20px;
	margin-right: 19px;
	margin-top: 15px;
`;

const BioInnerContainer = styled.div`
	border-radius: 15px;
  color: #fefefe;
  margin: auto;
  margin-bottom: 20px;
	width: 50%;

	@media screen and (max-width: 500px) {
		width: 90%;
	}
`;

function SelectedPlayer(props) {
	const heightAndWeight = props.player.height_feet ? (
		<ProportionContainer>
			<h3>
				{props.player.height_feet}'{props.player.height_inches}
			</h3>
			<VerticalLine />
			<h3>{props.player.weight_pounds}</h3>
		</ProportionContainer>
	) : null;

	let teamHexColors = {
		ATL: "#E03A3E",
		BKN: "#000000",
		BOS: "#007A33",
		CHA: "#1D1160",
		CHI: "#CE1141",
		CLE: "#860038",
		DAL: "#00538C",
		DEN: "#0E2240",
		DET: "#C8102E",
		GSW: "#1D428A",
		HOU: "#CE1141",
		IND: "#002D62",
		LAC: "#1D1160",
		LAL: "#552583",
		MEM: "#5D76A9",
		MIA: "#98002E",
		MIL: "#00471B",
		MIN: "#0C2340",
		NOP: "#85714D",
		NYK: "#F58426",
		OKC: "#007AC1",
		ORL: "#0077C0",
		PHI: "#006BB6",
		PHX: "#1D1160",
		POR: "#E03A3E",
		SAC: "#5A2D81",
		SAS: "#C4CED4",
		TOR: "#CE1141",
		UTA: "#002B5C",
		WAS: "#002B5C"
	};

	const teamAbbreviation = props.player.team.abbreviation;
	const playerBioColor = teamHexColors[teamAbbreviation];

	const teamHexSecondColors = {
		ATL: "#C1D32F",
		BKN: "#FFFFFF",
		BOS: "#BA9653",
		CHA: "#00788C",
		CHI: "#000000",
		CLE: "#FDBB30",
		DAL: "#002B5E",
		DEN: "#FEC524",
		DET: "#1D42BA",
		GSW: "#FFC72C",
		HOU: "#000000",
		IND: "#FDBB30",
		LAC: "#C8102E",
		LAL: "#FDB927",
		MEM: "#12173F",
		MIA: "#F9A01B",
		MIL: "#EEE1C6",
		MIN: "#236192",
		NOP: "#0C2340",
		NYK: "#0072CE",
		OKC: "#EF3B24",
		ORL: "#C4CED4",
		PHI: "#ED174C",
		PHX: "#E56020",
		POR: "#000000",
		SAC: "#63727A",
		SAS: "#000000",
		TOR: "#000000",
		UTA: "#00471B",
		WAS: "#E31837"
	};

	const playerBioSecondColor = teamHexSecondColors[teamAbbreviation];

	return (
		<BioInnerContainer
			style={{
				background: `${playerBioColor}`,
				border: `6px solid ${playerBioSecondColor}`
			}}
		>
			<NameContainer>
				<FirstName>{props.player.first_name} </FirstName>
				<LastName>{props.player.last_name}</LastName>
			</NameContainer>
			<TeamNameContainer>
				<h2>{props.player.team.full_name}</h2>
			</TeamNameContainer>
			{heightAndWeight}
		</BioInnerContainer>
	);
}

export default SelectedPlayer;
