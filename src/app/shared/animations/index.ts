import { sequence, trigger, animate, style, group, query, transition, animateChild, state, animation, useAnimation, stagger } from '@angular/animations';

const customAnimation = animation([
  style({
    opacity: '{{opacity}}',
    transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
  }),
  animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
], {
  params: {
    duration: '200ms',
    delay: '0ms',
    opacity: '0',
    scale: '1',
    x: '0',
    y: '0',
    z: '0'
  }
});

export const animations = [

  trigger('slideAnimation', [
    state('in', style({ transform: 'translateX(600%)', opacity: 1 })),
    transition(':enter', [
      style({ transform: 'translateX(-600%)', opacity: 0 }),
      animate(600)
    ]),
    transition(':leave', [
      animate(600, style({ transform: 'translateX(-600%)', opacity: 0 }))
    ])
  ]),

  trigger('animate', [transition('void => *', [useAnimation(customAnimation)])]),

  trigger('animateStagger', [
    state('50', style('*')),
    state('100', style('*')),
    state('200', style('*')),

    transition('void => 50',
      query('@*',
        [
          stagger('50ms', [
            animateChild()
          ])
        ], { optional: true })),
    transition('void => 100',
      query('@*',
        [
          stagger('100ms', [
            animateChild()
          ])
        ], { optional: true })),
    transition('void => 200',
      query('@*',
        [
          stagger('200ms', [
            animateChild()
          ])
        ], { optional: true }))
  ]),

  trigger('fadeInOut', [
    state('0, void', style({
      opacity: 0
    })),
    state('1, *', style({
      opacity: 1
    })),
    transition('1 => 0', animate('300ms ease-out')),
    transition('0 => 1', animate('300ms ease-in')),
    transition('void <=> *', animate('300ms ease-in'))
  ]),

  trigger('slideInOut', [
    state('0', style({
      height: '0px'
    })),
    state('1', style({
      height: '*'
    })),
    transition('1 => 0', animate('300ms ease-out')),
    transition('0 => 1', animate('300ms ease-in'))
  ]),

  trigger('slideIn', [
    transition('void => left', [
      style({
        transform: 'translateX(100%)'
      }),
      animate('300ms ease-in',
        style({
          transform: 'translateX(0)'
        })
      )
    ]
    ),
    transition('left => void', [
      style({
        transform: 'translateX(0)'
      }),
      animate('300ms ease-in',
        style({
          transform: 'translateX(-100%)'
        })
      )
    ]
    ),
    transition('void => right', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate('300ms ease-in',
        style({
          transform: 'translateX(0)'
        })
      )
    ]
    ),
    transition('right => void', [
      style({
        transform: 'translateX(0)'
      }),
      animate('300ms ease-in',
        style({
          transform: 'translateX(100%)'
        })
      )
    ]
    )
  ]),

  trigger('slideInLeft', [
    state('void', style({
      transform: 'translateX(-100%)',
    })),
    state('*', style({
      transform: 'translateX(0)',
    })),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),

  trigger('slideInRight', [
    state('void', style({
      transform: 'translateX(100%)',
    })),
    state('*', style({
      transform: 'translateX(0)',
    })),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),

  trigger('slideInTop', [
    state('void', style({
      transform: 'translateY(-100%)',
    })),
    state('*', style({
      transform: 'translateY(0)',
    })),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),

  trigger('slideInBottom', [
    state('void',
      style({
        transform: 'translateY(100%)',
      })),
    state('*', style({
      transform: 'translateY(0)',
    })),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),

  trigger('expandCollapse', [
    state('void', style({
      height: '0px'
    })),
    state('*', style({
      height: '*'
    })),
    transition('void => *', animate('300ms ease-out')),
    transition('* => void', animate('300ms ease-in'))
  ]),


  /* @ Router animations */

  trigger('routerSlideInOut', [

    // end state styles for route container (host)
    state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        // start with the content positioned off the right of the screen,
        // -400% is required instead of -100% because the negative position adds to the width of the element
        right: '-400%',

        // start with background opacity set to 0 (invisible)
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }),

      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        // transition the right position to 0 which slides the content into view
        right: 0,

        // transition the background opacity to 0.8 to fade it in
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        // transition the right position to -400% which slides the content out of view
        right: '-400%',

        // transition the background opacity to 0 to fade it out
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
    ])
  ]),

  trigger('routerfadeIn', [

    // route 'enter' transition
    transition(':enter', [

      // css styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('.3s', style({ opacity: 1 }))
    ]),
  ]),

  trigger('routerTransitionLeft', [

    transition('* => *', [
      query('content > :enter, content > :leave', [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        })
      ], { optional: true }),
      query('content > :enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        })
      ], { optional: true }),
      sequence([
        group([
          query('content > :leave', [
            style({
              transform: 'translateX(0)',
              opacity: 1
            }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateX(-100%)',
                opacity: 0
              }))
          ], { optional: true }),
          query('content > :enter', [
            style({ transform: 'translateX(100%)' }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateX(0%)',
                opacity: 1
              }))
          ], { optional: true })
        ]),
        query('content > :leave', animateChild(), { optional: true }),
        query('content > :enter', animateChild(), { optional: true })
      ])
    ])
  ]),

  trigger('routerTransitionRight', [

    transition('* => *', [
      query('content > :enter, content > :leave', [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        })
      ], { optional: true }),
      query('content > :enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        })
      ], { optional: true }),
      sequence([
        group([
          query('content > :leave', [
            style({
              transform: 'translateX(0)',
              opacity: 1
            }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateX(100%)',
                opacity: 0
              }))
          ], { optional: true }),
          query('content > :enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateX(0%)',
                opacity: 1
              }))
          ], { optional: true })
        ]),
        query('content > :leave', animateChild(), { optional: true }),
        query('content > :enter', animateChild(), { optional: true })
      ])
    ])
  ]),

  trigger('routerTransitionUp', [

    transition('* => *', [
      query('content > :enter, content > :leave', [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        })
      ], { optional: true }),
      query('content > :enter', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
        })
      ], { optional: true }),
      group([
        query('content > :leave', [
          style({
            transform: 'translateY(0)',
            opacity: 1
          }),
          animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
            style({
              transform: 'translateY(-100%)',
              opacity: 0
            }))
        ], { optional: true }),
        query('content > :enter', [
          style({ transform: 'translateY(100%)' }),
          animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
            style({
              transform: 'translateY(0%)',
              opacity: 1
            }))
        ], { optional: true })
      ]),
      query('content > :leave', animateChild(), { optional: true }),
      query('content > :enter', animateChild(), { optional: true })
    ])
  ]),

  trigger('routerTransitionDown', [

    transition('* => *', [
      query('content > :enter, content > :leave', [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        })
      ], { optional: true }),
      query('content > :enter', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        })
      ], { optional: true }),
      sequence([
        group([
          query('content > :leave', [
            style({
              transform: 'translateY(0)',
              opacity: 1
            }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateY(100%)',
                opacity: 0
              }))
          ], { optional: true }),
          query('content > :enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateY(0%)',
                opacity: 1
              }))
          ], { optional: true })
        ]),
        query('content > :leave', animateChild(), { optional: true }),
        query('content > :enter', animateChild(), { optional: true })
      ])
    ])
  ]),

  trigger('routerTransitionFade', [

    transition('* => *', group([

      query('content > :enter, content > :leave ', [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        })
      ], { optional: true }),

      query('content > :enter', [
        style({
          opacity: 0
        })
      ], { optional: true }),
      query('content > :leave', [
        style({
          opacity: 1
        }),
        animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 0
          }))
      ], { optional: true }),
      query('content > :enter', [
        style({
          opacity: 0
        }),
        animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          style({
            opacity: 1
          }))
      ], { optional: true }),
      query('content > :enter', animateChild(), { optional: true }),
      query('content > :leave', animateChild(), { optional: true })
    ]))
  ])
];
