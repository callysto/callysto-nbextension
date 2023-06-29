define({
    'name' : 'Pandas',
    'sub-menu' : [
        {
            'name' : 'Documentation',
            'external-link' : 'http://pandas.pydata.org/pandas-docs/stable/',
        },
        '---',
        {
            'name' : 'To/from file',
            'sub-menu' : [
                {
                    'name' : 'Read from CSV',
                    'snippet'  : [
                        'dataframe = pd.read_csv("path/to/file.csv", delim_whitespace=True)',
                    ],
                },
                {
                    'name' : 'Read from HTML',
                    'snippet'  : [
                        'dataframe = pd.read_html("path/to/file.html", delim_whitespace=True)',
                    ],
                },
                {
                    'name' : 'Read from Excel File',
                    'snippet'  : [
                        'dataframe = pd.read_excel("path/to/file.xsl", sheet_name = " ", delim_whitespace=True)',
                    ],
                },
                {
                    'name' : 'Write to CSV',
                    'snippet' : [
                        'dataframe.to_csv("path/to/new_file.csv", index=False)',
                    ],
                },
                {
                    'name' : 'Write to Excel',
                    'snippet' : [
                        'dataframe.to_excel("path/to/new_file.xsl", sheet_name = " ", index=False)',
                    ],
                },

            ],
        },

        {
            'name' : 'Deal with NaNs',
            'sub-menu' : [
                {
                    'name' : 'Filter out NaNs',
                    'snippet' : [
                        'new_dataframe = dataframe.dropna()',
                    ],
                },
                {
                    'name' : 'Filter out NaNs based on certain column',
                    'snippet' : [
                        'new_dataframe = dataframe[dataframe["COLUMN_1"].notna()]',
                    ],
                },
                
                {
                    'name' : 'Replace NaNs with number',
                    'snippet' : [
                        'new_dataframe = dataframe.fillna(0)',
                    ],
                },
            ],
        },


        {
            'name' : 'Column & Row Filtering',
            'sub-menu' : [
                
                {
                    'name' : 'Selecting rows by splicing',
                    'snippet' : [
                        '# This is called splicing, START_ROW = the first row you want to keep, END_ROW = the row you want to stop at (this row will not be included in the new dataframe), STEP_SIZE = determines what rows you keep (eg. step size of 2 would tell us to keep every 2nd row)',
                        'new_dataframe = dataframe[START_ROW:END_ROW:STEP_SIZE]',
                    ],
                },
                {
                    'name' : 'LOC',
                    'snippet'  : [
                        '# .loc is used to filter for rows that only have a specified value in specific columns',
                        '# The code below will only keep rows where COLUMN_1 is equal to True',
                        'new_dataframe = dataframe.loc[dataframe["COLUMN_1"] == True]',
                    ],
                },
                {
                    'name' : 'ILOC',
                    'snippet'  : [
                        '# .iloc is used to filter for rows based on their index number. It is very similar to splicing',
                        '# The code below will return rows 0-4',
                        'new_dataframe = dataframe.iloc[[0:5]]',
                    ],
                },
                {
                    'name' : 'Select specific columns',
                    'snippet' : [
                        'new_dataframe = dataframe["COLUMN_NAME"]',
                    ],
                },
                {
                    'name' : 'Select multiple columns',
                    'snippet'  : [
                        'new_dataframe = dataframe[["COLUMN_NAME_1", "COLUMN_NAME_2", "COLUMN_NAME_3"]]',
                    ],
                },
            ],
        },
        {
            'name' : 'Merging',
            'snippet' : [
                '# Merging can be used to combine 2 dataframes together to create a larger dataframe that contains columns from both dataframes',
                '# To merge, both dataframes must have atleast one column that is same for both of them',
                'combined_dataframe = dataframe_1.merge(dataframe_2,on="SAME_COLUMN", how="inner")',
            ],
        },

        {
            'name' : 'Grouping',
            'snippet' : [
                '# When grouping you can use many functions (not just count). Some examples include count(),mean(),sum(),median(),min(),max(),etc.',
                '# You can remove the "COLUMN_OF_INTERST" portion if you want to return all columns of the dataframe',
                'new_dataframe = new_dataframe = dataframe.groupby("COLUMN_NAME",as_index=False)[["COLUMN_OF_INTEREST_1","COLUMN_OF_INTEREST_2"]].count()',
            ],
        },

        {
            'name' : 'Sorting',
            'snippet' : [
                'dataframe.sort_values("COLUMN_NAME",ascending=True,inplace=True)',
            ],
        },

        {
            'name' : 'Creating New Columns',
            'sub-menu' : [
                {
                    'name' : 'Simple new column creation',
                    'snippet' : [
                        'dataframe["NEW_COLUMN"] = 0',
                    ],
                },
                {
                    'name' : 'Create a new column from other columns',
                    'snippet' : [
                        'dataframe["NEW_COLUMN"] = dataframe["COLUMN_1"] + dataframe["COLUMN_2"]',
                    ],
                },
            ],
        },

        {
            'name' : 'Basic stats',
            'sub-menu' : [
                {
                    'name' : 'Mean',
                    'snippet' : ['df_mean = dataframe[["Numerical column 1"]].mean()',],
                },
                {
                    'name' : 'Mode',
                    'snippet' : ['df_mode = dataframe[["Numerical column 1"]].mode()',],
                },
                {
                    'name' : 'Median',
                    'snippet' : ['df_median = dataframe[["Numerical column 1"]].median()',],
                },
                {
                    'name' : 'Standard deviation (unbiased)',
                    'snippet' : ['df_std = dataframe[["Numerical column 1"]].std()',],
                },
                {
                    'name' : 'Variance (unbiased)',
                    'snippet' : ['df_var = dataframe[["Numerical column 1"]].var()',],
                },
                {
                    'name' : 'Min',
                    'snippet' : ['df_min = dataframe[["Numerical column 1"]].min()',],
                },
                {
                    'name' : 'Max',
                    'snippet' : ['df_max = dataframe[["Numerical column 1"]].max()',],
                },
                {
                    'name' : 'Sum',
                    'snippet' : ['df_sum = dataframe[["Numerical column 1"]].sum()',],
                },
                {
                    'name' : 'Product',
                    'snippet' : ['df_product = dataframe[["Numerical column 1"]].product()',],
                },
                {
                    'name' : 'Number of elements',
                    'snippet' : ['df_count = dataframe[["Numerical column 1"]].count()',],
                },
            ],
        },
    ],
});
