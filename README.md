a3-chenhung-sueshoe
===================

##Team Members
1. Chase Wu chenhung@uw.edu
2. Susanne Hsu sueshoe@uw.edu

##Crime Rates in Seattle By Neighborhood 2010-13
We created three linked visualizations that compare crime rates for 13 of the most common crimes across neighborhoods in Seattle. Viewers explore the visualizations by mousing over a neighborhood in the map. In the parallel coordinates overlapping area chart, the area corresponding to the selected neighborhood will highlight, showing the total number of incidents for various types of crime. This can be compared to the median, represented by the black line.  The horizontal stacked bar above the area chart shows the ratios of the different types of crime for the selected neighborhood. 

The neighborhoods on the map are colored lighter as the number of total crime incidents increases. The colors in the stacked bar chart are used to differentiate the segments. We felt a darker color scheme was appropriate for the data subject matter. 

We used the Seattle Police Department Police Report Incident dataset (https://data.seattle.gov/Public-Safety/Seattle-Police-Department-Police-Report-Incident/7ais-f98f), filtered down to only include incidents between January 1, 2010 and December 31, 2013 and to only include values from the columns “Summarized Offense Description”, “Occurred Date or Date Range Start”, “District/Sector”, “Longitude” and “Latitude”. We further filtered the dataset down to 13 of most common types of crime incidents. For the map, we used an svg map of Seattle neighborhoods, and mapped the “District/Sector” data to the neighborhoods they fell in. 

##Running Instructions
Our visualiation can be accessed by following this link: http://cse512-14w.github.io/a3-chenhung-sueshoe/

##Storyboard 
We wanted to convey all the different dimensions of crime incident data in a compact visualization and allow quick comparison between neighborhoods, so we choose to plot it onto a parallel coordinates diagram, where the vertical axes represented different types of crime, and each line represented a neighborhood.  We wanted the graph to be linked to a map so that the lines were tied to the neighborhood they represented, and both would highlight if either was moused-over. 
View the storyboard here: http://cse512-14w.github.io/a3-chenhung-sueshoe/storyboard.png

###Changes Between Storyboard and Implementation
In the final implementation we chose to use a parallel coordinates overlapping area chart because the lines in the parallel coordinates diagram were difficult to differentiate. Because the scale of each axes is different, we decided to add a stacked bar to aid in comparing the different types of crime within a single neighborhood. 


##Development Process
We used code from http://bl.ocks.org/jasondavies/1341281 as the intial template for how to read in the data and map it to a parallel coordinates diagram. We worked together to develop the intial parallel coordinates diagram.  Chase then did the development for the map, stacked bar, and the front end development, including the styles and interactions between visualizations. 

We spent about 25 hours developing the visualizations. The most time-consuming parts were learning d3, figuring out how to read the data in and map it to the correct visual structure, and linking the visualization. 
