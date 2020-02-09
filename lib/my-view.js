'use babel';


Ractive = require('ractive')
AWS = require('aws-sdk')
async = require('async')

var newUI = require('@awspilot/ractive-lambda-ui')


cloudwatch=null;
lambda=null;
iam=null;

//$ = require("jquery");

import {relative} from 'path'

export default class AwspilotLambdaUI {

	constructor( serializedState, uri) {
		console.log("new AwspilotLambdaUI")

		this.element = document.createElement('div');
		this.element.id = 'awspilot-lambda-ui';
		//
		var allconfig = atom.config.get('lambda-ui')
		var config = {
			access_key_id: allconfig.Lambda.AccessKeyId,
			secret_access_key: allconfig.Lambda.SecretAccessKey,
			region: allconfig.Lambda.Region,
		// 	local: allconfig.DynamodbLocal,
		// 	endpoint: allconfig.DynamodbEndpoint,
		// 	cwendpoint: allconfig.CloudwatchEndpoint,
		}



		var ractive = Ractive({
			components: {
				ui: newUI,
			},
			target: this.element,
			template: `
				<div class="atom-lambda-ui theme-{{theme}}">

					<div class="toolbar">
						<a on-click="open-settings">Settings</a>
					</div>

					<div style="position: absolute; top: 30px;left: 0px;right: 0px;bottom: 0px;">
						<ui
							theme={{theme}}
							region={{config.region}}
							accessKeyId={{config.access_key_id}}
							secretAccessKey={{config.secret_access_key}}
						/>
					</div>
				</div>
			`,
			data: {
				config: config,
				theme: allconfig.Layout.Theme,
			},
			on: {
				'open-settings': function() {
					atom.workspace.open("atom://config/packages/lambda-ui")
				},
			}
		});


		//this.element.innerHTML = JSON.stringify(config)

	}

  getTitle() {
    return 'Lambda UI';
  }

  getDefaultLocation() {
    // This location will be used if the user hasn't overridden it by dragging the item elsewhere.
    // Valid values are "left", "right", "bottom", and "center" (the default).
    return 'center';
  }

  getAllowedLocations() {
    // The locations into which the item can be moved.
    return ['center'];
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://lambda-ui'
  }

	// Returns an object that can be retrieved when package is activated
	serialize() { /* return {} */}


  // Tear down any state and detach
  destroy() {
    this.element.remove();
	 //this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

}
