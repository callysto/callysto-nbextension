define([
    "require",
], function (requirejs) {
    return {
        'name' : 'NumPy',
        'sub-menu' : [
            {
                'name' : 'Documentation',
                'external-link' : 'http://docs.scipy.org/doc/numpy/index.html',
            },
            '---',
            {
                'name' : 'Creating arrays',
                'sub-menu' : [
                    {
                        'name' : 'New 1-D array of given shape',
                        'snippet' : [
                            'new_array = np.zeros((4))',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'New 2-D array of given shape',
                        'snippet' : [
                            'new_array = np.zeros((4,3))',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'New 3-D array of given shape',
                        'snippet' : [
                            'new_array = np.zeros((4,3,2))',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'New array shaped like another',
                        'snippet' : [
                            'old_array = np.arrange(6)',
                            'new_array = np.zeros_like(old_array)',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'Copy of existing data',
                        'snippet' : [
                            'old_array = np.arrange(6)',
                            'new_array = np.copy(old_array)',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'Array from list of data',
                        'snippet' : [
                            '# you can create arrays of any kind of data (eg. strings, floats, etc.)',
                            'new_array = np.array([1.2, 3.4, 5.6])',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'Evenly spaced values within a given interval',
                        'snippet' : [
                            '# code below will create an array with digits 1-9, going up by 2',
                            'new_array = np.arange(1, 10, 2)',
                            'new_array',
                        ],
                    },
                ],
            },

            {
                'name' : 'Reshaping and viewing arrays',
                'sub-menu' : [
                    {
                        'name' : 'Return a view of the data, with a different shape',
                        'snippet' : [
                            'new_array = np.arange(6).reshape((3, 2))',
                            'new_array',
                        ],
                    },
                    {
                        'name' : 'Return a copy of the data, cast to a different dtype',
                        'snippet' : [
                            'new_array = np.array([1.2, 3.4, 5.6]).astype(int)',
                            'new_array',
                        ],
                    },
                ],
            },

            {
                'name' : 'Array characteristics',
                'sub-menu' : [
                    {
                        'name' : 'Get number of dimensions of array',
                        'snippet' : [
                            '# "a" is the name of the array',
                            'a.ndim',
                        ],
                    },
                    {
                        'name' : 'Get shape of array',
                        'snippet' : [
                            '# "a" is the name of the array',
                            'a.shape',
                        ],
                    },
                ],
            },
            {
                'name' : 'Indexing an array',
                'sub-menu' : [
                    {
                        'name' : 'Get one element',
                        'snippet' : [
                            'a = np.arange(10)',
                            'a[3]'
                        ],
                    },
                    {
                        'name' : 'Get first $N$ elements',
                        'snippet' : [
                            'a = np.arange(10)',
                            'a[:3]'
                        ],
                    },
                    {
                        'name' : 'Get last $N$ elements',
                        'snippet' : [
                            'a = np.arange(10)',
                            'a[-3:]'
                        ],
                    },
                    {
                        'name' : 'Get elements $N$ to $M$',
                        'snippet' : [
                            'a = np.arange(10)',
                            'a[3:6]'
                        ],
                    },
                    {
                        'name' : 'Get elements satisfying a condition',
                        'snippet' : [
                            'a = np.arange(10)',
                            'a[a>5]'
                        ],
                    },
                ],
            },
        ]
    }
}
);
