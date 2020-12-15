# isnalyserjs
The Interactive Isnalyser


## Automated isnād tree visualisations

For scholars studying Ḥadīth texts, drawing an __isnād__ tree with more than 40 transmitters is a tedious work and finding the right medium to desplay it fully can even prove to be impossible. The `isnalyserjs` is a simple program for the automation of __isnād__ trees drawing and their interactive exploration.

  <img src="https://user-images.githubusercontent.com/12030245/95599970-13c1dc00-0a52-11eb-96e9-f9969fdd572f.png" width="350">





## How to use it

Users with data can directly upload it and render the corresponding graph. Here we will go trough this process step by step. What the data needs to look like for the `isnalyserjs` being able to handle it, will be discussed in the next section.

### Upload a Transmissions File
<p float="left">
  <img src="https://user-images.githubusercontent.com/12030245/102222479-c0ea2200-3ee3-11eb-9b18-b7442b7313b8.png" width="200">
 </p>
<div float="right">
<style type="text/css">
.tg {width :100; display:inline-block;}
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">From</th>
    <th class="tg-0pky">To</th>
    <th class="tg-0pky">FileName</th>
    <th class="tg-0pky">TransmissionType</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">A</td>
    <td class="tg-0pky">D</td>
    <td class="tg-0pky">M1</td>
    <td class="tg-0pky">0</td>
  </tr>
  <tr>
    <td class="tg-0pky">...</td>
    <td class="tg-0pky">...</td>
    <td class="tg-0pky">...</td>
    <td class="tg-0pky">...</td>
  </tr>
  <tr>
    <td class="tg-0pky">B</td>
    <td class="tg-0pky">E</td>
    <td class="tg-0pky">M2</td>
    <td class="tg-0pky">1</td>
  </tr>
</tbody>
</table>
</div>



The data format needs to be a `csv` and have at least the `From` and `To` column as shown below. Additional columns that are recognized by the `isnalyserjs` are `FileName`, which corresponds to texts transmitted, and `TransmissionType`, which describes the category of transmission (Ask Maroussia?). Note that the data can have additional columns. For now,  they will be ignored. Feature requests, however, are welcome and encouraged. So if you data has has features that you want to be mapped to a `isnalyserjs` functionality, let us know! 


### Upload a Transmitters File

For the transmitters file, only two columns are required. A `Transmitter` and a death data (`dAH`). Additional columns, the `isnalyserjs` can handle are `Orgin` and `Bio`, which can contain biographic information.

  <img src="https://user-images.githubusercontent.com/12030245/102222516-ce071100-3ee3-11eb-986a-70d0f9fd4a32.png" width="200">

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-lboi{border-color:inherit;text-align:left;vertical-align:middle}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-lboi">Transmitters</th>
    <th class="tg-lboi">dAH</th>
    <th class="tg-lboi">Origin</th>
    <th class="tg-0pky">Bio</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-lboi">A</td>
    <td class="tg-lboi">10</td>
    <td class="tg-lboi">I</td>
    <td class="tg-0pky"></td>
  </tr>
  <tr>
    <td class="tg-lboi">...<br></td>
    <td class="tg-lboi">...<br></td>
    <td class="tg-lboi">...<br></td>
    <td class="tg-0pky"></td>
  </tr>
  <tr>
    <td class="tg-0pky">B</td>
    <td class="tg-0pky">E</td>
    <td class="tg-0pky">M2</td>
    <td class="tg-0pky"></td>
  </tr>
</tbody>
</table>  

### Step Size 
This will be the step size in years of the time-line that is rendered next to the graph. The default setting is 15. It can be adjusted according to the data provided. When the data contains many transmitters, a low step size may be useful, while for files with few transmitters over a short timespan, a higher value can be more suitable.
<img src="https://user-images.githubusercontent.com/12030245/102227063-6c49a580-3ee9-11eb-8d8f-f273da15aeab.png" width="200">


### Render Graph
Now, that the data is loaded and the step size is set, you can press the `Render Graph` button, and our graph will be displayed in the canvas, ready to be explored!
<img src="https://user-images.githubusercontent.com/12030245/102222589-e70fc200-3ee3-11eb-8854-613eeb8bd9c3.png" width="200">

### Export Graph
Once you are happy with your graph, you can export it as a `pdf` or `svg` file by pressing the `Export Graph` button.
  <img src="https://user-images.githubusercontent.com/12030245/102222614-eecf6680-3ee3-11eb-9ab0-734495471b4e.png" width="200">






## The motivation behind the project

The `isnalyser` aims at facilitating the analysis of large quantity of __aḥādīth__ and more specifically their chains of transmiters or __asānid__ by allowing scholars to visualise these chains of transmitters quickly in a complete graph that includes geo-spatial and chronological information.
The `isnalyserjs` is an interactive approach to this problem. 



## Installation for Development
So far, the `isnalyserjs` is in a very early stage of development. However, suggesting features, improvements or fixes through github issues is appreciated! To actively participate in development and testing, you can clone this repository and host it locally. This can be done by simply running
```bash
python -m http.server
```
in the `isnalyserjs` directory.

If you are interested in this project, consider using the `python` twin of this project which is already released and can be installed via
```bash
pip install isnalyser
```
Further information on this can be found in the [github repository](https://github.com/dhakara/isnalyser) and  in the [PyPI page](https://pypi.org/project/isnalyser/).