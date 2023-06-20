define({
        'name' : 'Python',
        'sub-menu' : [
            {
                'name' : 'Lists',
                'sub-menu' : [
                    {
                        'name' : 'Reversed list',
                        'snippet' : [
                            'l.reverse()',
                        ],
                    },
                    {
                        'name' : 'Sorted list',
                        'snippet' : [
                            'l.sort()',
                        ],
                    },
                    {
                        'name' : 'Add element',
                        'snippet' : [
                            '#Change "ELEMENT" to the element you want to add',
                            'l.append("ELEMENT")',
                        ],
                    },
                    {
                        'name' : 'Remove element',
                        'snippet' : [
                            '#Change "ELEMENT" to the element you want to remove',
                            'l.remove("ELEMENT")',
                        ],
                    },
                    {
                        'name' : 'Get Index',
                        'snippet' : [
                            '# The code below will store the index at which the element occurs in the list. If there are duplicates of the element, only the index of the first occurence is stored',
                            '#Change "ELEMENT" to the element you want to get the index for',
                            'index = l.index("ELEMENT")',
                        ],
                    },
                ],
            },

            {
                'name' : 'Basic file input/output',
                'sub-menu' : [
                    {
                        'name' : 'Read file into string',
                        'snippet' : [
                            'with open("some/file.txt", "r") as file_handle:',
                            '    file_contents = file_handle.read()',
                        ],
                    },
                    {
                        'name' : 'Read file into string, operating on each line',
                        'snippet' : [
                            'file_contents = ""',
                            'with open("some/file.txt", "r") as file_handle:',
                            '    for line in file_handle.readlines():',
                            '        file_contents += line.replace("-", "_")',
                        ],
                    }
                ],
            },
            
            {
                'name' : 'Defining functions and loops',
                'sub-menu' : [
                    {
                        'name' : 'Simple function',
                        'snippet'  : [
                            '#This is to show the syntax of a function, make sure to watch for indentation!',
                            'def simple_function(x):',
                            '   return x**2',
                            '',
                            '',
                            'simple_function(3)',
                        ],
                    },
                    {
                        'name' : 'Simple FOR loop',
                        'snippet'  : [
                            '#This is to show the syntax of a FOR loop, make sure to watch for indentation!',
                            '#Loops repeat lines of code until the condition is no longer met (in the example below until x is equal to 5)',
                            'for x in range(5):',
                            '   print(x)',
                        ],
                    },
                    {
                        'name' : 'Simple FOR loop with a list',
                        'snippet'  : [
                            '#You can use loops to go through a list and look at each individual element',
                            'fruits = ["apple","pear","orange","grape","kiwi"]',
                            'for x in fruits:',
                            '   print(x)',
                        ],
                    },
                    {
                        'name' : 'Simple NESTED FOR loop',
                        'snippet'  : [
                            '#This is to show the syntax of a NESTED FOR loop (a loop inside of a loop), make sure to watch for indentation!',
                            '#Like loops, nested loops repeat lines of code until the conditions are no longer met, the difference is that we now have to check multiple conditions',
                            'for x in range(5):',
                            '   for y in range(x):',
                            '        print(x+y)',
                        ],
                    },

                    {
                        'name' : 'Simple WHILE loop',
                        'snippet'  : [
                            'x = 1',
                            'while(x < 5):',
                            '   print(x)',
                            '   x += 1',
                        ],
                    },
                ],
            },
        ],
    });
