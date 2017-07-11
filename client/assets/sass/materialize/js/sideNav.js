const jQuery = require('jquery');

(function ($) {
  const methods = {
    init(options) {
      const defaults = {
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true,
      };
      options = $.extend(defaults, options);

      $(this).each(function () {
        const $this = $(this);
        const menuId = $this.attr('data-activates');
        const menu = $(`#${menuId}`);

        // Set to width
        if (options.menuWidth != 300) {
          menu.css('width', options.menuWidth);
        }

        // Add Touch Area
        let $dragTarget = $(`.drag-target[data-sidenav="${menuId}"]`);
        if (options.draggable) {
          // Regenerate dragTarget
          if ($dragTarget.length) {
            $dragTarget.remove();
          }

          $dragTarget = $('<div class="drag-target"></div>').attr('data-sidenav', menuId);
          $('body').append($dragTarget);
        } else {
          $dragTarget = $();
        }

        if (options.edge == 'left') {
          menu.css('transform', 'translateX(-100%)');
          $dragTarget.css({ left: 0 }); // Add Touch Area
        } else {
          menu.addClass('right-aligned') // Change text-alignment to right
            .css('transform', 'translateX(100%)');
          $dragTarget.css({ right: 0 }); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu.hasClass('fixed')) {
          if (window.innerWidth > 992) {
            menu.css('transform', 'translateX(0)');
          }
        }

        // Window resize to reset on large screens fixed
        if (menu.hasClass('fixed')) {
          $(window).resize(() => {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').length !== 0 && menuOut) {
                removeMenu(true);
              } else {
                // menu.removeAttr('style');
                menu.css('transform', 'translateX(0%)');
                // menu.css('width', options.menuWidth);
              }
            } else if (menuOut === false) {
              if (options.edge === 'left') {
                menu.css('transform', 'translateX(-100%)');
              } else {
                menu.css('transform', 'translateX(100%)');
              }
            }
          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu.on('click.itemclick', 'a:not(.collapsible-header)', () => {
            removeMenu();
          });
        }

        var removeMenu = function (restoreNav) {
          panning = false;
          menuOut = false;
          // Reenable scrolling
          $('body').css({
            overflow: '',
            width: '',
          });

          $('#sidenav-overlay').velocity({ opacity: 0 }, { duration: 200,
            queue: false,
            easing: 'easeOutQuad',
            complete() {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '', left: '0' });
            menu.velocity(
              { translateX: '-100%' },
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu.removeAttr('style');
                    menu.css('width', options.menuWidth);
                  }
                },

              });
          } else {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '0', left: '' });
            menu.velocity(
              { translateX: '100%' },
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu.removeAttr('style');
                    menu.css('width', options.menuWidth);
                  }
                },
              });
          }
        };


        // Touch Event
        var panning = false;
        var menuOut = false;

        if (options.draggable) {
          $dragTarget.on('click', () => {
            if (menuOut) {
              removeMenu();
            }
          });

          $dragTarget.hammer({
            prevent_default: false,
          }).bind('pan', (e) => {
            if (e.gesture.pointerType == 'touch') {
              const direction = e.gesture.direction;
              let x = e.gesture.center.x;
              const y = e.gesture.center.y;
              const velocityX = e.gesture.velocityX;

              // Disable Scrolling
              const $body = $('body');
              let $overlay = $('#sidenav-overlay');
              const oldWidth = $body.innerWidth();
              $body.css('overflow', 'hidden');
              $body.width(oldWidth);

              // If overlay does not exist, create one and if it is clicked, close menu
              if ($overlay.length === 0) {
                $overlay = $('<div id="sidenav-overlay"></div>');
                $overlay.css('opacity', 0).click(() => {
                  removeMenu();
                });
                $('body').append($overlay);
              }

              // Keep within boundaries
              if (options.edge === 'left') {
                if (x > options.menuWidth) { x = options.menuWidth; } else if (x < 0) { x = 0; }
              }

              if (options.edge === 'left') {
                // Left Direction
                if (x < (options.menuWidth / 2)) { menuOut = false; }
                // Right Direction
                else if (x >= (options.menuWidth / 2)) { menuOut = true; }
                menu.css('transform', `translateX(${x - options.menuWidth}px)`);
              } else {
                // Left Direction
                if (x < (window.innerWidth - options.menuWidth / 2)) {
                  menuOut = true;
                }
                // Right Direction
                else if (x >= (window.innerWidth - options.menuWidth / 2)) {
                  menuOut = false;
                }
                let rightPos = (x - options.menuWidth / 2);
                if (rightPos < 0) {
                  rightPos = 0;
                }

                menu.css('transform', `translateX(${rightPos}px)`);
              }


              // Percentage overlay
              let overlayPerc;
              if (options.edge === 'left') {
                overlayPerc = x / options.menuWidth;
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              } else {
                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              }
            }
          }).bind('panend', (e) => {
            if (e.gesture.pointerType == 'touch') {
              const $overlay = $('#sidenav-overlay');
              const velocityX = e.gesture.velocityX;
              const x = e.gesture.center.x;
              let leftPos = x - options.menuWidth;
              let rightPos = x - options.menuWidth / 2;
              if (leftPos > 0) {
                leftPos = 0;
              }
              if (rightPos < 0) {
                rightPos = 0;
              }
              panning = false;

              if (options.edge === 'left') {
                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                  // Return menu to open
                  if (leftPos !== 0) {
                    menu.velocity({ translateX: [0, leftPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                  }

                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                  $dragTarget.css({ width: '50%', right: 0, left: '' });
                  menuOut = true;
                } else if (!menuOut || velocityX > 0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: '',
                  });
                  // Slide menu closed
                  menu.velocity({ translateX: [-1 * options.menuWidth - 10, leftPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                  $overlay.velocity({ opacity: 0 }, { duration: 200,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete() {
                      $(this).remove();
                    } });
                  $dragTarget.css({ width: '10px', right: '', left: 0 });
                }
              } else if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                  // Return menu to open
                if (rightPos !== 0) {
                  menu.velocity({ translateX: [0, rightPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                }

                $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                $dragTarget.css({ width: '50%', right: '', left: 0 });
                menuOut = true;
              } else if (!menuOut || velocityX < -0.3) {
                  // Enable Scrolling
                $('body').css({
                  overflow: '',
                  width: '',
                });

                  // Slide menu closed
                menu.velocity({ translateX: [options.menuWidth + 10, rightPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                $overlay.velocity({ opacity: 0 }, { duration: 200,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete() {
                    $(this).remove();
                  } });
                $dragTarget.css({ width: '10px', right: 0, left: '' });
              }
            }
          });
        }

        $this.off('click.sidenav').on('click.sidenav', () => {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          } else {
            // Disable Scrolling
            const $body = $('body');
            const $overlay = $('<div id="sidenav-overlay"></div>');
            const oldWidth = $body.innerWidth();
            $body.css('overflow', 'hidden');
            $body.width(oldWidth);

            // Push current drag target on top of DOM tree
            $('body').append($dragTarget);

            if (options.edge === 'left') {
              $dragTarget.css({ width: '50%', right: 0, left: '' });
              menu.velocity({ translateX: [0, -1 * options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else {
              $dragTarget.css({ width: '50%', right: '', left: 0 });
              menu.velocity({ translateX: [0, options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }

            $overlay.css('opacity', 0)
            .click(() => {
              menuOut = false;
              panning = false;
              removeMenu();
              $overlay.velocity({ opacity: 0 }, { duration: 300,
                queue: false,
                easing: 'easeOutQuad',
                complete() {
                  $(this).remove();
                } });
            });
            $('body').append($overlay);
            $overlay.velocity({ opacity: 1 }, { duration: 300,
              queue: false,
              easing: 'easeOutQuad',
              complete() {
                menuOut = true;
                panning = false;
              },
            });
          }

          return false;
        });
      });
    },
    destroy() {
      const $overlay = $('#sidenav-overlay');
      const $dragTarget = $(`.drag-target[data-sidenav="${$(this).attr('data-activates')}"]`);
      $overlay.trigger('click');
      $dragTarget.remove();
      $(this).off('click');
      $overlay.remove();
    },
    show() {
      this.trigger('click');
    },
    hide() {
      $('#sidenav-overlay').trigger('click');
    },
  };


  $.fn.sideNav = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    }
    $.error(`Method ${methodOrOptions} does not exist on jQuery.sideNav`);
  }; // Plugin end
}(jQuery));
