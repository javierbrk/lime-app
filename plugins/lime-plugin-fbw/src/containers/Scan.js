import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchNetworks, setNetwork } from '../actions';

import { Trans, t } from '@lingui/macro';
import { Loading } from 'components/loading';
import Toast from 'components/toast';
import { isValidHostname, slugify } from 'utils/isValidHostname';
import { showNotification } from '../../../../src/store/actions';
import { useBoardData } from 'utils/queries';

export const Scan = ({ searchNetworks, setNetwork, toggleForm, status, networks }) => {
	const { data: boardData } = useBoardData();
	const [state, setState] = useState({
		createForm: false,
		error: null,
		hostname: boardData.hostname
	});

	/* Load scan results */
	function _searchNetworks() {
		searchNetworks(true);
	}

	/* Change state after selectbox change event */
	function selectNetwork(event) {
		const { config, file } = networks[event.target.value];
		setState({
			...state,
			file,
			apname: config.wifi.apname_ssid.split('/%H')[0],
			community: config.wifi.ap_ssid
		});
	}

	/* Validate state and set network in the router */
	function _setNetwork() {
		if (state.apname && isValidHostname(state.hostname, true)) {
			setNetwork({
				file: state.file,
				hostname: state.hostname,
				network: state.community
			});
			toggleForm('setting')();
		}
		else {
			setState({
				...state,
				error: true
			});
			setTimeout(() => {
				setState({
					...state,
					error: false
				});
			}, 2000);
		}
	}

	/* Input to state function*/
	function _changeHostName (e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
		setState({...state, hostname: e.target.value || ''});
		return e;
	}

	/* Input to state function*/
	/* function _changePassword (e) {
		setState({
			...state,
			password: e.target.value || ''
		});
	} */

	useEffect(() => {
		let interval;
		if (status === 'scanned') return;
		else if (status === 'scanning') {
			interval = setInterval(() => {
				console.log('Key pulling the new status', status);
				searchNetworks(false);
			}, 2000);
		}
		else if (!status) {
			searchNetworks(false);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [status, searchNetworks]);

	return (
		<div class="container container-padded">
			<div>
				<div>
					{ networks && status === 'scanned' ? (
						<div>
							<div class="container">
								{networks.length === 0 && <p>:( <Trans>No network found, try realigning your node and rescanning.</Trans></p>}
								{networks.length > 0 && <div>
									<h4><Trans>Join the mesh</Trans></h4>
									<label><Trans>Select a network to join</Trans></label>
									<select onChange={selectNetwork}  class="u-full-width">
										<option disabled selected><Trans>Select one</Trans></option>
										{networks.map((network, key) => (<option value={key}>{network.ap+ ' ('+ network.config.wifi.ap_ssid +')'}</option>))}
									</select>
									<label><Trans>Choose a name for this node</Trans></label>
									<input type="text" placeholder={t`Host name`} class="u-full-width" value={state.hostname} onInput={_changeHostName} />
								</div>}
								<div class="row">
									{networks.length > 0 && <div class="six columns">
										<button
											onClick={_setNetwork}
											disabled={!isValidHostname(state.hostname)}
											class="u-full-width"
										>
											<Trans>Set network</Trans>
										</button>
									</div>}
									<div class="six columns">
										<button
											onClick={_searchNetworks}
											class="u-full-width"
										>
											<Trans>Rescan</Trans>
										</button>
									</div>
									<button
										onClick={toggleForm(null)}
										class="u-full-width"
									>
										<Trans>Cancel</Trans>
									</button>
								</div>
							</div>
						</div>
					): status === 'scanning' ? false : <Loading />}
					{ status === 'scanning'? (
						<Loading />
					): false }
				</div>
			</div>
			{state.error && <Toast text={<Trans>Must select a network and a valid hostname</Trans>} />}
			{(status === 'scanning' && <Toast text={<Trans>Scanning for existing networks</Trans>} />)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	networks: state.firstbootwizard.networks,
	status: state.firstbootwizard.status
});

const mapDispatchToProps = (dispatch) => ({
	searchNetworks: bindActionCreators(searchNetworks ,dispatch),
	setNetwork: bindActionCreators(setNetwork ,dispatch),
	showNotification: bindActionCreators(showNotification, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
