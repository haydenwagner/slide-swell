# slide-swell

**A good-looking, small, pure JavaScript slider**.

The goal of this project is to create an aesthetic slider for desktop and mobile projects that are trying to avoid including jQuery as a dependency.

[**Live Gist Demo**](http://bl.ocks.org/haydenwagner/c23f63ad4c94622b14fdab9a62075d0b)

![slide-swell example](assets/static/slide-swell.jpg) 

**You should use slide-swell if:**
 - You want to avoid using jQuery in your project
 - You need a small JS slider (*minified JS/CSS files are only 10.2kb total in the current release*)
 - You want your slider to animate images and 'swell' their size
   - (**see in live demo**: http://bl.ocks.org/haydenwagner/c23f63ad4c94622b14fdab9a62075d0b)
 - You want a slider that supports click and touch events

**You probably don't need slide-swell if:**
 - You are using jQuery in your project. *If so, there are better, smaller, and more customizable slider options already available* (ex. http://unslider.com/, http://supersimpleslider.com/, http://kenwheeler.github.io/slick/)
 
 

### Demo instructions
Download/clone this repo and open the index.html file to see a slide-swell slider in action

### Using slide-swell in your project
Add the minified js/css files (check the release) to your html file, and then follow the basic structure below to make a new slider.
(container div is included for positioning/size, not necessary to create a slider)

    <link rel="stylesheet" type="text/css" href="slideSwell.min.css">
    
    <body>
        <div class="container">
            <div class="slideSwell" id="testSlideSwell">
                <img src="../assets/static/test1.jpg"/>
                <img src="../assets/static/test2.jpg"/>
                <img src="../assets/static/test3.jpg"/>
            </div>
        </div>
    </body>

    <script src="slideSwell.min.js"></script>
    
    <script>
        new SlideSwell("testSlideSwell");
    </script>


### Detailed installation instructions:

1. Add the slide-swell JavaScript and CSS files to your html file

2. Add a div with the class 'slideSwell' and an ID of your choice

3. Add your slider images as normal <img> tags inside that div

4. In a script tag (below the slide-swell JavaScript file) make a new slide-swell object by calling 'new SlideSwell([divID]) (divID would be whatever ID you gave your div in step 2). 



### Inspiration

slide-swell's appearance and behavior is based on the **Spotify album slider**:

![spotify inspiration slider](assets/static/spotify.jpg)



