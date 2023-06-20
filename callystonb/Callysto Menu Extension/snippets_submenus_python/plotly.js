define({
    'name' : 'Plotly',
    'sub-menu' : [
        {
            'name' : 'Documentation',
            'external-link' : 'https://plotly.com/python/',
        },
        '---',
        {
            'name' : 'Example plots',
            'sub-menu' : [
                {
                    'name' : 'Line plot',
                    'snippet'  : [
                        '#This is a basic line plot, you can specify other parameters such as color, markers, labels, etc.',
                        'fig = px.line(DATAFRAME,x="COLUMN_1",y="COLUMN_2",title="Title of plot")',
                        'fig.show()',
                    ],
                },

                {
                    'name' : 'Bar Chart',
                    'snippet'  : [
                        '#This is a basic bar chart, you can specify other parameters such as color, labels, hover_data, orientation, etc.',
                        'fig = px.bar(DATAFRAME,x="COLUMN_1",y="COLUMN_2",title="Title of plot")',
                        'fig.show()',
                    ],
                },

                {
                    'name' : 'Histogram',
                    'snippet'  : [
                        '#This is a basic histogram, you can specify other parameters such as nbins, category_orders, etc.',
                        'fig = px.histogram(DATAFRAME,x="COLUMN_1")',
                        'fig.show()',
                    ],
                },

                {
                    'name' : 'Box Plot',
                    'snippet'  : [
                        '#This is a basic box plot, you can specify other parameters such as color, points, hover_data, etc.',
                        'fig = px.box(DATAFRAME,x="COLUMN_1",y="COLUMN_2")',
                        'fig.show()',
                    ],
                },

                {
                    'name' : 'Scatter Plot',
                    'snippet'  : [
                        '#This is a basic scatter plot, you can specify other parameters such as color, size, hover_data, symbol, etc.',
                        'fig = px.scatter(DATAFRAME,x="COLUMN_1",y="COLUMN_2",title="Title of plot")',
                        'fig.show()',
                    ],
                },

                {
                    'name' : 'ScatterGeo Map',
                    'snippet'  : [
                        '#This is a basic map, you will require latitude and longitude information to use this. You can also specify other parameters such as color, size, hover_data, etc.',
                        'fig = px.scatter_geo(DATAFRAME,lat="LATITUDE_COLUMN",lon="LONGITUDE_COLUMN",title="Title of plot")',
                        'fig.show()',
                    ],
                },

               
            ],
        },
    ],
});
