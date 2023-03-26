import "./App.css";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useState } from "react";
import chalk from "chalk";

import { useWeb3React } from "@web3-react/core";

function Push_notification() {
	const PK = process.env.REACT_APP_PUSH_PRIVATE_KEY; // channel private key
	const Pkey = `0x${PK}`;
	const _signer = new ethers.Wallet(Pkey);

	const { account, library, chainId } = useWeb3React();
	// const signer = library.getSigner(account);

	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const messageChangeHandler = (event) => {
		setMessage(event.target.value);
	};

	const sendNotification = async () => {
		try {
			const apiResponse = await PushAPI.payloads.sendNotification({
				signer: _signer,
				type: 1, // broadcast
				identityType: 2, // direct payload
				notification: {
					title: `${title}`,
					body: `${message}`,
				},
				payload: {
					title: `${title}`,
					body: `${message}`,
					cta: "",
					img: "",
				},
				channel: "eip155:5:0x0253f3b59d3aF84bDc333048529B26be71819225", // your channel address
				env: "staging",
			});
		} catch (err) {
			console.error("Error: ", err);
		}
	};

	async function getNotifications() {
		const notifications = await PushAPI.user.getFeeds({
			user: `eip155:5:0x61B8A9baFda51De880254d509Aa6B3f12920df25`, // user address in CAIP
			spam: false,
			env: "staging",
		});
		notifications.map((val) => {
			console.log("Title : ", val.title);
			console.log("Message : ", val.message);
		});
	}

	// Push Notification - PushAPI.channels.subscribe
	async function optIn() {
		try {
			console.log("Begin");
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const _signer = provider.getSigner();
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});

				console.log("Connected", accounts[0]);
				const response = await PushAPI.channels.subscribe({
					signer: _signer,
					channelAddress: `eip155:5:0x0253f3b59d3aF84bDc333048529B26be71819225`, // channel address in CAIP
					userAddress: `eip155:5:0x61B8A9baFda51De880254d509Aa6B3f12920df25`, // user address in CAIP
					onSuccess: () => {
						console.log("opt in success");
					},
					onError: () => {
						console.error("opt in error");
					},
					env: "staging",
				});

				console.log(
					chalk.gray("PushAPI.channels.subscribe | Response - 200 OK")
				);
				console.log(response);
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function optOut() {
		try {
			console.log("Begin");
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const _signer = provider.getSigner();
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});

				console.log("Connected", accounts[0]);
				const response = await PushAPI.channels.unsubscribe({
					signer: _signer,
					channelAddress: `eip155:5:0x0253f3b59d3aF84bDc333048529B26be71819225`, // channel address in CAIP
					userAddress: `eip155:5:0x61B8A9baFda51De880254d509Aa6B3f12920df25`, // user address in CAIP
					onSuccess: () => {
						console.log("opt out success");
					},
					onError: () => {
						console.error("opt out error");
					},
					env: "staging",
				});

				console.log(
					chalk.gray("PushAPI.channels.unsubscribe | Response - 200 OK")
				);
				console.log(response);
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<p>Title : </p>
			<input type="text" onChange={titleChangeHandler} />
			<p>Message :</p>
			<input type="text" onChange={messageChangeHandler} />
			<p></p>
			<button onClick={sendNotification}>Press me for sending</button>
			<button onClick={getNotifications}>Press me for receiving</button>
			<button onClick={optIn}>Opt In</button>
			<button onClick={optOut}>Opt Out</button>
		</div>
	);
}

export default Push_notification;
