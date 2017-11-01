;(function(){
    "use strict";


    function Flexwell(id) {
        this.data = {};
        this.wrapperDiv = document.getElementById(id);
        this.images = [];

        (function sanitizeContent(){
            var images = [].slice.call(this.wrapperDiv.children);
            var self = this;
            this.images = [];

            images.map(function (i) {
                if (i.nodeName.toLowerCase() === 'img') {
                    i.setAttribute("class", "slideswell_image");
                    self.images.push({el: i});
                    //movingDiv.appendChild(i);
                }
                else {
                    self.wrapperDiv.removeChild(i);
                }
            });
        }).call(this);


        (function generateInnerDivs() {
            var self = this;
            var movingDiv = document.createElement('div'),
                arrowLeft = document.createElement('div'),
                arrowRight = document.createElement('div');

            var arrowEventType = "click";

            movingDiv.setAttribute("class", "slideswell2_image-div");


            this.images.map(function (n) {
                if (n.el.nodeName.toLowerCase() === 'img') {
                    n.el.setAttribute("class", "slideswell2_image");
                    movingDiv.appendChild(n.el);
                }
            });

            this.wrapperDiv.appendChild(movingDiv);
            this.movingDiv = movingDiv;

            arrowLeft.setAttribute('class', 'slideswell2_arrow-div slideswell2_arrow-div--left');
            arrowLeft.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M20.285,2.898c1.542-1.242,2.803-0.64,2.803,1.341v28.608c0,1.979-1.261,2.583-2.803,1.341L3.677,20.802c-1.541-1.242-1.541-3.275,0-4.519L20.285,2.898z"/></g></svg>';

            this.wrapperDiv.appendChild(arrowLeft);
            this.arrowLeft = arrowLeft;

            arrowLeft.addEventListener(arrowEventType, function (event) {
                self.arrowPress("left");
            });

            arrowRight.setAttribute('class', 'slideswell2_arrow-div slideswell2_arrow-div--right');
            arrowRight.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M21.931,16.283c1.541,1.243,1.541,3.276,0,4.519L5.324,34.188c-1.542,1.242-2.803,0.639-2.803-1.341V4.239c0-1.98,1.261-2.583,2.803-1.341L21.931,16.283z"/></g></svg>';

            this.wrapperDiv.appendChild(arrowRight);
            this.arrowRight = arrowRight;

            arrowRight.addEventListener(arrowEventType, function (event) {
                self.arrowPress("right");
            });
        }).call(this);

        (function setDimensions() {
           // var self = this;
            //var parentWidth = this.wrapperDiv.parentElement.clientWidth,
                //count = this.images.length,
                //imageWidthPerc = 0.90,
                //imageWidth = parentWidth * imageWidthPerc,
                //imagePadding = parentWidth * 0.025,
                //imageTotalWidth = imageWidth + imagePadding,
                //movingDivWidth = ( count * imageWidth ) + ( ( count ) * imagePadding )

            //this.data.halfImageTotal = imageTotalWidth / 2;
            //this.movingDiv.style.width = movingDivWidth + "px";
            //this.movingDiv.style["padding-left"] = ( ( 100 - ( 100 * imageWidthPerc ) ) / 2 ) + "%";

            this.data.currentPos = 0; //change...statically set current image position...default set to zero

            this.changeHeight(true);
        }).call(this);

        (function addTouchListeners() {
            var self = this;

            if (typeof window.addEventListener === 'function') {
                this.movingDiv.addEventListener("touchstart", function (event) {
                    self.handleStart(event);
                });
            }

            if (typeof window.addEventListener === 'function') {
                this.movingDiv.addEventListener("touchmove", function (event) {
                    self.handleMove(event);
                });
            }

            if (typeof window.addEventListener === 'function') {
                this.movingDiv.addEventListener("touchend", function () {
                    self.handleEnd();
                });
            }
        }).call(this);
    }


    Flexwell.prototype.changeHeight = function (start) {
        if (start != undefined) {
            this.images[this.data.currentPos].el.className = "slideswell2_image--selected";
        } else {
            this.images[this.data.currentPos].el.className = "slideswell2_image--selected";
            this.images[this.data.pastPosition].el.className = "slideswell2_image";
        }
    };


    Flexwell.prototype.arrowPress = function (dir){
        var sD = this.data,
            pos = sD.currentPos;

        if (dir === "right") {
            pos++;
        }
        else if(dir === "left") {
            pos--;
        }

        // if (sD.centeredPositions[pos] === 0) {
        //     sD.xCurrent = sD.centeredPositions[pos];
        //     sD.xUpdate = sD.centeredPositions[pos];
        // } else {
        //     sD.xCurrent = -sD.centeredPositions[pos];
        //     sD.xUpdate = -sD.centeredPositions[pos];
        // }
        var newLeft = this.images[pos].el.offsetLeft;

        sD.pastPosition = sD.currentPos;
        sD.currentPos = pos;

        this.changeHeight();
        this.cycle(this.movingDiv, newLeft);
        this.checkArrowVis();
    };

    Flexwell.prototype.checkArrowVis = function () {
        if (this.data.currentPos === 0) {
            this.arrowLeft.style.display = 'none';
        } else {
            this.arrowLeft.style.display = 'block';
        }

        if (this.data.currentPos === this.images.length - 1) {
            this.arrowRight.style.display = 'none';
        } else {
            this.arrowRight.style.display = 'block';
        }
    };


    Flexwell.prototype.handleStart = function(evt){
        this.data.xStart = evt.touches[0].pageX;
        this.data.xCurrent = this.data.xUpdate;
        this.data.moved = false;
    };


    Flexwell.prototype.handleMove = function(evt){
        var x = evt.touches[0].pageX;
        var xS = this.data.xStart;

        if (!this.data.xUpdate) {
            this.data.xUpdate = 0;
        }

        var xU = this.data.xUpdate;
        var difference = Number(x - xS + xU);

        if(!this.data.moved) {
            if (Math.abs(difference - xU) < 35) {
                return;
            }
            else if (Math.abs(difference - xU) > 35){
                this.data.moved = true;
            }
        }

        this.disableScroll();

        this.data.xCurrent = difference;
        this.movingDiv.style.left = Math.floor(difference) + "px";
        this.data.noMove = false;
    };

    Flexwell.prototype.handleEnd = function () {
        if(this.data.moved === false) return;

        var sD = this.data;
        var currentPos = sD.currentPos;
        var currentLeftPos = sD.xCurrent;
        var centerPs = sD.centeredPositions;
        var centerPsLen = centerPs.length;

        var goTo;
        //if swiping before first image
        if(-currentLeftPos < 0){
            goTo = centerPs[0];
            if (currentPos != 0) updatePosition.call(this,currentPos, 0);
        }
        //if swiping after left image
        else if(-currentLeftPos > centerPs[centerPsLen -1]){
            goTo = centerPs[centerPsLen -1];
            if (currentPos != centerPsLen -1) updatePosition.call(this,currentPos, centerPsLen -1);
        }
        //if swiping towards image before (left) the current image, and past a certain threshold
        else if(-currentLeftPos < centerPs[currentPos] - sD.halfImageTotal * this.dragThresholdRatio){
            goTo = centerPs[currentPos - 1];
            updatePosition.call(this,currentPos, currentPos -1);
            //if swiping towards image after (right) the current image, and past a certain threshold
        }else if(-currentLeftPos > centerPs[currentPos] + sD.halfImageTotal * this.dragThresholdRatio){
            goTo = centerPs[currentPos + 1];
            updatePosition.call(this,currentPos, currentPos +1);
            //return to current position
        }else{
            goTo = centerPs[currentPos];
        }

        this.cycle(this.movingDiv, goTo);
        sD.xUpdate = -goTo;

        function updatePosition(old, newy){
            sD.pastPosition = old;
            sD.currentPos = newy;
            this.changeHeight();
            this.checkArrowVis();
        }

        this.enableScroll();
    };

    Flexwell.prototype.handleCancel = function (evt) {
        evt.preventDefault();
    };

    //animations from here:
    // http://javascript.info/tutorial/animation
    Flexwell.prototype.cycle = function(element, move) {
        //no ease out w/ normal delta
        var delta = function(p){return p};
        //var delta = makeEaseOut(circ);
        var duration = 250;
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
    };


    Flexwell.prototype.disableScroll = function() {
        var self = this;
        document.addEventListener('touchstart', self.preventTouchStart, false);
        document.addEventListener('touchmove', self.preventTouchMove, false);
    };

    Flexwell.prototype.enableScroll = function() {
        var self = this;
        document.removeEventListener('touchstart', self.preventTouchStart, false);
        document.removeEventListener('touchmove', self.preventTouchMove, false);
    };

    Flexwell.prototype.preventTouchStart = function(e) {
        e.preventDefault();
    };

    Flexwell.prototype.preventTouchMove = function(e) {
        e.preventDefault();
    };

    //add to window so user can instantiate new SlideSwells
    window.Flexwell = Flexwell;
}());
