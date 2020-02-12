'use babel';

path = require('path')

import { CompositeDisposable } from 'atom';
import {Notification} from "atom";
import AwspilotLambdaUI from './my-view.js';

import StatusButton from './status-btn';

export default {
	//
	// dynamodbUiView: null,
	// status_btn: null,
	// //modalPanel: null,
	// subscriptions: null,
	//
	config: {
		Layout: {
			order: 1,
			type: 'object',
			title: 'Layout',
			properties: {
				Theme: {
					title: 'Theme',
					type: "string",
					default: "windows",
					//enum: ["aws","atom","windows"],
					enum: ["windows"],
					order: 1,
				},
				StatusBarButtonStyle: {
					title: 'Status Bar Link Style',
					description: '',
					type: "string",
					default: "icon+label",
					enum: ["icon","label","icon+label"],
					order: 2,
				},
			},
		},

		Lambda: {
			order: 2,
			type: 'object',
			title: 'Lambda',
			properties: {
				AccessKeyId: {
					title: 'AWS Access Key Id',
					type: "string",
					default: 'myKeyId',
					order: 1,
				},
				SecretAccessKey: {
					title: 'AWS Secret Access Key',
					type: "string",
					default: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
					order: 2,
				},
				Region: {
					title: 'AWS Region',
					type: "string",
					default: "us-east-1",
					enum: [
						'us-east-1',
						'us-east-2',
						'us-west-1',
						'us-west-2',

						'ap-east-1',
						'ap-south-1',
						'ap-northeast-2',
						'ap-southeast-1',
						'ap-southeast-2',
						'ap-northeast-1',

						'ca-central-1',

						'eu-central-1',
						'eu-west-1',
						'eu-west-2',
						'eu-west-3',
						'eu-north-1',

						'me-south-1',

						'sa-east-1',
					],
					order: 3,
				},

				LambdaLocal: {
					title: 'Use Lambda outside AWS',
					description: 'If true, Lambda will use endpoints, otherwise will connect to AWS, set to true for local lambda',
					type: "boolean",
					default: false,
					//enum: [true,false],
					enum: [false],
					order: 4,
				},

				// CloudwatchEndpoint: {
				// 	title: 'Cloudwatch Endpoint',
				// 	description: 'Access Cloudwatch outside AWS',
				// 	type: "string",
				// 	default: 'https://djaorxfotj9hr.cloudfront.net/v1/cloudwatch',
				// 	order: 8,
				// },

			}
		},


		AllowTracking: {
			title: 'Send Usage Data',
			description: 'Not.implemented, later may send anonymous usage data, if enabled, disabled by default',
			type: "boolean",
			default: false,
			enum: [true,false],
			order: 3,
		},



	},

	activate(state) {

		console.log("lambda:activate(",state,")")

		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add( atom.commands.add('atom-workspace', { 'amazon-lambda-ui:new': () => {
			atom.workspace.open('awspilot-lambda-ui://' + require('os').homedir() + require('path').sep );
		} }));

		this.subscriptions.add(
			atom.workspace.addOpener( function( uri ) {

				var found = null;
				atom.workspace.getPaneItems().forEach(item => {
					if (item instanceof AwspilotLambdaUI) {
						found=item;
						//	item.destroy();
					}
				});

				var must_open_ui = uri.match(/^awspilot-lambda-ui:\/\/(.*)$/);

				if (found !== null && must_open_ui ) { // switch to it
					return found;
				}


				if ( found===null && must_open_ui ) { // open new
					return new AwspilotLambdaUI( uri,  state.dynamodbUiViewState ); // match[1]
				}

				return null;
			})
		);


	},


	deactivate() {
		// this.modalPanel.destroy();
		this.subscriptions.dispose();
		//this.dynamodbUiView.destroy();
		//this.openerDisposable.dispose();
		this.subscriptions.dispose();
		this.status_btn.destroy();
	},



	consumeStatusBar(statusBar) {
		this.status_btn = new StatusButton(statusBar);
	}
};
