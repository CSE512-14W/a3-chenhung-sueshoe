a3-chenhung-sueshoe
===================

##Team Members
1. Chase Wu chenhung@uw.edu
2. Susanne Hsu sueshoe@uw.edu

##CSE 512 Assignment 3 | Creating Interactive Visualization Software

##Exploration and Planning 
We began by looking at data.seattle.gov, data.gov, and APIs (yelp.com) for interesting datasets--primarily ones with a location dimension. We considered numerous different datasets with a location dimension--parking ticket data, rental rates, vehicle accidents, restaurants-- and evaluated how each one would benefit from interactivity. Our goal was to find a dataset that held interesting patterns that could be revealed through the interactions that we would build. 

We initially settled on plotting bike theft data on a map of Seattle and letting the user filter the data by hour, day of the week, month, and year.  However, after exploring the data in Tableau, we decided to expand our dataset to create a visualization that would convey more to the viewer. We expanded the dataset to look at multiple types of crime in Seattle and storyboarded a visualization that would allow viewers to compare rates of crime across neighborhoods.  

##Storyboard 
We wanted to convey all the different dimensions of crime incident data in a compact visualization and allow quick comparison between neighborhoods, so we choose to plot it onto a parallel coordinates diagram, where the vertical axes represented different types of crime, and each line represented a neighborhood.  We wanted the graph to be linked to a map so that the lines were tied to the neighborhood they represented, and both would highlight if either was moused-over. 
 
##Data
We used the Seattle Police Department Police Report Incident dataset, filtered down to only include incidents between January 1, 2010 and December 31, 2013 and to only include values from the columns “Summarized Offense Description”, “Occurred Date or Date Range Start”, “District/Sector”, “Longitude” and “Latitude”. We further filtered the dataset down to 13 of most common types of crime incidents, which returned a total of 49,999 records.  We removed 177 records which had “null”, “blank”, or “99” as their “District/Sector” value.  For the map, we used an svg map of Seattle neighborhoods, and mapped the “District/Sector” data to the neighborhoods they fell in. 

Visualization and Design 
In the final implementation we chose to use an area chart to represent each of the neighborhoods because…
Viewesr can 
_color - dark grey, red-orange: related to crime
_position - map on the right as control panel and reference of actual area, while the charts on the left change.
_charts
	_overlapping area chart - comparing different areas’ crime report amount.
	_stacked bar chart - ratio of different types of crime in a single area.

-explanation of changes between the storyboard and the final implementation

Development Process
-used code from http://bl.ocks.org/jasondavies/1341281 as the intial template for how to read the data and map to the visual form

Split of work:

How much time did you spend developing?:

What took the most time?:

