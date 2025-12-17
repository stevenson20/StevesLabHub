
export type CodeSnippet = {
  id: number;
  language: string;
  code: string;
};

export const codeSnippets: CodeSnippet[] = [
  {
    id: 1,
    language: 'python',
    code: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)`,
  },
  {
    id: 2,
    language: 'javascript',
    code: `const sum = (arr) => {
    return arr.reduce((total, current) => total + current, 0);
};`,
  },
  {
    id: 3,
    language: 'python',
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return "Woof!"`,
  },
  {
    id: 4,
    language: 'javascript',
    code: `async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}`,
  },
  {
    id: 5,
    language: 'html',
    code: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
  },
   {
    id: 6,
    language: 'c++',
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`,
  },
];
