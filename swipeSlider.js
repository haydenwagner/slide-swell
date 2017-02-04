"use strict";



var SlideSwell = function (id) {
    this.data = {};
    this.wrapperDiv = document.getElementById(id);
    sanitizeContent.call(this);
    generateInnerDivs.call(this);


    setWidth.call(this);

    this.addTouchListeners();
}

function sanitizeContent() {
    var images = [].slice.call(this.wrapperDiv.children);
    var self = this;
    self.images = [];

    images.map(function (i) {
        if (i.nodeName.toLowerCase() === 'img') {
            i.setAttribute("class", "swipeSlider_image");
            self.images.push({el: i});
            //movingDiv.appendChild(i);
        }
        else {
            self.wrapperDiv.removeChild(i);
        }
    });
}

function generateInnerDivs() {
    var self = this;
    var movingDiv = document.createElement('div'),
        arrowLeft = document.createElement('div'),
        arrowRight = document.createElement('div');

    movingDiv.setAttribute("class", "swipeSlider_image-div");


    this.images.map(function (n) {
        if (n.el.nodeName.toLowerCase() === 'img') {
            n.el.setAttribute("class", "swipeSlider_image");
            movingDiv.appendChild(n.el);
        }
    });

    this.wrapperDiv.appendChild(movingDiv);
    this.movingDiv = movingDiv;

    arrowLeft.setAttribute('class', 'swipeSlider_arrow-div swipeSlider_arrow-div--left');
    arrowLeft.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M20.285,2.898c1.542-1.242,2.803-0.64,2.803,1.341v28.608c0,1.979-1.261,2.583-2.803,1.341L3.677,20.802c-1.541-1.242-1.541-3.275,0-4.519L20.285,2.898z"/></g></svg>';

    this.wrapperDiv.appendChild(arrowLeft);
    this.arrowLeft = arrowLeft;

    arrowLeft.addEventListener("click", function (event) {
        event.stopPropagation();
        self.arrowPress("left");
    });

    arrowRight.setAttribute('class', 'swipeSlider_arrow-div swipeSlider_arrow-div--right');
    arrowRight.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.135px" height="34.01px" viewBox="1.575 1.432 22.135 34.01" enable-background="new 1.575 1.432 22.135 34.01" xml:space="preserve"><g><path fill="#FFFFFF" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M21.931,16.283c1.541,1.243,1.541,3.276,0,4.519L5.324,34.188c-1.542,1.242-2.803,0.639-2.803-1.341V4.239c0-1.98,1.261-2.583,2.803-1.341L21.931,16.283z"/></g></svg>';

    this.wrapperDiv.appendChild(arrowRight);
    this.arrowRight = arrowRight;

    arrowRight.addEventListener("click", function (event) {
        event.stopPropagation();
        self.arrowPress("right");
    });
}

function setWidth() {
    var self = this;
    var parentWidth = this.wrapperDiv.parentElement.clientWidth,
        count = this.images.length,
        imageWidthPerc = 0.90,
        imageWidth = parentWidth * imageWidthPerc,
        imagePadding = parentWidth * 0.025,
        imageTotalWidth = imageWidth + imagePadding,
        movingDivWidth = ( count * imageWidth ) + ( ( count ) * imagePadding )

    this.data.halfImageTotal = imageTotalWidth / 2;

    //imageDiv.id = swipeDiv.id;
    //imageDiv.style.left = '0px';
    this.movingDiv.style.width = movingDivWidth + "px";
    this.movingDiv.style["padding-left"] = ( ( 100 - ( 100 * imageWidthPerc ) ) / 2 ) + "%";

    this.data.currentPos = 0; //change...statically set current image position...default set to zero

    this.data.centeredPositions = [];
    //for ( var a = 0; a < count; a++ ) {
    this.images.map(function (n, i) {
        self.data.centeredPositions.push(i * imageTotalWidth);
        self.images[i].position = i * imageTotalWidth;

        // var captionDiv = document.createElement( 'div' );
        // captionDiv.className = "swipeSlider_captionDiv";
        // captionDiv.style.width = ( imageWidth + imagePadding ) + "px";
        //
        // self.data[ key ].captionDivs[a] = captionDiv;

        // var img = document.createElement( 'img' );
        // img.className = "swipeSlider_image";
        // img.id = swipeDiv.id;
        // img.src = self.data[ key ].images[ a ].src;

        self.images[i].el.style.width = imageWidth + "px";
        self.images[i].el.style["margin-right"] = imagePadding + "px";

        // var caption = document.createElement( 'p' );
        // caption.className = "swipeSlider_caption";
        //
        // if ( self.data[ key ].images[ a ].caption ) {
        //     caption.innerHTML = self.data[ key ].images[ a ].caption;
        // }
        //
        // self.data[ key ].images[a].captionElement = caption;


        // captionDiv.appendChild( img );
        // captionDiv.appendChild( caption );
        // imageDiv.appendChild( captionDiv );

        self.data.measureImg = self.images[i].el;
    });

    this.data.measureImg.addEventListener("load", function () {
        //var badSingleImgEl = document.querySelector('.swipeSlider_image');

        var natH = this.naturalHeight;
        var natW = this.naturalWidth;

        self.data.natH = natH;
        self.data.natW = natW;

        var setHeight = ( imageWidth * natH ) / natW;
        self.data.imageWidth = imageWidth;
        //swipeDiv.style.height = ( setHeight + 10) + "px";
        //swipeDiv.setAttribute( "height", ( setHeight + 10) + "px" );

        //bad to select like this, should have ref to outer div saved to reference here
        self.wrapperDiv.style.height = setHeight + 10 + 'px';
        //does not need to be set w/ javascript if it is always the same
        self.wrapperDiv.style.paddingBottom = '30px';
    });

    //this.setSwipeListeners( swipeDiv );

    // swipeDiv.appendChild( imageDiv );
    // swipeDiv.appendChild( swipeSlider.addArrows( "left", key ) );
    // swipeDiv.appendChild( swipeSlider.addArrows( "right", key ) );

    this.changeHeight(true);
    //this.checkArrowVis( key );


}

// function changeHeight( start ) {
//     if ( start != undefined ) {
//         obj.images[ obj.currentPos ].element.className = "swipeSlider_image--selected";
//         obj.images[ obj.currentPos ].captionElement.style.opacity = 1;
//     } else {
//         obj.images[ obj.currentPos ].element.className = "swipeSlider_image--selected";
//         obj.images[ obj.currentPos ].captionElement.style.opacity = 1;
//         obj.images[ obj.pastPosition ].element.className = "swipeSlider_image";
//         obj.images[ obj.pastPosition ].captionElement.style.opacity = 0;
//
//     }
// }


SlideSwell.prototype.changeHeight = function (start) {
    if (start != undefined) {
        this.images[this.data.currentPos].el.className = "swipeSlider_image--selected";
        //this.images[ this.currentPos ].captionElement.style.opacity = 1;
    } else {
        this.images[this.data.currentPos].el.className = "swipeSlider_image--selected";
        //this.images[ this.currentPos ].captionElement.style.opacity = 1;
        this.images[this.data.pastPosition].el.className = "swipeSlider_image";
        //this.images[ this.pastPosition ].captionElement.style.opacity = 0;
    }
}

SlideSwell.prototype.addTouchListeners = function () {
    if (typeof window.addEventListener === 'function') {
        //(function ( _sD ) {
        var self = this;
        this.movingDiv.addEventListener("touchstart", function (event) {
            //swipeSlider.handleStart( event );
            self.handleStart(event);
        });
        //})( swipeDiv );
    }

    if (typeof window.addEventListener === 'function') {
        //(function ( _sD ) {
        var self = this;
        this.movingDiv.addEventListener("touchmove", function (event) {
            //swipeSlider.handleMove( event );
            self.handleMove(event);
        });
        //})( swipeDiv );
    }
    /*
     if ( typeof window.addEventListener === 'function' ){
     (function ( _sD ) {
     _sD.addEventListener("touchcancel", function() {
     swipeSlider.handleCancel();
     });
     })( swipeDiv );
     }
     */

    if (typeof window.addEventListener === 'function') {
        //(function ( _sD ) {
        var self = this;
        this.movingDiv.addEventListener("touchend", function () {
            //     swipeSlider.handleEnd();
            self.handleEnd();
        });
        //})( swipeDiv );
    }

},


    SlideSwell.prototype.arrowPress = function (dir) {
        console.log(this);
        console.log(dir);

        //var id;
        var sD = this.data,
            pos = sD.currentPos;

        //if ( !this.lastTouchedId ) {
        //id = el.parentElement.id;
        // this.lastTouchedId = id;
        //} else {
        // id = this.lastTouchedId;
        // imgDiv = this.data[id].el;
        //}

        //could clean this up a lot
        if (dir === "right") {
            pos++;
            if (sD.centeredPositions[pos] !== undefined) {
                cycle(this.movingDiv, sD.centeredPositions[pos]);

                if (sD.centeredPositions[pos] === 0) {
                    sD.xCurrent = sD.centeredPositions[pos];
                    sD.xUpdate = sD.centeredPositions[pos];
                } else {
                    sD.xCurrent = -sD.centeredPositions[pos];
                    sD.xUpdate = -sD.centeredPositions[pos];
                }

                sD.pastPosition = sD.currentPos;
                sD.currentPos = pos;
                this.checkArrowVis();

                this.changeHeight();
            } else {
                pos--;
            }
        }

        if (dir === "left") {
            pos--;
            if (sD.centeredPositions[pos] !== undefined) {
                cycle(this.movingDiv, sD.centeredPositions[pos]);

                if (sD.centeredPositions[pos] === 0) {
                    sD.xCurrent = sD.centeredPositions[pos];
                    sD.xUpdate = sD.centeredPositions[pos];
                } else {
                    sD.xCurrent = -sD.centeredPositions[pos];
                    sD.xUpdate = -sD.centeredPositions[pos];
                }

                sD.pastPosition = sD.currentPos;
                sD.currentPos = pos;
                this.checkArrowVis();

                this.changeHeight();
            } else {
                pos++;
            }
        }
    }

SlideSwell.prototype.checkArrowVis = function () {
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
}

SlideSwell.prototype.handleStart = function (evt) {

    //if ( this.data[ evt.target.id ] ) {
    this.data.xStart = evt.touches[0].pageX;
    //this.data[ evt.target.id ].xCurrent = evt.touches[0].pageX;
    //}

    //will need to check this for scrolling Y TODO
    //     swipeSlider.yScrolled = false;

}

SlideSwell.prototype.handleMove = function (evt) {
    //will need to check this for scrolling Y TODO
    //if ( swipeSlider.yScrolled === true ) return;


    // if ( !evt.target.id ) {
    //     this.lastTouchedId = undefined;
    //     return;
    //}

    //var id = evt.target.id;


    ///changeee
    /*if ( evt.target.parentElement.parentElement.className == "swipeSlider_image-div") {
     var el = evt.target.parentElement.parentElement;
     this.data[ id ].el = el;
     }
     if ( this.data[ id ].el === undefined ) return;*/

    var x = evt.touches[0].pageX;
    var xS = this.data.xStart;

    if (!this.data.xUpdate) {
        this.data.xUpdate = 0;
    }

    var xU = this.data.xUpdate;

    //var elLeft = $( this.data[ id ].el ).css("left");
    //var elLeft = document.querySelector('#' + this.data[id].el.id + '.' + this.data[id].el.className)
    //var elLeft = document.querySelector('#' + this.data[id].el.id + '.' + this.data[id].el.className).style.left;
    var elLeft = this.movingDiv.style.left;
    var regLeftNum = /\d+/;
    var elLeftNum = Number(regLeftNum.exec(elLeft));
    var difference = Number(x - xS + xU);

    elLeftNum = difference;

    if (Math.abs(difference - xU) < 50) {
        return;
    }

    //TODO
    disableScroll();
    //swipeSlider.disableScroll();


    //this.data[ id ].xCurrent = difference;
    //this.data[ id ].el.style.left = Math.floor( elLeftNum ) + "px";
    this.data.xCurrent = difference;
    this.movingDiv.style.left = Math.floor(elLeftNum) + "px";

    //this.lastTouchedId = id;


    // if ( evt.path[ 1 ].className == "swipeSlider_image-div") {
    //
    // }
}

SlideSwell.prototype.handleEnd = function () {

    //if ( !this.lastTouchedId ) return;

    //var sD = this.data[ this.lastTouchedId ];
    var sD = this.data;//[ this.lastTouchedId ];
    var xC = sD.xCurrent;
    var cP = sD.centeredPositions;

    sD.xUpdate = sD.xCurrent;

    for (var i = 0; i < cP.length; i++) {

        var cV = cP[i];

        if (( cV === 0 ) && ( -xC < cV )) {

            //cycle( sD.el, cV, this.lastTouchedId  );
            cycle(this.movingDiv, cV);
            //swipeSlider.checkArrowVis( this.lastTouchedId  );
            sD.xUpdate = cV;

        } else if (( i == cP.length - 1 ) && ( -xC > cV )) {

            //cycle( sD.el, cV, this.lastTouchedId  );
            cycle(this.movingDiv, cV);
            //swipeSlider.checkArrowVis( this.lastTouchedId  );
            sD.xUpdate = -cV;

        } else if (( -xC < ( cV + sD.halfImageTotal ) ) && ( -xC > ( cV - sD.halfImageTotal - 1 ) )) {
            //cycle( sD.el, cV, this.lastTouchedId  );
            cycle(this.movingDiv, cV);
            sD.xUpdate = -cV;

            if (sD.currentPos != i) {
                sD.pastPosition = sD.currentPos;
                sD.currentPos = i;
                this.changeHeight();
            }
            this.checkArrowVis(this.lastTouchedId);

        } else {

        }
    }

    //TODO
    enableScroll();
    //swipeSlider.enableScroll();
}

SlideSwell.prototype.handleCancel = function (evt) {
    evt.preventDefault();
}


function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function disableScroll() {
    document.addEventListener('touchstart', preventTouchStart, false);
    document.addEventListener('touchmove', preventTouchMove, false);
}

function enableScroll() {
    document.removeEventListener('touchstart', preventTouchStart, false);
    document.removeEventListener('touchmove', preventTouchMove, false);
}

function preventTouchStart(e) {
    e.preventDefault();
}

function preventTouchMove(e) {
    e.preventDefault();
}


//animations from here:
// http://javascript.info/tutorial/animation

//make it so the move param has the negative or positive,
//get rid of negative sign bullshit
function cycle(element, move) {
    //var delta = function(p){return p};

    var delta = makeEaseOut(circ);
    var duration = 250;

    //function move(element, delta, duration) {
    var left = +element.style.left.slice(0, -2);
    var to = left + move;

    animate({
        delay: 1,
        duration: duration || 250, // 1 sec by default
        delta: delta,
        step: function (delta) {
            element.style.left = left - to * delta + "px"
        }
    });


    // function bounce(progress) {
    //     for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
    //         if (progress >= (7 - 4 * a) / 11) {
    //             return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
    //         }
    //     }
    // }
    function circ(progress) {
        return 1 - Math.sin(Math.acos(progress))
    }


    function makeEaseOut(delta) {
        return function (progress) {
            return 1 - delta(1 - progress)
        }
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
    }, opts.delay || 10)
}



/*
function resizeSliders() {

    for ( var key in this.data ) {
        //get new parent width
        if( key === "x" ) continue;


        var imageWidthPerc = 0.90;
        var swipeDiv = this.data[ key ].swipeDiv;

        if ( !swipeDiv ) return;

        var imageDiv = this.data[ key ].imageDiv;
        var count = this.data[key].count;

        var parentWidth = swipeDiv.parentElement.clientWidth;
        var imageWidth = parentWidth * imageWidthPerc;
        var imagePadding = parentWidth * 0.025;
        var imageTotalWidth = imageWidth + imagePadding;
        var imageDivWidth = ( count * imageWidth ) + ( ( count ) * imagePadding );

        var natH = swipeSlider.data[ key ].natH;
        var natW = swipeSlider.data[ key ].natW;
        var setHeight = ( imageWidth * natH ) / natW;
        var correctLeftPos;

        this.data[ key ].halfImageTotal = imageTotalWidth / 2;

        document.querySelector('#' + key + '.swipeSlider').style.height = setHeight + 10 + "px";
        //$( '#' + key + '.swipeSlider' ).css( "height", ( setHeight + 10) + "px" );

        imageDiv.style.width = imageDivWidth + "px";
        imageDiv.style[ "padding-left" ] = ( ( 100 - ( 100 * imageWidthPerc ) ) / 2 ) + "%";
        this.data[ key ].centeredPositions = [];

        for ( var a = 0; a < this.data[ key ].count; a++ ) {
            this.data[ key ].centeredPositions.push( a * imageTotalWidth );

            var captionDiv = this.data[ key ].captionDivs[a];
            var img = this.data[ key ].images[a].element;

            captionDiv.style.width = ( imageWidth + imagePadding ) + "px";

            img.style.width = imageWidth + "px";
            img.style[ "margin-right" ] = imagePadding + "px";
        }

        correctLeftPos = this.data[ key ].centeredPositions[ this.data[ key ].currentPos ];
        cycle( imageDiv, correctLeftPos, key );
        this.data[ key ].xUpdate = -correctLeftPos;

    }
}

*/


