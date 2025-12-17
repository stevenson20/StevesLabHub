
export type Algorithm = {
  id: number;
  name: string;
  description: string;
  steps: string[];
};

export const algorithmList: Algorithm[] = [
  {
    id: 1,
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    steps: [
      'Start a loop from the beginning of the array.',
      'In each iteration, compare the current element with the next one.',
      'If the current element is greater than the next, swap them.',
      'Repeat until the end of the array is reached.',
      'If any swaps were made, repeat the entire process.',
    ],
  },
  {
    id: 2,
    name: 'Binary Search',
    description: 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.',
    steps: [
      'Compare the target value with the middle element of the sorted array.',
      'If the target value matches, return its index.',
      'If the target is less than the middle element, search the left half.',
      'If the target is greater than the middle element, search the right half.',
      'Repeat the process until the value is found or the subarray is empty.',
    ],
  },
  {
    id: 3,
    name: 'Making a Peanut Butter Sandwich',
    description: 'A fundamental culinary algorithm for creating a classic sandwich.',
    steps: [
      'Get two slices of bread.',
      'Open the peanut butter jar.',
      'Use a knife to scoop some peanut butter.',
      'Spread the peanut butter on one slice of bread.',
      'Optionally, spread jelly on the other slice.',
      'Press the two slices of bread together.',
    ],
  },
  {
    id: 4,
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists.',
    steps: [
      'Find the minimum element in the unsorted part of the array.',
      'Swap the found minimum element with the first element of the unsorted part.',
      'Move the boundary of the sorted and unsorted parts one element to the right.',
      'Repeat until the entire array is sorted.',
    ],
  },
  {
    id: 5,
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time.',
    steps: [
      'Iterate from the second element to the end of the array.',
      'Take the current element (key) and compare it with the elements before it.',
      'Move elements of the sorted part that are greater than the key one position to the right.',
      'Insert the key into its correct position in the sorted part.',
    ],
  },
  {
    id: 6,
    name: 'Quick Sort',
    description: 'An efficient, divide-and-conquer sorting algorithm.',
    steps: [
      'Choose a pivot element from the array.',
      'Partition the array into two sub-arrays: elements less than the pivot and elements greater than the pivot.',
      'Place the pivot in its correct position in the sorted array.',
      'Recursively apply the same process to the sub-arrays.',
    ],
  },
  {
    id: 7,
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that works by recursively breaking down a problem into two or more sub-problems of the same or related type.',
    steps: [
      'Divide the unsorted list into n sublists, each containing one element.',
      'Repeatedly merge sublists to produce new sorted sublists.',
      'Continue merging until there is only one sublist remaining.',
      'The final sublist is the sorted list.',
    ],
  },
  {
    id: 8,
    name: 'Linear Search',
    description: 'A sequential search algorithm that starts at one end and goes through each element of a list until the desired element is found.',
    steps: [
      'Start from the first element of the list.',
      'Compare the current element with the target value.',
      'If the element matches, return its index.',
      'If the end of the list is reached without finding the element, return -1.',
    ],
  },
  {
    id: 9,
    name: 'Making Tea',
    description: 'A common process for preparing a hot beverage.',
    steps: [
      'Boil water in a kettle.',
      'Place a tea bag in a cup.',
      'Pour the boiling water into the cup.',
      'Let the tea steep for 3-5 minutes.',
      'Remove the tea bag.',
      'Add milk and sugar to taste.',
    ],
  },
  {
    id: 10,
    name: 'BST Insertion',
    description: 'The process of adding a new node to a Binary Search Tree while maintaining its properties.',
    steps: [
      'Start at the root of the tree.',
      'Compare the new value with the current node\'s value.',
      'If the new value is less, move to the left child.',
      'If the new value is greater, move to the right child.',
      'When you reach a null spot, insert the new node there.',
    ],
  },
  {
    id: 11,
    name: 'Stack Push Operation',
    description: 'Adding an element to the top of a stack data structure.',
    steps: [
      'Check if the stack is full.',
      'If not full, increment the top pointer.',
      'Insert the new element at the position of the top pointer.',
    ],
  },
  {
    id: 12,
    name: 'Queue Enqueue Operation',
    description: 'Adding an element to the rear of a queue data structure.',
    steps: [
      'Check if the queue is full.',
      'If not full, move the rear pointer to the next available position.',
      'Add the new element at the rear pointer\'s location.',
    ],
  },
  {
    id: 13,
    name: 'Washing Hands',
    description: 'The procedure for cleaning hands to remove germs.',
    steps: [
      'Wet your hands with clean, running water.',
      'Apply soap and lather well.',
      'Rub your hands together for at least 20 seconds.',
      'Rinse your hands thoroughly under running water.',
      'Dry your hands using a clean towel.',
    ],
  },
  {
    id: 14,
    name: 'Dijkstra\'s Algorithm',
    description: 'Finds the shortest paths between nodes in a weighted graph.',
    steps: [
      'Initialize distances to all nodes as infinite, except the source node (distance 0).',
      'Maintain a set of unvisited nodes, initially containing all nodes.',
      'Select the unvisited node with the smallest known distance and mark it as the current node.',
      'For the current node, consider all of its unvisited neighbors.',
      'Calculate the distance to each neighbor and update it if a shorter path is found.',
      'Mark the current node as visited and remove it from the unvisited set.',
      'Repeat until all nodes are visited or the destination is reached.',
    ],
  },
  {
    id: 15,
    name: 'Compiling a C++ Program',
    description: 'The steps to turn C++ source code into an executable file.',
    steps: [
      'Write the source code in a .cpp file.',
      'Run the preprocessor to expand macros and include headers.',
      'Compile the preprocessed code into assembly language.',
      'Assemble the code into an object file (.o).',
      'Link the object file with necessary libraries to create an executable.',
      'Run the final executable file.',
    ],
  },
];
