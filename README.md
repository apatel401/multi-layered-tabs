# "Money" (counting with coins and bills in a tray) Widget

![](https://img.shields.io/badge/Money-Elementary%20-purple)
![](https://img.shields.io/badge/-Built%20With-white) ![](https://img.shields.io/badge/-React-blue) ![](https://img.shields.io/badge/-NodeJS-blue) ![](https://img.shields.io/badge/-Sass-blue) ![](https://img.shields.io/badge/-Gulp-blue) ![](https://img.shields.io/badge/-Webpack-blue)

**Configurable, reusable manipulative to help students identify and count coins and dollar bills to calculate money totals**

**These widgets can be placed into HTML5 pages.**

_This repo contains the source code, CSS and build scripts required to build the The Money Widget._

---

###Table of Contents
[TOC]

---

## Getting started

**[This documentation](https://content-solutions.s3.ca-central-1.amazonaws.com/documentation/ILOs/prerequisites.html) provides information on:**
:gear: **setting up `Git` on your local machine**
:gear: **setting up `NodeJS` and `NPM`**
:gear: **setting up `GitLab` credentials**

### Installation of widget in course
To install, cd to point at your course repo then execute the following command on the command line:

```bash
npm install @digital-learning/money
```

This will install all of the node modules and files needed by the app to run in the course repo.

---

## Implementation

**Step 1 -- To yield the best results for all screen sizes, it is advised that widget be given its own wrapper using `<div class="ilo_col">`.**

Include the following snippet in the HTML where you want the widget to appear:

```html
      <div class="row">
         <div class="k8_col">
            <h3>Native plants in the Indigenous Garden</h3>
            <p>
               The goal of the garden project is to teach people in the
               ...
            </p>
         </div>
         <div class="k8_col">
            <h3>Money example</h3>
         </div>
         <!-- money snippit - start -->
         <div class="ilo_col">
            <div
               class="ilo-brightspace-block money-tray-container"
               id="money-tray-1"
               data-config="../widgets/money1.json"
            ></div>
         </div>
         <!-- money snippit - end -->
      </div>
      
      <!-- data-config is a relative path to the json config file with your parameters for the widget (see Step 2) -->

      <br/>
        ... etc.

```

| :exclamation:  `.ilo-brightspace-block` is a reserved class name maintained by the k8-bootstrap-css stylesheet for rendering inside Brightspace. The ILO does not specifically use this class, but all ILOs should include it to avoid issues on Brightspace. |
|-----------------------------------------|



**Step 2 -- Configure your .json file by adding coin and/or bill objects to the stickers array. Ensure that the fields and values are inputted.**

- ***"id":*** a reference to the name of the json config file; as inputted in the html *i.e. data-config="..."*
- ***"iloStartText":*** Message for screen reader users to know they are entering ilo. 
- ***"iloEndText":*** Message for screen reader users to know they have exited ilo. 
- ***"iloStartLink":*** Link to allow keyboard users to skip to end of ilo. 
- ***"iloEndLink":*** Link to allow keyboard users to skip to start of ilo. 
- ***"maximum":*** the total amount (in dollars) that can be added to the tray
- ***"stickers":*** an array of denominations that can be added to the tray
- ***"altText":*** alt text for the denomination img tag
- ***"moneyValue":*** a number (in cents) representing the value of the denomination; therefore $1 Loonie's value is denoted by the value '100.'

The example below will render a money widget with all the denominations available with a $200.00 tray limit.
```javascript
{
   "id": "money1",
   "iloStartText": "Beginning of Money 1 interactive activity.",
   "iloEndText": "End of Money 1 interactive activity titled 'How comfortable am I with activism?'",
   "iloStartLink": "Enter interactive activity Money 1 or press link to skip to end of activity.",
   "iloEndLink": "Press link to return to start of interactive activity Money 1.",
   "maximum": 200,
   "stickers": [
      {
         "altText": "an image of a nickel coin",
         "moneyValue": "5"
      },
      {
         "altText": "an image of a dime coin",
         "moneyValue": "10"      
      },
      {
         "altText": "an image of a quarter coin",
         "moneyValue": "25"      
      },
      {
         "altText": "an image of a loonie coin",
         "moneyValue": "100"      
      },
      {
         "altText": "an image of a toonie coin",
         "moneyValue": "200"      
      },
      {
         "altText": "an image of a five dollar bill",
         "moneyValue": "500"      
      },
      {
         "altText": "an image of a ten dollar bill",
         "moneyValue": "1000"      
      },
      {
         "altText": "an image of a twenty dollar bill",
         "moneyValue": "2000"      
      }
   ]
}

```

|:exclamation:  ***BE ADVISED:*** unlike other widgets in the HTML5 courses, this widget ***DOES NOT*** require ANY script snippets at the bottom of the page. The install will add everything else required. |
|-----------------------------------------|

<br>

---

## Configuration

The following CSS classes can be targetted in your additional CSS files to override any default styles:

```css
        .money-tray-container {
            margin-top: 15px;
            margin-bottom: 1rem;
            height: auto;
            margin-left: 0px;
            margin-right: 0px;
            line-height: normal;
            font-size: 0rem;
            background-color: #C6E3DC;
            border-radius: 20pt 20pt 20pt 20pt;
            padding: 0px;
            padding-bottom: 20px;
            min-height: 380px;
        }

        .tray-container { // this is the central money tray the coins & bills appear in 
            z-index: 15;
            text-align: center;
            margin-right: 13px;
            margin-bottom: 10px;
            margin-left: 15px;
            min-height: 295px;
            background-color: #8FB5AF;
            border-bottom: 3px solid #E8FFF9;
            border-right: 3px solid #E8FFF9;
            border-top:3px solid #57736F;
            border-left:3px solid #57736F;  
            border-radius: 10pt;
            overflow: hidden;
        }

                
```

You can also add custom classes into the wrapper div if you'd like, as below:

```html
<div class="ilo-brightspace-block money-tray-container your-custom-class-here" id="money-tray-1" data-config="../widgets/config.json"></div>
```
---

## Widget Updates

Periodically there will be updates to the Money Widget. In order to update your local copies, you can use the following steps:

If you know there has been an update, run:

Verify there has been an update through the following steps:

`cd /path/to/project`

`npm outdated`

You will be alerted as to whether an update is available, as below: 

![](https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/images/running_outdated.png)

If there is an update available, then run:

`npm update @digital-learning/money`

![](https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/images/running_update.png)

**DO NOT** run a global `npm update` on a repo as this will update ALL widgets, not just the one you want to update, which could break other widgets!!!
