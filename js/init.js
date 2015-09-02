$(function() {

  $('a.join').click(function() {
    if (ga && typeof ga == "function") {
      ga('send', 'pageview', '/liity')
    }
  })

  $.get('http://apfeed.herokuapp.com/rest', function(data) {
    if (data && data.length) {
      appendFacebookPosts(data)
    } else {
      $('#posts').html($('<a href="https://fb.com/audiopoli">fb.com/audiopoli</a>'))
    }
  })

  function appendFacebookPosts(posts) {
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

});