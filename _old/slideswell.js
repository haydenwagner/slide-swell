;(function(){
    "use strict";

    //Device detection, source: http://stackoverflow.com/a/11381730/5049186
    //if want to include tablets add [ |android|ipad|playbook|silk ] to the first regex.
    window.mobileCheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    function Slideswell(id) {
        //affects the distance you need to drag the image on mobile before it cycles
        // 1.0 would be exactly half the image width...usually a bit too far
        this.dragThresholdRatio = 0.5;
        this.data = {};
        this.wrapperDiv = document.getElementById(id);

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

            var arrowEventType = mobileCheck() ? "touchstart" : "click";

            movingDiv.setAttribute("class", "slideswell_image-div");


            this.images.map(function (n) {
                if (n.el.nodeName.toLowerCase() === 'img') {
                    n.el.setAttribute("class", "slideswell_image");
                    movingDiv.appendChild(n.el);
                }
            });

            this.wrapperDiv.appendChild(movingDiv);
            this.movingDiv = movingDiv;

            arrowLeft.setAttribute('class', 'slideswell_arrow-div slideswell_arrow-div--left');
            arrowLeft.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M20.285,2.898c1.542-1.242,2.803-0.64,2.803,1.341v28.608c0,1.979-1.261,2.583-2.803,1.341L3.677,20.802c-1.541-1.242-1.541-3.275,0-4.519L20.285,2.898z"/></g></svg>';

            this.wrapperDiv.appendChild(arrowLeft);
            this.arrowLeft = arrowLeft;

            arrowLeft.addEventListener(arrowEventType, function (event) {
                self.arrowPress("left");
            });

            arrowRight.setAttribute('class', 'slideswell_arrow-div slideswell_arrow-div--right');
            arrowRight.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M21.931,16.283c1.541,1.243,1.541,3.276,0,4.519L5.324,34.188c-1.542,1.242-2.803,0.639-2.803-1.341V4.239c0-1.98,1.261-2.583,2.803-1.341L21.931,16.283z"/></g></svg>';

            this.wrapperDiv.appendChild(arrowRight);
            this.arrowRight = arrowRight;

            arrowRight.addEventListener(arrowEventType, function (event) {
                self.arrowPress("right");
            });
        }).call(this);

        (function setDimensions() {
            var self = this;
            var parentWidth = this.wrapperDiv.parentElement.clientWidth,
                count = this.images.length,
                imageWidthPerc = 0.90,
                imageWidth = parentWidth * imageWidthPerc,
                imagePadding = parentWidth * 0.025,
                imageTotalWidth = imageWidth + imagePadding,
                movingDivWidth = ( count * imageWidth ) + ( ( count ) * imagePadding )

            this.data.halfImageTotal = imageTotalWidth / 2;
            this.movingDiv.style.width = movingDivWidth + "px";
            this.movingDiv.style["padding-left"] = ( ( 100 - ( 100 * imageWidthPerc ) ) / 2 ) + "%";

            this.data.currentPos = 0; //change...statically set current image position...default set to zero
            this.data.centeredPositions = [];

            this.images.map(function (n, i) {
                self.data.centeredPositions.push(i * imageTotalWidth);
                self.images[i].position = i * imageTotalWidth;
                self.images[i].el.style.width = imageWidth + "px";
                self.images[i].el.style["margin-right"] = imagePadding + "px";
                self.data.measureImg = self.images[i].el;
            });

            if(self.data.measureImg.complete){
                setHeight.call(self.data.measureImg);
            }
            else{
                this.data.measureImg.addEventListener("load", setHeight);
            }

            function setHeight(){
                var natH = this.naturalHeight;
                var natW = this.naturalWidth;
                var setHeight = ( imageWidth * natH ) / natW;

                self.data.natH = natH;
                self.data.natW = natW;
                self.data.imageWidth = imageWidth;
                self.wrapperDiv.style.height = setHeight + 'px';
            };

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


    Slideswell.prototype.changeHeight = function (start) {
        if (start != undefined) {
            this.images[this.data.currentPos].el.className = "slideswell_image--selected";
        } else {
            this.images[this.data.currentPos].el.className = "slideswell_image--selected";
            this.images[this.data.pastPosition].el.className = "slideswell_image";
        }
    };


    Slideswell.prototype.arrowPress = function (dir){
        var sD = this.data,
            pos = sD.currentPos;

        if (dir === "right") {
            pos++;
        }
        else if(dir === "left") {
            pos--;
        }

        if (sD.centeredPositions[pos] === 0) {
            sD.xCurrent = sD.centeredPositions[pos];
            sD.xUpdate = sD.centeredPositions[pos];
        } else {
            sD.xCurrent = -sD.centeredPositions[pos];
            sD.xUpdate = -sD.centeredPositions[pos];
        }

        sD.pastPosition = sD.currentPos;
        sD.currentPos = pos;

        this.changeHeight();
        this.cycle(this.movingDiv, sD.centeredPositions[pos]);
        this.checkArrowVis();
    };

    Slideswell.prototype.checkArrowVis = function () {
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


    Slideswell.prototype.handleStart = function(evt){
        this.data.xStart = evt.touches[0].pageX;
        this.data.xCurrent = this.data.xUpdate;
        this.data.moved = false;
    };


    Slideswell.prototype.handleMove = function(evt){
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

    Slideswell.prototype.handleEnd = function () {
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

    Slideswell.prototype.handleCancel = function (evt) {
        evt.preventDefault();
    };

    //animations from here:
    // http://javascript.info/tutorial/animation
    Slideswell.prototype.cycle = function(element, move) {
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


    Slideswell.prototype.disableScroll = function() {
        var self = this;
        document.addEventListener('touchstart', self.preventTouchStart, false);
        document.addEventListener('touchmove', self.preventTouchMove, false);
    };

    Slideswell.prototype.enableScroll = function() {
        var self = this;
        document.removeEventListener('touchstart', self.preventTouchStart, false);
        document.removeEventListener('touchmove', self.preventTouchMove, false);
    };

    Slideswell.prototype.preventTouchStart = function(e) {
        e.preventDefault();
    };

    Slideswell.prototype.preventTouchMove = function(e) {
        e.preventDefault();
    };

    //add to window so user can instantiate new SlideSwells
    window.Slideswell = Slideswell;
}());
