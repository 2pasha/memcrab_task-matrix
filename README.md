# [DEMO LINK](https://2pasha.github.io/memcrab_task-matrix/)

# Interactive Matrix Application

A React TypeScript application that allows users to create and interact with a dynamic matrix of numbers. This application provides various features for matrix manipulation and data analysis.

## Features

- **Dynamic Matrix Creation**: 
  - Create a matrix with customizable dimensions (M×N)
  - M and N values can be between 1 and 100
  - Initial cell values are randomly generated between 1 and 100

- **Matrix Manipulation**:
  - Click on any cell to increment its value
  - Add new rows (up to 100 rows maximum)
  - Remove specific rows using the 'x' button
  - Hover over cells to highlight similar values

- **Data Analysis**:
  - Sum calculation for each row
  - 50th percentile (median) calculation for each column
  - Interactive percentage view on row hover
  - Heatmap visualization for relative values

## Understanding the 50th Percentile

The 50th percentile, also known as the median, is a statistical measure that represents the middle value when data is ordered from lowest to highest. In this application, it's calculated for each column separately.

How it works:
1. Take all values in a column
2. Sort them from lowest to highest
3. Find the middle value:
   - For odd number of values: take the middle number
   - For even number of values: take average of two middle numbers
