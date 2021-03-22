var click = 0

function ToogleScreen() {
  // Показываем лоадер
  $('.loading').fadeIn()
  $('.loading-wrapper').delay(400).fadeIn('slow')

  // Обнуляем скролл
  setTimeout(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1000
    )
  }, 1000)

  // Показываем контент
  setTimeout(function () {
    function play(media) {
      media.play()
    }

    function stop(media) {
      media.pause()
    }

    switch (click) {
      case -1:
        var kachestvovideo = document.getElementById('kachestvo')
        stop(kachestvovideo)
        $('div.screen_twelve').removeClass('open').addClass('close')
        $('div.screen_one').removeClass('close').addClass('open')
        click = click + 1
        break

      case 0:
        $('div.screen_one').removeClass('open').addClass('close')
        $('div.screen_two').removeClass('close').addClass('open')
        click = click + 1
        break

      case 1:
        $('div.screen_two').removeClass('open').addClass('close')
        $('div.screen_post-two').removeClass('close').addClass('open')
        click = click + 1
        break

      case 2:
        $('div.screen_post-two').removeClass('open').addClass('close')
        $('div.screen_three').removeClass('close').addClass('open')
        click = click + 1
        break

      case 3:
        $('div.screen_three').removeClass('open').addClass('close')
        $('div.screen_pre-four').removeClass('close').addClass('open')
        click = click + 1
        break

      case 4:
        $('div.screen_pre-four').removeClass('open').addClass('close')
        $('div.screen_four').removeClass('close').addClass('open')
        click = click + 1
        break

      case 5:
        $('div.screen_four').removeClass('open').addClass('close')
        $('div.screen_five').removeClass('close').addClass('open')
        click = click + 1
        break

      case 6:
        $('div.screen_five').removeClass('open').addClass('close')
        $('div.screen_pre-six').removeClass('close').addClass('open')
        click = click + 1
        break

      case 7:
        $('div.screen_pre-six').removeClass('open').addClass('close')
        $('div.screen_six').removeClass('close').addClass('open')
        click = click + 1
        break

      case 8:
        $('div.screen_six').removeClass('open').addClass('close')
        $('div.screen_seven').removeClass('close').addClass('open')
        click = click + 1
        break

      case 9:
        $('div.screen_seven').removeClass('open').addClass('close')
        $('div.screen_eight').removeClass('close').addClass('open')
        click = click + 1
        break

      case 10:
        $('div.screen_eight').removeClass('open').addClass('close')
        $('div.screen_nine').removeClass('close').addClass('open')
        click = click + 1
        break

      case 11:
        $('div.screen_nine').removeClass('open').addClass('close')
        $('div.screen_ten').removeClass('close').addClass('open')
        click = click + 1
        break

      case 12:
        $('div.screen_ten').removeClass('open').addClass('close')
        $('div.screen_eleven').removeClass('close').addClass('open')
        var zimavideo = document.getElementById('zima')
        var width = document.body.clientWidth
        if (width < 767) {
          click = click + 1
          break
        } else play(zimavideo)
        $('#zima').on('ended', function () {
          $('div.screen_eleven').removeClass('open').addClass('close')
        })
        click = click + 1
        break

      case 13:
        var zimavideo = document.getElementById('zima')
        stop(zimavideo)
        $('div.screen_eleven').removeClass('open').addClass('close')
        $('div.screen_twelve').removeClass('close').addClass('open')
        var kachestvovideo = document.getElementById('kachestvo')
        var width = document.body.clientWidth
        if (width < 767) {
          click = -1
          break
        } else play(kachestvovideo)
        $('#kachestvo').on('ended', function () {
          $('div.screen_twelve').removeClass('open').addClass('close')
        })
        click = -1
        break
    }
  }, 2370)

  // Скрываем лоадер
  setTimeout(function () {
    $('.loading').fadeOut()
    $('.loading-wrapper').delay(400).fadeOut('slow')
  }, 2000)
}
