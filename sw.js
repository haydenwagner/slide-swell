var SlideSwell = {

    init: function(id, options){
        this.options = options || {};
        this.domElement = document.getElementById(id);
        this.slides = [];
        Array.prototype.slice.call(this.domElement.querySelectorAll('img')).map(function(x){
            this.slides.push(Object.create(Slide).init(x));
        }, this);
        this.wrapperDiv = Object.create(WrapperDiv).init(this);
        this.currentPosition = 0;

        this.setStartPosition();

        //tests
        this.advancePosition();
        this.advancePosition();
        this.returnPosition();
        this.returnPosition();
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

        this.wrapperDiv.changeOffset(newOffset);
        this.currentPosition = position;
    },

    advancePosition: function(){
        if( (this.currentPosition + 1) <= this.slides.length - 1 ){
            this.setPosition(this.currentPosition + 1);
        }
    },

    returnPosition: function(){
        if( (this.currentPosition - 1) >= 0 ){
            this.setPosition(this.currentPosition - 1);
        }
    }
};

var WrapperDiv = {
    init: function(parent){
        var wrapperDiv = document.createElement('div');
        this.domElement = wrapperDiv;
        this.domElement.className = 'slideswell2_image-div';
        this.wrapImages(wrapperDiv, parent);
        return this;
    },

    wrapImages: function(wrapperDiv, parent){
        parent.slides.map(function(x){
            wrapperDiv.append(x.domElement);
        });
        parent.domElement.append(wrapperDiv);
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