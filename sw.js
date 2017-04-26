var SlideSwell = {

    init: function(id, options){
        this.options = options || {};
        this.domElement = document.getElementById(id);
        this.slides = [];
        Array.prototype.slice.call(this.domElement.querySelectorAll('img')).map(function(x){
            this.slides.push(Object.create(Slide).init(x));
        }, this);
        this.wrapperDiv = Object.create(WrapperDiv).init(this);
        this.arrowLeft = Object.create(Arrow).init(this, 'left');
        this.domElement.appendChild(this.arrowLeft.domElement);
        this.arrowRight= Object.create(Arrow).init(this, 'right');
        this.domElement.appendChild(this.arrowRight.domElement);

        this.currentPosition = 0;

        this.setStartPosition();

        //tests
        //this.advancePosition();
        //this.advancePosition();
        //this.returnPosition();
        //this.returnPosition();
    },

    setStartPosition: function(){
        if(this.options.start){
            if(this.options.start <= this.slides.length-1){
                this.setPosition(this.options.start);
            }
            else{
                throw new Error('Starting position is invalid, it does not match the available slides');
            }
        }
        else{
            this.setPosition(0);
        }
    },

    setPosition:function(position){
        var slideOffset = this.slides[position].getCenterOffset(),
            sliderWidth = this.domElement.clientWidth,
            newOffset = slideOffset - sliderWidth/2;

        //this.wrapperDiv.changeOffset(newOffset);
        this.animate(this.wrapperDiv.domElement, newOffset);

        //TODO make this less absolute
        this.slides[this.currentPosition].domElement.className = 'slideswell2_image';
        this.currentPosition = position;

        //the newly selected slide TODO clean this up
        this.slides[position].domElement.className += "--selected";
    },

    advancePosition: function(){
        if( (this.currentPosition + 1) <= this.slides.length - 1 ){
            this.setPosition(this.currentPosition + 1);
            if(this.currentPosition === 1){
                this.arrowLeft.domElement.style.display = 'block';
            }else if(this.currentPosition === this.slides.length - 1){
                this.arrowRight.domElement.style.display = 'none';
            }
        }
    },

    returnPosition: function(){
        if( (this.currentPosition - 1) >= 0 ){
            this.setPosition(this.currentPosition - 1);
            if(this.currentPosition === this.slides.length - 2){
                this.arrowRight.domElement.style.display = 'block';
            }else if(this.currentPosition === 0){
                this.arrowLeft.domElement.style.display = 'none';
            }
        }
    },


    // http://javascript.info/tutorial/animation
    animate: function(element, move) {
        //no ease out w/ normal delta
        //var delta = function (p) {
        //    return p;
        //};
        var delta = makeEaseOut(circ);
        var duration = 200;
        var left = +element.style.left.slice(0, -2);
        var to = left + move;

        animate({
            delay: 1,
            duration: duration || 250, // 1 sec by default
            delta: delta,
            step: function (delta) {
                element.style.left = left - to * delta + "px";
            }
        });

        function circ(progress) {
            return 1 - Math.sin(Math.acos(progress));
        }

        function makeEaseOut(delta) {
            return function (progress) {
                return 1 - delta(1 - progress);
            }
        }

        function animate(opts) {
            var start = new Date;

            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / opts.duration;

                if (progress > 1) progress = 1;

                var delta = opts.delta(progress);
                opts.step(delta);

                if (progress == 1) {
                    clearInterval(id)
                }
            }, opts.delay || 10);
        }
    }
};

var WrapperDiv = {
    init: function(parent){
        this.domElement = document.createElement('div');
        this.domElement.className = 'slideswell2_image-div';
        this.parent = parent;
        this.wrapImages();
        return this;
    },

    wrapImages: function(){
        this.parent.slides.map(function(x){
            this.domElement.appendChild(x.domElement);
        },this);
        this.parent.domElement.append(this.domElement);
    },

    changeOffset: function(newOffset){
        this.domElement.style.left = -newOffset + 'px';
    }
};

var Slide = {
    init: function(imgEl){
        this.domElement = imgEl;
        this.domElement.className = 'slideswell2_image';
        return this;
    },

    getCenterOffset: function(wrapper){
        return this.domElement.offsetLeft + this.domElement.width/2;
    }
};

var Arrow = {
    init: function(parent, type){
        this.domElement = document.createElement('div');
        this.parent = parent;
        this.type = this.setType(type);
        if(this.type != undefined){
            var elClass = "slideswell2_arrow-div slideswell2_arrow-div--";
            elClass += this.type ? 'right' : 'left';
            this.domElement.setAttribute('class', elClass);
            this.svg = this.domElement.innerHTML = this.buildSVG();
            this.addListener();
        }
        return this;
    },

    setType: function(type){
        if(type === undefined) {
            throw new Error("Define an arrow direction type (String, 'left' or 'right')");
        }else if(type === 'right'){
            return 1;
        }else if(type === 'left'){
            return 0;
        }else if(typeof type != String){
            throw new Error("Define an arrow direction type as a String ('left' or 'right')");
        }else{
            throw new Error("Arrow function expecting different parameters. Pass 'left' or 'right'");
        }
    },

    buildSVG: function(){
        if(this.type){
            return '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M21.931,16.283c1.541,1.243,1.541,3.276,0,4.519L5.324,34.188c-1.542,1.242-2.803,0.639-2.803-1.341V4.239c0-1.98,1.261-2.583,2.803-1.341L21.931,16.283z"/></g></svg>';
        }else{
            return '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M20.285,2.898c1.542-1.242,2.803-0.64,2.803,1.341v28.608c0,1.979-1.261,2.583-2.803,1.341L3.677,20.802c-1.541-1.242-1.541-3.275,0-4.519L20.285,2.898z"/></g></svg>';
        }
    },

    addListener: function(){
        var _this = this;
        if(this.type){
            this.domElement.addEventListener('click', function(){
                _this.parent.advancePosition();
                console.log('right-click');
            })
        }
        else{
            this.domElement.addEventListener('click', function(){
                _this.parent.returnPosition();
                console.log('left-click');
            })
        }
    }
}