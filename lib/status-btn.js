'use babel';

export default class ReloadButtonView {

	updateStatusBarButton( ) {

		var allconfig = atom.config.get('lambda-ui')

		this.element.classList.add('inline-block');

		if ( allconfig.Layout.StatusBarButtonStyle === 'icon+label')
			this.element.innerHTML = `
				<img height="16" src="atom://lambda-ui/lambda_favicon.png" />
				Lambda
			`;

		if ( allconfig.Layout.StatusBarButtonStyle === 'icon')
			this.element.innerHTML = `<img height="16" src="atom://lambda-ui/lambda_favicon.png" />`;

		if ( allconfig.Layout.StatusBarButtonStyle === 'label')
			this.element.innerHTML = `Lambda`;

	}


	constructor(statusBar) {
		this.element = document.createElement('a');
		//this.element.classList.add('icon', 'icon-file');

		this.updateStatusBarButton()

		var $this = this;
		atom.config.observe('lambda-ui.Layout.StatusBarButtonStyle', function(newValue) {
			//console.log('StatusBarButtonStyle', newValue )
			$this.updateStatusBarButton()
		})

		this.element.addEventListener('click', this.onClick);

		this.statusBarTile = statusBar.addRightTile({ item: this.element, priority: 1000 });
	}

	destroy() {
		this.statusBarTile.destroy();
		this.statusBarTile = null;

		this.element.removeEventListener('click', this.onClick);

		this.element.remove();
		this.element = null;
	}

	onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		atom.commands.dispatch(atom.views.getView(atom.workspace), 'lambda-ui:new');
	}

}
