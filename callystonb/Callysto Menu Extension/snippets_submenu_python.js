define([
    "require",
    "./snippets_submenus_python/setup",
    "./snippets_submenus_python/numpy",
    "./snippets_submenus_python/matplotlib",
    "./snippets_submenus_python/plotly",
    "./snippets_submenus_python/pandas",
    "./snippets_submenus_python/python",
], function (requirejs, setup, numpy, matplotlib, plotly, pandas, python) {
    return {
        setup:setup,
        numpy:numpy,
        matplotlib:matplotlib,
        plotly:plotly,
        pandas:pandas,
        python:python,
    };
});
