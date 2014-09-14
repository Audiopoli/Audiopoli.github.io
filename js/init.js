(function($) {

  skel.init({
    reset: 'full',
    breakpoints: {
      'global': { range: '*', href: 'css/style.css', containers: 950, grid: { gutters: 50 } },
      'normal': { range: '-1280', href: 'css/laptop.css', containers: 900, grid: { gutters: 30 } },
      'narrow': { range: '-1000', href: 'css/tablet.css', containers: '100%', grid: { gutters: 25, collapse: true } },
      'mobile': { range: '-640', href: 'css/mobile.css', grid: { gutters: 10 }, viewport: { scalable: false } }
    }
  });

  $.get('http://apfeed.herokuapp.com/rest', function(data) {
    if (data && data.length) {
      appendFacebookPosts(data)
    } else {
      $('#posts').html($('<a href="https://fb.com/audiopoli">fb.com/audiopoli</a>'))
    }
  })

  function appendFacebookPosts(posts) {
    console.log('data')
    var postsElement = $('#posts')
    var postElements = []
    for (var i=0; i < Math.min(posts.length, 3); i++) {
      var post = posts[i]
      if (post.message) {
        var d = new Date(post.created_time)
        var dateString = d.getDate() + '.' + (d.getMonth() + 1) + '.' +d.getFullYear()
        var postElement = $('<div class="fb-post">')
        postElement.append($('<span>').text(dateString))
        if (post.picture) {
          postElement.addClass('image')
          postElement.append($('<a>').attr('href', post.link).append($('<img>').attr('src', post.picture)))
        } else {
          postElement.append($('<a>').attr('href', 'http://fb.com/audiopoli').append($('<i class="fa fa-facebook fa-2"></i>')))
        }
        postElement.append($('<p>').text(post.message))
        postElements.push(postElement)
      }
    }
    postsElement.html(postElements)
  }

})(jQuery);