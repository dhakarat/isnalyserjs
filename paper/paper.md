---
title: 'Isnalyser: An Interactive Tool to Visualize Isnād Trees'
tags:
  - Javascript
  - Islam studies
  - Digital humanities
authors:
  - name: Stefan Wezel
    affiliation: 1
  - name: Maroussia Bednarkiewicz
    affiliation: 2
  - name: Álvaro Tejero-Cantero
    affiliation: 1
affiliations:
 - name: mlcolab, Tübingen Universtiy
   index: 1
 - name: Orient- und Islamwissenschaft, Tübingen Universtiy
   index: 2

date: date
bibliography: paper.bib
---

# Summary
Islamic scholars model the transmission of Ḥadīth texts using isnād graphs. Nodes represent people transmitting texts and edges denote transmissions of texts between transmitters. Traditionally, such graphs are drawn by hand. As isnād graphs can become really large, this task can be very tedious.

Here, we present the `isnalyser`, a simple set of tools to automate the drawing of isnād graphs. Moreover, our proposed application allows users to interactively inspect their data. We provide a `Python` package as well as a `Javascript`-based application, with the `isnalyserjs`.

# Statement of need

Tracing the roots of Ḥadīth texts is an active topic of debate. Isnād graphs provide a scientific approach to disentangling the web of possible transmissions. Moreover, resulting visualizations are a foundation for discourse. Drawing isnād trees is a laborious process. In a manual approach, data and visualization are separate which makes it prone to errors and hard to replicate. The automatic drawing of isnād trees could alleviate this as the visualization is strictly defined by the data itself, thus linking data and visualization in a deterministic manner. 

Note that, the much more challenging process of collecting data is not automatized by the `isnalyser` and remain task of the scholar studying the hadīth texts . Only, the more tedious, and error prone task of visualizing the data is  handled by the proposed `isnalyser`. This can make it a useful tool when collecting data, as possible errors can be spotted more easily.

# The isnalyser(s)

**Data structure** - Inspired by relational database design, we propose to have two tables: one defining *transmitters* (nodes) and one defining *transmissions* (edges). These tables are stored as csv files to make them accessible and human-readable. Rows in the *transmissions* file define nodes. Columns are *Name* (determines node label), *dAH* (denotes transmitter's death data and is used to determine graph layout), and *Origin* (denotes city of origin of a transmitter and is displayed in the info box). *Name* and *dAH* are mandatory.  Names serve as identifiers and are used to describe transmissions in the *transmissions* file. Here, every row defines a transmission/edge between two transmitters. Mandatory columns thus are *From* and *To*. Further information can be given in the columns *FileName* (denotes text and determines edge label) and *TransmissionType* (determines edge style).

**Graph layout** - A timeline is created based on the range of death dates. The step size of this timeline is specified by the user. Each step is a separate node. These timeline nodes are used to for the layout of the actual isnad tree. They can be thought of as 'bins' of a histogram. According to each transmitters death data, the respective node is matched to the closest timeline step node. Further layout is handled by implementations Graphviz`[@gansner1993technique]`. Graphviz handles graphs described in the DOT language. The color of nodes is determined by the city of origin of a transmitter. Different edge styles encode different texts where the information is from.

**Python library** - We began development of a prototype with Python as it offers great flexibility and an extensive ecosystem and developer community. Core functionality is distributed over different modules, which we will shortly describe here

- `abbrevation` to ensure a clean graph layout, names of transmitters with more than $n$ characters are abbreviated. Only the first and last few characters are shown with $...$ in between.
- `colors` creates a color scheme based on the number of cities of origin, assigning each origin a unique color.
- `graph` serves as main module that uses the other modules to create an isnad graph. 
- `paths` merges redundant edges that will occur if transmissions overlap. 
- `ranking` creates a timeline as a subgraph. For each timeline node, it gives a list of nodes that fall into the 'bins' the timeline nodes form.

To publish the software, we choose the form of a `PyPI` (cite pypi) package. 

**The interactive isnalyserjs** - The make the `isnalyser` accessible to users without coding knowledge, we propose a follow-up, interactive version. Based on Javascript 

- `index.html`
- `app.js`
- `style.css`

# Open ends

While being useful on its own already, our software further provides the base for a collaborative platform, where isnād trees can be shared and stored in a publicly accessible database. This could help make hadīth research more transparent and collaborative, a long standing challenge a commuinty of digital Islam science researchers strives to solve (cite digital hadith network). Further, the `isnalyser` could be become the 'front-end' of a data-collecting software and help to debug or verify such tools and eventually even become a fully automatic tool.

# Acknowledgements

# References

Citations to entries in paper.bib should be in
[rMarkdown](http://rmarkdown.rstudio.com/authoring_bibliographies_and_citations.html)
format.

If you want to cite a software repository URL (e.g. something on GitHub without a preferred
citation) then you can do it with the example BibTeX entry below for @fidgit.

For a quick reference, the following citation commands can be used:
- `@author:2001`  ->  "Author et al. (2001)"
- `[@author:2001]` -> "(Author et al., 2001)"
- `[@author1:2001; @author2:2001]` -> "(Author1 et al., 2001; Author2 et al., 2002)"

# Figures

Figures can be included like this:
![Caption for example figure.\label{fig:example}](figure.png)
and referenced from text using \autoref{fig:example}.

Figure sizes can be customized by adding an optional second parameter:
![Caption for example figure.](figure.png){ width=20% }



# References