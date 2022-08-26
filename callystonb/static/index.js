define([
    'base/js/namespace',
    'base/js/promises',
    'base/js/utils',
    'base/js/dialog'
], function(
    Jupyter,
    promises,
    utils,
    dialog
) {

    var params = {
        // Proxy requests through our webserver
        user_table_endpoint: 'https://hub-01-golden-mutt.callysto.farm/migrate/prod',
    };

    var initialize = function() {
        console.log('initializing callysto extension');
        var action = {
            icon: 'fa-plane',
            handler: migrate_dialog,
            id: 'ca-migrate-1',
            help: 'Prepare account migration',
            help_index: 'a1'
        };
        var prefix = 'callysto_migrate';
        var action_name = 'callysto-prepare-migration';
        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        var button = $("<button/>")
        // Add it like this so we have an id to play with in css
        Jupyter.toolbar.add_buttons_group([{
            action: full_action_name,
            icon: 'fa-plane',
            id: 'ca-migrate'
        }]);
        $('#ca-migrate')
            .css('background-color', 'yellow');
        check_migration_status();
    };

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    var check_migration_status = function() {
        var user = Jupyter.notebook.base_url.split('/')[3];
        $.ajax({
            url: params.user_table_endpoint + '/items/' + user,
            type: 'GET',
            success: function(data) {
                var response = Object.keys(data);
                console.log(data.Item);
                if (data.Item !== undefined && validateEmail(data.Item.email)) {
                    $('#ca-migrate')
                        .css('background-color', 'yellowgreen');
                }
                else {
                    $('#ca-migrate')
                        .css('background-color', 'yellow');
                }
            }
        });
    };

    async function migrate_dialog() {
        var user = Jupyter.notebook.base_url.split('/')[3];
        let name = undefined;
        let email = undefined;
        const result = await $.ajax({
            url: params.user_table_endpoint + '/items/' + user,
            type: 'GET',
            success: function(data) {
                var response = Object.keys(data);
                console.log(data.Item);
                if (data.Item !== undefined) {
                    name = data.Item.name;
                    email = data.Item.email;
                }
            }
        });
        console.log('Email is ' + result);
        var dialog_body = $('<div/>')
            .append(
                $('<p/>')
                .addClass('user-details')
                .text('User Hash')
            ).append(
                $('<br/>')
            ).append(
                $('<input/>')
                .attr('type', 'text')
                .attr('size', '25')
                .attr('id', 'callysto-user-hash')
                .val(user)
                .addClass('form-control')
                .prop('readonly', true)
            )
            .append(
                $('<p/>')
                .addClass('user-details')
                .text('User Email')
            ).append(
                $('<br/>')
            ).append(
                $('<input/>')
                .attr('type', 'text')
                .attr('size', '25')
                .attr('id', 'callysto-user-email')
                .attr('placeholder', 'Your email')
                .addClass('form-control')
                .val((typeof email !== undefined) ? email : undefined)
            )
            .append(
                $('<p/>')
                .addClass('user-details')
                .text('Name')
            ).append(
                $('<br/>')
            ).append(
                $('<input/>')
                .attr('type', 'text')
                .attr('size', '25')
                .attr('id', 'callysto-user-name')
                .attr('placeholder', 'Your name') 
                .addClass('form-control')
                .val((typeof name !== undefined) ? name : undefined)
            );


        var modal;
        modal = dialog.modal({
                show: false,
                title: 'Prepare my Account',
                notebook: Jupyter.notebook,
                keyboard_manager: Jupyter.notebook.keyboard_manager,
                body: dialog_body,
                buttons: {
                    'Migrate Me!': {
                        class: 'btn-primary',
                        id: 'migrate',
                        click: function() {
                            modal.find('.btn').prop('disabled', true);
                            var new_data = {
                                callysto_email: $('#callysto-user-hash').val(),
                                callysto_name: $('#callysto-user-name').val(),
                                callysto_hash: $('#callysto-user-hash').val()
                            };
                            $.extend(
                                new_data
                            );
                          
                            
                            // prevent the modal from closing to show status
                            $('.btn-primary').removeAttr('data-dismiss');
                            migrate_user(function(jqXHR, textStatus) {
                                // allow closing again
                                $('#migrate').attr('disabled', 'disabled');
                                $('#done').removeAttr('disabled', 'disabled');
                            });
                            check_migration_status();
                        }
                    },
                    done: {
                        id: 'done'
                    }
                }
            })
            .attr('id', 'migrate_user_modal')
            .on('shown.bs.modal', function(evt) {
                var err = modal.find('#gist_id').parent().hasClass('has-error');
                modal.find('.btn-primary').prop('disabled', err);
            });

        modal.modal('show');
    }

    function callback_open_dialog(evt) {
        migrate_dialog();
    }

    var add_auth_token = function add_auth_token(xhr) {
        var token = '';
        if (params.user_table_token !== '') {
            token = params.user_table_token;
        }
        xhr.setRequestHeader('AuthorizationToken', "Bearer " + token);
    }

    var migrate_user = function migrate_user(complete_callback) {
        var data = {
            id: $('#callysto-user-hash').val(),
            name: $('#callysto-user-name').val(),
            email: $('#callysto-user-email').val()
        };
        console.log('Migrating the user...');
        $.ajax({
            url: params.user_table_endpoint + '/items',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            success: migrate_success,
            error: migrate_error,
            complete: complete_callback
        });
        complete_callback();
    };

    function build_alert(alert_class) {
        return $('<div/>')
            .addClass('alert alert-dismissable')
            .addClass(alert_class)
            .append(
                $('<button class="close" type="button" data-dismiss="alert" aria-label="Close"/>')
                .append($('<span aria-hidden="true"/>').html('&times;'))
            );
    }

    function migrate_success(response, textStatus, jqXHR) {
        var d = new Date();
        var msg_head = d.toLocaleString() + ': Callysto account prepared for migration';
        var alert = build_alert('alert-success')
            .hide()
            .append(msg_head)
            .append(
                $('<a/>')
                .attr('href', response.html_url)
                .attr('target', '_blank')
                .text(response.id)
            );
        $('#migrate_user_modal').find('.modal-body').append(alert);
        console.log('User migrated');
        alert.slideDown('fast');
    }

    function migrate_error(jqXHR, textStatus, errorThrown) {
        console.log('Callysto migrate error: ', jqXHR, textStatus, errorThrown);
        var alert = build_alert('alert-danger')
            .hide()
            .alert(
                $('<p/>').text(jqXHR.responseJSON ? JSON.stringify(jqXHR.responseJSON, null, 2) : errorThrown)
            );
        $('#migrate_user_modal').find('.modal_body').append(alert);
        alert.slideDown('fast');
    }

    function load_jupyter_extension() {
        promises.app_initialized.then(function(appName) {
            initialize();
            if (appName !== 'NotebookApp') return;
            $('li#download_asciidoc').hide();
            $('li#download_markdown').hide();
            $('li#download_rst').hide();
            $('li#download_slides').hide();

            var menu_item = $('<li/>')
                .append(
                    $('<a/>')
                    .html('Callysto Migration')
                    .attr('title', 'Prepare Callysto account for migration')
                    .attr('id', 'callysto_migrate_help')
                    .on('click', callback_open_dialog)
                )
            menu_item.insertBefore($($("#help_menu > .divider")[1]))
            console.log('Done it');
        });

    }

    return {
        load_ipython_extension: load_jupyter_extension,
        load_jupyter_extension: load_jupyter_extension
    };
});
