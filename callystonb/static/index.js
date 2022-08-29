define([
    'require',
    'jquery',
    'base/js/namespace',
    'base/js/promises',
    'base/js/utils',
    'base/js/dialog'
], function (
    requirejs,
    $,
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
        console.log('Initialize callystonb');
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
            id: 'ca-migrate',
        }]);
        $('#ca-migrate')
            .css('background-color', 'lightpink');
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
        let migrate_status = '<i class="fa fa-question-circle"></i> Unready';
        let verification_status = false;
        $.ajax({
            url: params.user_table_endpoint + '/items/' + user,
            type: 'GET',
            success: function(data) {
                var response = Object.keys(data);
                if (data.Item !== undefined && validateEmail(data.Item.email)) {
                    $('#ca-migrate')
                        .css('background-color', 'yellow');
                    migrate_status = '<i class="fa fa-check-circle"></i> Ready';
                    if (data.Item.verified) {
                      $('#ca-migrate')
                        .css('background-color', 'yellowgreen');
                      migrate_status = '<i class="fa fa-check-circle"></i> Ready and Verified';
                    }
                }
                else {
                    $('#ca-migrate')
                        .css('background-color', 'lightpink');
                }
                $('#migration-status').html(migrate_status);
            },
            complete: function() {
                migrate_status = '<i class="fa fa-check-circle"></i> ready';
                $('#ca-migrate')
                    .css('background-color', 'yellow');
                if (verification_status) {
                  $('#ca-migrate')
                    .css('background-color', 'yellowgreen');
                  migrate_status = '<i class="fa fa-check-circle"></i> ready and verified';
                }
                $('#migration-status').html(migrate_status);
            }
        });
    };

    async function migrate_dialog() {
        var user = Jupyter.notebook.base_url.split('/')[3];
        let name = undefined;
        let email = undefined;
        let migrate_status = '<i class="fa fa-question-circle"></i> Unready';
        const result = await $.ajax({
            url: params.user_table_endpoint + '/items/' + user,
            type: 'GET',
            success: function(data) {
                var response = Object.keys(data);
                if (data.Item !== undefined) {
                    name = data.Item.name;
                    email = data.Item.email;
                    if (data.Item.verified) {
                      migrate_status = '<i class="fa fa-check-circle"></i> ready and verified';
                    } else {
                      migrate_status = '<i class="fa fa-check-circle"></i> ready';
                    }
                }
            }
        });

        var dialog_body = $('<div/>').attr('id', 'callysto-migrate-dialog')
           .append(body)
           .append(controls);
        
        var body =$('<div/>')
            .css('margin', '1em')
            .css('border', '1px solid lightgray')
            .css('padding', '2rem')
            .appendTo(dialog_body)
            .append(`<h3>Callysto is moving!</h3>
                    <p>Callysto is moving to a new infrastructure provider. Our
                    new infrastructure partner will help us help you do bigger
                    and better things with Callysto. As part of the migration
                    process, we would like to help you migrate your files over
                    to the new hub. If you want your files migrated over to the
                    new infrastructure, please fill out the form below to get
                    the process started.</p>
                    <br/>
                    <p>Your migration status is shown below. There are three possible
                    values:</p>
                    <p>&nbsp;</p>
                    <table class="table">
                      <tbody>
                        <tr>
                          <th scope="row"><i class="fa fa-plane fa-lg" style="background-color:yellowgreen; padding:0.75rem"></i></th>
                          <td>Ready and verified</td>
                          <td>You're all set! We have everything we need to
                          help you migrate your files.</td>
                        </tr>
                        <tr>
                          <th scope="row"><i class="fa fa-plane fa-lg" style="background-color:yellow; padding:0.75rem"></i></th>
                          <td>Ready</td>
                          <td> For some account types (e.g.  Microsoft logins)
                          we might need to perform additional manual
                          verification steps before moving your files. If we
                          need more information we will contact you at the
                          address you have submitted, otherwise, you're all
                          set!</td>
                        </tr>
                        <tr>
                          <th scope="row"><i class="fa fa-plane fa-lg" style="background-color:lightpink; padding:0.75rem"></i></th>
                          <td>Unready</td>
                          <td>We don't yet have your migration details. Please
                          fill in the from below and hit the Migration button to
                          start the migration process.</td>
                        </tr>
                      </tbody>
                    </table>
                    `)
            .append(
              $('<div/>')
                .addClass('row justify-content-md-center migration-report')
                .append(
                  $('<div/>')
                    .css('margin-top', '2rem')
                    .css('margin-bottom', '1rem')
                    .css('font-size', '125%')
                      .addClass('col-sm-6 col-sm-offset-3')
                   .append(
                      $('<span>Migration Status: </span>')
                  )
                  .append(
                    $('<span/>')
                    .addClass('ca-migrate-status')
                    .attr('id', 'ca-migrate-status')
                    .append(
                      $('<i/>')
                      .addClass('fa fa-lg')
                    )
                    .html(migrate_status)
                  )
                )
            );

        var controls = $('<form/>')
            .appendTo(dialog_body)
            .addClass('form-horizontal');

        $('<div/>')
            .appendTo(controls)
            .append(
               $('<label/>')
                 .attr('for', 'callysto-user-hash')
                 .text('User hash')
            ).append(
               $('<input/>')
                 .addClass('form-control')
                 .attr('id', 'callysto-user-hash')
                 .val(user)
                 .prop('readonly', true)
            );

         $('<div/>')
            .addClass('has-feedback')
            .appendTo(controls)
            .append(
               $('<label/>')
                 .attr('for', 'callysto-user-email')
                 .text('User Email')
            ).append(
               $('<input/>')
                  .addClass('form-control')
                  .attr('id', 'callysto-user-email')
                  .attr('placeholder', 'Your email')
                  .val((typeof email !== undefined) ? email : undefined)
            ).append(
               $('<span/>')
                 .addClass('form-control-feedback')
                 .append(
                    $('<i/>')
                    .addClass('fa fa-lg')
                )
            ).append(
              $('<span/>')
                .addClass('help-block')
            );


          $('<div/>')
            .addClass('has-feedback')
            .appendTo(controls)
            .append(
                $('<label/>')
                  .attr('for', 'callysto-user-name')
                  .text('Your name')
            ).append(
                $('<input/>')
                .addClass('form-control')
                .attr('id', 'callysto-user-name')
                .attr('placeholder', 'Your name') 
                .val((typeof name !== undefined) ? name : undefined)
            ).append(
              $('<span/>')
                .addClass('form-control-feedback')
                .append(
                    $('<i/>')
                    .addClass('fa fa-lg')
              )
            ).append(
              $('<span/>')
                .addClass('help-block')
            );

        var form_groups = controls.children('div').addClass('form-group'); 
        form_groups
            .children('label')
                .addClass('col-sm-2 control-label')
                .css('padding-right', '1em');
        form_groups
            .each(function (index, elem) {
                $('<div/>')
                    .appendTo(elem)
                    .addClass('col-sm-10')
                    .append($(elem).children(':not(label)'));
            });
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
                            //modal.find('.btn').prop('disabled', true);
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
                                //$('#migrate').attr('disabled', 'disabled');
                                $('#done').removeAttr('disabled', 'disabled');
                                //check_migration_status();
                            });
                        }
                    },
                    done: {
                        id: 'done',
                        click: function() {
                            check_migration_status();
                        }
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

    var migrate_user = async function migrate_user(complete_callback) {
        var data = {
            id: $('#callysto-user-hash').val(),
            name: $('#callysto-user-name').val(),
            email: $('#callysto-user-email').val()
        };
        await $.ajax({
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
        var migration_status = ': ' + response;
        var alert = build_alert('alert-success')
            .hide()
            .append(msg_head + migration_status)
            .append(
                $('<a/>')
                .attr('href', response.html_url)
                .attr('target', '_blank')
                .text(response.id)
            );
        $('#migrate_user_modal').find('.modal-body').append(alert);
        console.log('User migration accepted');
        alert.slideDown('fast');
    }

    function migrate_error(jqXHR, textStatus, errorThrown) {
        console.log('Callysto migrate error: ', jqXHR, textStatus, errorThrown);
        var d = new Date();
        var msg_head = d.toLocaleString() + ': migration request failed';
        var alert = build_alert('alert-danger')
            .hide()
            .append(msg_head)
            .append(
                $('<pre/>').text(jqXHR.responseJSON ? JSON.stringify(jqXHR.responseJSON, null, 2) : errorThrown)
            );
        $('#migrate_user_modal').find('.modal-body').append(alert);
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
        });

    }

    return {
        load_ipython_extension: load_jupyter_extension,
        load_jupyter_extension: load_jupyter_extension
    };
});
