var SlideSwell = {

    init: function(id){
        this.domElement = document.getElementById(id);
        this.slides = [];
        Array.prototype.slice.call(this.domElement.querySelectorAll('img')).map(function(x){
            this.slides.push(Object.create(Slide).init(x));
        }, this);
        this.slideContainer = Object.create(WrapperDiv).init(this.slides);
    }
};

var WrapperDiv = {
    init: function(slideArr){
        return this.wrapImages(slideArr);
    },

    wrapImages: function(slideArr){
        var wrapperDiv = document.createElement('div');
        this.domElement = wrapperDiv;
        slideArr.map(function(x){
            wrapperDiv.append(x.domElement);
        });
        return this;
    }
};

var Slide = {
    init: function(imgEl){
        this.domElement = imgEl;
        return this;
    },

    getCenterOffset: function(wrapper){
        return this.domElement.offsetLeft + this.domElement.style.width/2;
    }
};