$(document).ready(function() {


    var searchSelector = 'input';
    var entered;
    var timer;

    $(searchSelector).keydown(function(e) {
        if (e.which == 32 || e.which == 51 || e.which == 18)
            event.preventDefault();
    });

    $(searchSelector).keyup(function() {
        entered = $(searchSelector).val();
        clearTimeout(timer);

        timer = setTimeout(function() {
            getPictures(entered);
            $(searchSelector).val('');
       }, 800);
    });


    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getPictures(queryStr) {
        console.log('getting pictures for query ' + queryStr);
        var instagramUrl = 'https://api.instagram.com/v1/tags/' + queryStr
            + '/media/recent?client_id=d0f41df452734160a9f5d6c359d92d38&callback=callbackFunction';
        $.ajax({
            url: instagramUrl,
            dataType: 'jsonp',
            success: function(data) {
                var pickOne = getRandomInt(0, data.data.length);
                var imageUrl = data.data[pickOne].images.standard_resolution.url;
                console.log(imageUrl);
                changeBackground(imageUrl);
                updateTags(data.data[pickOne].tags);
                updateUser(data.data[pickOne]);

            },
            error: function(jqXHR, textStatus, errorThrown) {

            }

        });
    }

    function updateTags(tagArray) {
        var newText = '';
        for (var i = 0; i < tagArray.length; ++i) {
            newText = newText + ' #' + tagArray[i];
        }
        $('#tags').text(newText);
    }

    function updateUser(obj) {
        $('.credits p').text(obj.user.full_name);
        $('.credits p').wrap($('<a>', {href: obj.link}));

        $('#profileImg').attr('src', obj.user.profile_picture);
        $('#profileImg').wrap($('<a>', {href: obj.link}));

        $('.credits').find('a').attr('target', '_blank').css('text-decoration', 'none');;
    }
    function changeBackground(newUrl) {
        //check which layer is currently activated
        if ($('#background-image-top').hasClass('transparent')) {
            //place new image over top layer
            $('#background-image-top').css('background-image', 'url(' + newUrl + ')');
            //fade in new image
            $('#background-image-top').waitForImages(function() {
                $('#background-image-top').toggleClass('transparent');
            });
            
        } else {
            //place new image over bottom layer
            $('#background-image-bot').css('background-image', 'url(' + newUrl + ')');
            //fade out old image
            $('#background-image-bot').waitForImages(function() {
                $('#background-image-top').toggleClass('transparent');
            });
        }
    }

    
});

