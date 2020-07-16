define([
    'base/js/namespace',
    'base/js/promises',
    'base/js/utils'
], function(
	Jupyter,
	promises,
	utils
) {
    function load_ipython_extension() {
        promises.app_initialized.then(function (appName) {
            if (appName !== 'NotebookApp') return;
            $('li#download_asciidoc').hide();
            $('li#download_markdown').hide();
            $('li#download_rst').hide();
            $('li#download_slides').hide();
        });
    }
    
    return {
        load_ipython_extension: load_ipython_extension
    };
});
