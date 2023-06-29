define([
    'base/js/namespace',
    'base/js/events'
], function (Jupyter, events) {
    var insert_top_banner = function () {
        Jupyter.notebook.insert_cell_at_index('markdown',0).set_text("![Callysto.ca Banner](https://github.com/callysto/curriculum-notebooks/blob/master/callysto-notebook-banner-top.jpg?raw=true)");
        Jupyter.notebook.select_prev();
        Jupyter.notebook.execute_cell_and_select_below();
    };

    var insert_bottom_banner = function () {
        var lastIndex = Jupyter.notebook.get_cells().length - 1;
        var new_cell = Jupyter.notebook.insert_cell_below('markdown',lastIndex).set_text("[![Callysto.ca License](https://github.com/callysto/curriculum-notebooks/blob/master/callysto-notebook-banner-bottom.jpg?raw=true)](https://github.com/callysto/curriculum-notebooks/blob/master/LICENSE.md)");
        
        //new_cell.select_next()
        //new_cell.execute_cell_and_select_above()
        var top = Jupyter.notebook.get_cell(0);
        top.select()
        Jupyter.notebook.execute_cells_below();
    };
    
    var insert_default_markdown_cell = function () {
        Jupyter.notebook.insert_cell_at_index('markdown',1).set_text('Markdown cell')
    };

    function load_ipython_extension() {
        if (Jupyter.notebook.get_cells().length === 1) {
            insert_top_banner();
            insert_default_markdown_cell();
            insert_bottom_banner();
        }
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
