# isnalyserjs
The Interactive Isnalyser


## Automated isnād tree visualisations

For scholars studying __Ḥadīth__ texts, drawing an __isnād__ tree with more than 40 transmitters is a tedious work and finding the right medium to desplay it fully can even prove to be impossible. The `isnalyserjs` is a simple program for the automation of __isnād__ trees drawing and their interactive exploration.

  <img src="https://user-images.githubusercontent.com/12030245/95599970-13c1dc00-0a52-11eb-96e9-f9969fdd572f.png" width="350">


## How to use the `isnalyserjs`

You need two tables in __.csv__ format, one with the transmitters' names, and one with the transmission paths.

See below how the tables must look like and how to upload them.

### The Transmitters File

The transmitters file contains minimum two columns
1) Transmitter [with the transmitters' full name]
2) dAH [the transmitters' death date]

If you want more information to be displayed in your graph, you can add one or two columns:
3) Origin [with the transmitters' city/place of origin]
4) Bio [with biographical information about the transmitters either as link or as text].


<img src="https://user-images.githubusercontent.com/12030245/102222516-ce071100-3ee3-11eb-986a-70d0f9fd4a32.png" width="200">


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


### The Transmission File 

This table contains the transmission paths and here is how it is structured.

If, like in our example, Yaḥyá ibn Yaḥyá al-Laythī received from Mālik ibn Anas who received from Yaḥyá ibn Saʿīd al-Umawī a ḥadīth that we call 'MM', the table will look like this:

From                     | To                          | FileName
------------------------------------------------------------------
Yaḥyá ibn Saʿīd al-Umawī | Mālik ibn Anas              | MM

Mālik ibn Anas           | Yaḥyá ibn Yaḥyá al-Laythī  | MM


Each line contains a transmission path between two transmitters only.

You can also grade the transmission with numbers from 1 to 5. These grades can reflect the transmission terminology, for instance 1 = ḥaddatha; 2 = khabara; 3 = ʿan; etc., or any forms of evaluation and analysis, for instance 1 = contains X; 2 = doesn't contain X; 3 = contains Y; etc. or 1 = ṣaḥīḥ; 2 = ḍaʿīf; etc. Theses grades will determine the form of the transmission line (edge), 1 = solid line; 2 = dotted line; 3 = dashed line; 4 = dashed-dotted line; 5 = thick solid line.


From                     | To                          | FileName   | TransmissionType
-------------------------------------------------------------------------------------
Yaḥyá ibn Saʿīd al-Umawī | Mālik ibn Anas              | MM         | 5

Mālik ibn Anas           | Yaḥyá ibn Yaḥyá al-Laythī  | MM         | 5


<img src="https://user-images.githubusercontent.com/12030245/102222479-c0ea2200-3ee3-11eb-9b18-b7442b7313b8.png" width="200">




<div float="right">
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




Feature requests are welcome and encouraged. So if your data has got features that you want to be mapped to an `isnalyserjs` functionality, let us know! 

### Step Size 
The death date of the transmitters determine their position vertically in the graph. This function allows to contextualise the transmission paths in time and to highlight the flow of transmission over time with its potential gaps. 

You can decide which time distance you want between each time step. The default setting is 15. It can be adjusted according to the data provided. When the data contains many transmitters, a low step size may be useful, while for files with few transmitters over a short timespan, a higher value can be more suitable. If you see that the graph is too small or too dense, do try to change the time step and render the graph again!

  <img src="https://user-images.githubusercontent.com/12030245/102227063-6c49a580-3ee9-11eb-8d8f-f273da15aeab.png" width="200">


### Render Graph
Now, that the data is loaded and the step size is set, you can press the `Render Graph` button, and the graph will be displayed in the canvas, ready to be explored!

  <img src="https://user-images.githubusercontent.com/12030245/102222589-e70fc200-3ee3-11eb-8854-613eeb8bd9c3.png" width="200">

### Export Graph
Once you are happy with your graph, you can export it as a `pdf` or `svg` file by pressing the `Export Graph` button.
  <img src="https://user-images.githubusercontent.com/12030245/102222614-eecf6680-3ee3-11eb-9ab0-734495471b4e.png" width="200">




## The motivation behind the project

The `isnalyserjs` aims at facilitating the analysis of large quantity of __aḥādīth__ and more specifically their chains of transmissions or __asānid__ by allowing scholars to visualize these chains of transmitters quickly in a complete graph that includes geo-spatial and chronological information.
The `isnalyserjs` is an interactive approach to this problem. 



## Contributing

Contribution in any form or shape is highly welcome. Ways to contribute range from mailing the authors, over filing `Github` issues to pull requests. So, if you find any bugs, have ideas for features, or need help, let us know! We are eager to support you. :)

Below, are some tips for people looking to contribute on a code level.

### Filing `Github` Issues

If you find any bugs or find that something is broken, don't hesitate to file a `Github` issue. This can be done through the Issues tab in the repository page. Make sure to formulate the problem encountered as precisely as possible. Ideally, include steps to replicate the behaviour observed.

<img src="https://user-images.githubusercontent.com/12030245/102231190-fc89e980-3eed-11eb-9093-013704e4ec39.png" width="400">



### Installation for Development
To actively participate in development and testing, you can clone this repository and host it locally. This can be done by simply running
```bash
python -m http.server
```
in the `isnalyserjs` directory.



### Python Version

There is also a `Python` version of this project. If you are interested in this, you can install it via

```bash
pip install isnalyser
```
Further information on this can be found in the [github repository](https://github.com/dhakara/isnalyser) and  in the [PyPI page](https://pypi.org/project/isnalyser/).
