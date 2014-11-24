$(window).load(function() {
    $('.center-carousel').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        centerPadding: '20%',
        centerMode: true,
        accessibility: true,
        onInit: function() {
            $self = $(this)[0];
            console.log('init')
            $.extend(this, {
                captionText: $(this.$slider[0].querySelectorAll('.text')[0]),
                changeCaptionText: function() {
                    this.captionText[0].innerText = $self.$slides[$self.currentSlide].firstElementChild.dataset.caption || "";
                },
                fullScreenBtn: $(this.$slider[0].querySelectorAll('.gallery-zoom')[0]),
                fullScreen: function() {
                    console.log('full screen mode started');

                    document.firstElementChild.style.overflow = 'hidden';

                    var fullScreenIndex = this.currentSlide;
                    var el = document.getElementById('full-screen');
                    el.style.display = 'block';
                    // var imgToLoadTarget = el.querySelectorAll('.item')[0];
                    var imgArray = this.$slides;

                    for (var i = 0; i < imgArray.length; i++) {
                        var div = document.createElement('div');
                        var image = imgArray[i].getElementsByTagName('img')[0].cloneNode();

                        image.src = image.src.replace('-small.', '-big.');

                        div.appendChild(image);
                        el.appendChild(div);
                    }
                    var imgToLoad = new Image();
                    imgToLoad.src = imgArray[fullScreenIndex].firstElementChild.src.replace('-small.', '-big.');
                    console.log('images added');

                    // $.get().done(function() {
                    imgToLoad.onload = function() {
                        $(el).slick({
                            initialSlide: fullScreenIndex,
                            speed: 300,
                            adaptiveHeight: true,
                            arrows: true,
                            infinite: false,
                            slidesToShow: 1,
                            onInit: function() {
                                $selfFullScreen = $(this)[0];
                                $.extend(this, {
                                    captionText: $(this.$slider[0].querySelectorAll('.text')[0]),
                                    changeCaptionText: function() {
                                        if ($selfFullScreen.$slides.length) {
                                            this.captionText[0].innerText = $selfFullScreen.$slides[$selfFullScreen.currentSlide].firstElementChild.dataset.caption || "";
                                        }
                                    },
                                    fullScreenBtn: $(this.$slider[0].querySelectorAll('.close')[0]),
                                    fullScreen: function() {
                                        document.firstElementChild.style.overflow = 'initial';
                                        $('div', this.$slider).remove();
                                        this.$slider.css('display', 'none');
                                        this.destroy();
                                    },
                                    setButtonsHeight: function() {
                                        var _this = this;
                                        setTimeout(function() {
                                            var trackHeight = _this.$list.height();
                                            _this.$nextArrow[0].style.height = trackHeight + 'px';
                                            _this.$prevArrow[0].style.height = trackHeight + 'px';
                                        }, 301)
                                    }


                                });

                                this.setButtonsHeight();
                                this.changeCaptionText();
                                this.fullScreenBtn.on('click', $.proxy(this.fullScreen, this));
                            },
                            onAfterChange: function() {
                                this.setButtonsHeight();

                                this.changeCaptionText();
                            }
                        });
                    }
                }
            })
            this.changeCaptionText();

            this.fullScreenBtn.on('click', $.proxy(this.fullScreen, this));

        },
        onAfterChange: function() {
            this.changeCaptionText();
        }
    });
})