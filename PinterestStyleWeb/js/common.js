  // 풀다운 메뉴
  $(document).ready(function () {
      // 풀다운 메뉴
      $('.outer-menu').hover(function () {
          $(this).find('.inner-menu').css('display', 'block');
      }, function () {
          $(this).find('.inner-menu').css('display', 'none');
      });
  });

  // 페이지
  $(document).ready(function () {
      // 이미지 로드 확인
      $('#main-section').imagesLoaded(function () {
          // jQuery Masonry 플러그인 적용
          $('#main-section').masonry({
              itemSelector: '.paper',
              columnWidth: 230,
              isAnimated: true
          });
      });
  });

  // 라이트 박스
  $(document).ready(function () {
      function showLightBox() {
          // 라이트박스를 보이게 합니다.
          $('#darken-background').show();
          $('#darken-background').css('top', $(window).scrollTop());
          // 스크롤을 못하게 합니다.
          $('body').css('overflow', 'hidden');
      }

      function hideLightBox() {
          // 라이트박스를 안 보이게 합니다.
          $('#darken-background').hide();

          // 스크롤을 하게 합니다.
          $('body').css('overflow', '');
      }

      // 라이트박스 제거 이벤트
      $('#darken-background').click(function () {
          hideLightBox();
      });

      // 클릭 이벤트 연결
      $('.paper').click(function () {
          showLightBox();
      });

      // 라이트박스 제거 이벤트 보조
      $('#lightbox').click(function (event) {
          event.stopPropagation()
      });
  });