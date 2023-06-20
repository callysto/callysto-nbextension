define({
    'name' : 'Matplotlib',
    'sub-menu' : [
        {
            'name' : 'Documentation',
            'external-link' : 'http://matplotlib.org/contents.html',
        },
        '---',
        {
            'name' : 'Example plots',
            'sub-menu' : [
                {
                    'name' : 'Basic line plot',
                    'snippet'  : [
                        'plt.plot(DATAFRAME["COLUMN_1"], DATAFRAME["COLUMN_2"], linewidth=3, linestyle="--",color="blue")',
                        'plt.xlabel(r"Description of $x$ coordinate (units)")',
                        'plt.ylabel(r"Description of $y$ coordinate (units)")',
                        'plt.title(r"Title of graph")',
                        'plt.show()',
                    ],
                },

                {
                    'name' : 'Histogram',
                    'snippet'  : [
                        'num_bins = 50 #number of "bars" in the histogram',
                        'n, bins, patches = plt.hist(DATAFRAME["COLUMN"], num_bins)',
                        'plt.xlabel(r"Description of $x$ coordinate (units)")',
                        'plt.ylabel(r"Description of $y$ coordinate (units)")',
                        'plt.title(r"Title of graph")',
                        'plt.show();',
                    ],
                },

                {
                    'name' : 'Scatter Plot',
                    'snippet'  : [
                        'plt.scatter(DATAFRAME["COLUMN_1"],DATAFRAME["COLUMN_2"])',
                        'plt.xlabel(r"Description of $x$ coordinate (units)")',
                        'plt.ylabel(r"Description of $y$ coordinate (units)")',
                        'plt.title(r"Title of graph")',
                        'plt.show();',
                    ],
                },

            ],
        },
    ],
});
