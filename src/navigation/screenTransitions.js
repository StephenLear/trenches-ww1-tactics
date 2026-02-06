/**
 * WWI Tactical Game - Screen Transition Animations
 * Smooth, thematic transitions between screens
 */

import { Easing } from 'react-native';

// Transition timing configurations
const TIMING = {
  fast: 200,
  normal: 300,
  slow: 450,
  dramatic: 600,
};

/**
 * Fade transition - subtle and elegant
 */
export const fadeTransition = {
  gestureEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.normal,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.fast,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

/**
 * Slide from right - standard navigation feel
 */
export const slideFromRight = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.normal,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.fast,
        easing: Easing.in(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  }),
};

/**
 * Slide from bottom - for modals and overlays
 */
export const slideFromBottom = {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.normal,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.fast,
        easing: Easing.in(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
  }),
};

/**
 * Scale and fade - dramatic entrance for important screens
 */
export const scaleFromCenter = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.slow,
        easing: Easing.out(Easing.back(1.5)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.fast,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.8, 1],
      }),
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
      ],
    },
  }),
};

/**
 * Military flip - like opening a field map
 */
export const militaryFlip = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.dramatic,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.normal,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 1, 1],
      }),
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['-90deg', '0deg'],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.9, 0.95, 1],
          }),
        },
      ],
    },
  }),
};

/**
 * Battle entrance - dramatic for entering combat
 */
export const battleEntrance = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.dramatic,
        easing: Easing.out(Easing.exp),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.normal,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 0.5, 1],
      }),
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-layouts.screen.height * 0.1, 0],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1.1, 1.05, 1],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: '#000',
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.5, 0],
      }),
    },
  }),
};

/**
 * Victory transition - celebratory exit from battle
 */
export const victoryTransition = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: TIMING.dramatic,
        easing: Easing.out(Easing.elastic(1)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: TIMING.slow,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1.05, 1],
          }),
        },
      ],
    },
  }),
};

/**
 * Get transition config based on screen type
 */
export const getScreenTransition = (screenName) => {
  switch (screenName) {
    // Battle screens get dramatic entrance
    case 'Battle':
    case 'BattleScreen':
      return battleEntrance;

    // Victory/results screens
    case 'Victory':
    case 'Results':
    case 'VictoryScreen':
      return victoryTransition;

    // Modal-style screens
    case 'Settings':
    case 'Tutorial':
    case 'Statistics':
    case 'Achievements':
      return slideFromBottom;

    // Important info screens
    case 'Briefing':
    case 'BriefingScreen':
    case 'WarDiary':
      return militaryFlip;

    // Menu and navigation
    case 'Menu':
    case 'MenuScreen':
    case 'CommandHQ':
      return scaleFromCenter;

    // Default slide for most screens
    default:
      return slideFromRight;
  }
};

/**
 * Screen options with transitions
 */
export const createScreenOptions = (screenName) => ({
  headerShown: false,
  ...getScreenTransition(screenName),
});

export default {
  fadeTransition,
  slideFromRight,
  slideFromBottom,
  scaleFromCenter,
  militaryFlip,
  battleEntrance,
  victoryTransition,
  getScreenTransition,
  createScreenOptions,
};
